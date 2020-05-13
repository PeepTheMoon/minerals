//imports = require
require('dotenv').config();
const client = require('./lib/client');
client.connect();
const app = require('./lib/app');

// Initiate database connection

const PORT = process.env.PORT || 7890;

//gets all minerals
app.get('/minerals', async(req, res) => {
  //triple check on colors.color in SELECT statement and if it should be plural or singular (re: line 41 in load-seed-data.js)
  const data = await client.query(`
  SELECT minerals.id, minerals.name, minerals.vibrates_to, minerals.rarity, minerals.associated_signs, minerals.chakra, colors.color
  FROM minerals
  JOIN colors
  ON minerals.color_id = colors.id`);

  res.json(data.rows[0]);
});

//gets all colors
app.get('/colors', async(req, res) => {
  const data = await client.query('SELECT * FROM colors');

  res.json(data.rows[0]);
});

//gets all users
app.get('/users', async(req, res) => {
  const data = await client.query('SELECT * FROM users');

  res.json(data.rows[0]);
});

//gets one color
app.get('/color/:id', async(req, res) => {
  const id = req.params.id;
  const data = await client.query('SELECT * FROM colors WHERE id=$1',
    [id]
  );
  res.json(data.rows[0]);
});

//gets one mineral
app.get('/mineral/:id', async(req, res) => {

  const data = await client.query(`
  SELECT minerals.id, minerals.name, minerals.vibrates_to, minerals.rarity, minerals.associated_signs, minerals.chakra, colors.color
  FROM minerals
  JOIN colors
  ON minerals.color_id = colors.id
  WHERE minerals.id=$1`,
  [req.params.id]
  );
  res.json(data.rows[0]);
});

//creates a mineral
app.post('/minerals', async(req, res) => {

  const data = await client.query(
    `INSERT INTO minerals (name, vibrates_to, rarity, associated_signs, chakra, color_id, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;`,
    [req.body.name, req.body.vibrates_to, req.body.rarity, req.body.associated_signs, req.body.chakra, req.body.color_id, req.body.user_id]
  );

  res.json(data.rows[0]);
});

//allows user to update a resource and returns full copy of resource from database
app.put('/minerals/:id', async(req, res) => {

  const data = await client.query(`
    UPDATE minerals
    SET associated_signs = $2,
        chakra = $3
    WHERE id=$1 
    RETURNING *;
  `, [req.params.id, req.body.associated_signs, req.body.chakra]);

  res.json(data.rows[0]);
});

app.delete('/minerals/:id', async(req, res) => {

  const data = await client.query(`
  DELETE FROM minerals
  WHERE id=$1
  RETURNING *;
  `, [req.params.id]);

  res.json(data.rows[0]);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

//export
module.exports = app;
