//imports = require
require('dotenv').config();
const client = require('./lib/client');
const app = require('./lib/app');

// Initiate database connection
client.connect();
const PORT = process.env.PORT || 7890;

//gets all minerals
app.get('/minerals', async(req, res) => {
  const data = await client.query('SELECT * from minerals');

  res.json(data.rows);
});

//gets one mineral
app.get('/mineral/:id', async(req, res) => {
  const id = req.params.id;
  const data = await client.query('SELECT * from minerals where id=$1',
    [id]
  );
  res.json(data.rows);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

//export
module.exports = app;
