let express = require("express");
let satellite = require("satellite.js");
let router = express.Router();

//Coordinates for Galway
const galwayLat = 53.2709;
const galwayLong = -9.0627;

//https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=json

router.get("/", async function (req, res, next) {
  const response = await fetch("https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle");
  //res.render('index');
  const tleData = await response.json(); //convert response to JSON

  //console.log("Fetched TLE data: ", tleData.length ? tleData : "no data received"); //Prints out data

  console.log("Type of TLE data: ", typeof tleData); //tleData is an object not an array
  //Array to store satellites
  let mySatellites = [];

  //Loop through all the satellites in the dataset
  Object.values(tleData).forEach((satelliteObject) => {
    const tleLine1 = satelliteObject.TLE_LINE1; //Extract the 1st line of TLE data for satelliteObject
    const tleLine2 = satelliteObject.TLE_LINE2; //TLE_LINE1 and TLE_LINE2 to calculate and track the satellite's position

    if (tleLine1 && tleLine2) {
      //console.log("TLE Line 1: ", tleLine1); //no print
      //console.log("TLE Line 2: ", tleLine2);
      const satrec = satellite.twoline2satrec(tleLine1, tleLine2); //Convert TLE into a usable object

      //console.log("satellite record", satrec); no print

      //Get the current time and calculate satellite's position
      const today = new Date();
      const satPositionVelocity = satellite.propagate(satrec, today);

      //console.log("Satellite position and velocity data: ", satPositionVelocity);

      //Check if satellite position is successfully calculated
      if (satPositionVelocity.position) {
        //Get satellite's current position in space. Earth-Centered Inertial coordinates. 
        //ECI is a fixed coordinate system centered at the Earth's center, used for satellite tracking in space
        const positionEci = satPositionVelocity.position;
        const gmstTime = satellite.gstime(today); //Calculate Greenwhich Mean Sidereal Time based on current time. GMST is used to convert ECI coordinates into a location on Earth. GMST tells how much Earth has rotated at a given time
        const positionGdt = satellite.eciToGeodetic(positionEci, gmstTime); //Convert ECI to Geodetic Coordinates(Latitude, Longitude, Altitude)

        const lat = satellite.degreesLat(positionGdt.latitude);       //Convert latitude from radians to degrees
        const long = satellite.degreesLong(positionGdt.longitude);

        //Check if the satellite is close to Galway
        //If the difference between actual latitude and the constant Galway latitude is less than 5 degrees, this means the satellite is close to Galway
        //With 5, satellites within latitude 48.2709-58.2709. Captures satellites close to Galway but not necessarily above it  
        if (Math.abs(lat - galwayLat) < 5 && Math.abs(long - galwayLong) < 5) {
          //console.log(`Satellites near Galway: ${satelliteObject.OBJECT_NAME}, Lat: ${lat}, Long: ${long}`);
          mySatellites.push({
            name: satelliteObject.OBJECT_NAME,
            latitude: lat,
            longitude: long,
          });
        }
      }
    }
  });
  //console.log(mySatellites);
  res.json({ satellites: mySatellites }); //Send JSON response to frontend
});


module.exports = router;
