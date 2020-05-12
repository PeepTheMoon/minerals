//imports = require
require('dotenv').config();
const client = require('./lib/client');
client.connect();
const app = require('./lib/app');

// Initiate database connection

const PORT = process.env.PORT || 7890;

//gets all minerals
app.get('/minerals', async(req, res) => {
  const data = await client.query('SELECT * from minerals');

  res.json(data.rows);
});

//gets all colors
app.get('/colors', async(req, res) => {
  const data = await client.query('SELECT * from colors');

  res.json(data.rows);
});

//gets all users
app.get('/users', async(req, res) => {
  const data = await client.query('SELECT * from users');

  res.json(data.rows);
});

//gets one color
app.get('/color/:id', async(req, res) => {
  const id = req.params.id;
  const data = await client.query('SELECT * from colors where id=$1',
    [id]
  );
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

//gets one user
app.get('/user/:id', async(req, res) => {
  const id = req.params.id;
  const data = await client.query('SELECT * from user where id=$1',
    [id]
  );
  res.json(data.rows);
});

//creates a mineral
app.post('/minerals', async(req, res) => {
  console.log(req.body);
  const data = await client.query(
    `insert into minerals (name, vibrates_to, rarity, associated_signs, chakra)
    values ($1, $2, $3, $4, $5)
    returning *;`,
    [req.body.name, req.body.vibrates_to, req.body.rarity, req.body.associated_signs, req.body.chakra]
  );

  res.json(data.rows);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

//export
module.exports = app;
