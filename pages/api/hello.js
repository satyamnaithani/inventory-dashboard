const handler = (req, res) => {
  const res = await fetch(`https://nodejs-msql-backend.herokuapp.com/stock`);
  const data = await res.json();
  res.status(200).json(data)
}

export default handler;