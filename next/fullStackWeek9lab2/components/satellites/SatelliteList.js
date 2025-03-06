import SatelliteItem from './SatelliteItem';
import classes from './SatelliteList.module.css';

function SatelliteList(props) {
  return (
    <ul className={classes.list}>
      {props.satellites && props.satellites.length > 0 ? (

      props.satellites.map((satellite) => (
        <SatelliteItem
          key={satellite.OBJECT_ID}
          id={satellite.OBJECT_NAME}
          //type={satellite.type}
          //country={satellite.country}
          //image={satellite.image}
          //title={satellite.title}
          //address={meetup.address}
        />
      ))
    ):(
      <p>No satellites found</p>
    )}
    </ul>
  );
}

export default SatelliteList;
