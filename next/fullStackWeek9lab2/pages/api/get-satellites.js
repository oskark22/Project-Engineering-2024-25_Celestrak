async function handler(req, res) {
  // const response = await fetch('https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=json');
  const response = await fetch("http://localhost:8000/");
  const data = await response.json();
  console.log(data);
  res.json(data);
}

export default handler;
