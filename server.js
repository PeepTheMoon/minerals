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
  from minerals
  join colors
  on minerals.color_id = colors.id`);

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

  const data = await client.query(`
  SELECT minerals.id, minerals.name, minerals.vibrates_to, minerals.rarity, minerals.associated_signs, minerals.chakra, colors.color
  from minerals
  join colors
  on minerals.color_id = colors.id
  where minerals.id=$1`,
  [req.params.id]
  );
  res.json(data.rows[0]);
});

//creates a mineral
app.post('/minerals', async(req, res) => {
  console.log(req.body);
  const data = await client.query(
    `insert into minerals (name, vibrates_to, rarity, associated_signs, chakra, color_id, user_id)
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *;`,
    [req.body.name, req.body.vibrates_to, req.body.rarity, req.body.associated_signs, req.body.chakra, req.body.color_id, req.body.user_id]
  );

  res.json(data.rows);
});

//allows user to update a resource and returns full copy of resource from database
app.put('/minerals/:id', async(req, res) => {
  const data = await client.query(`
    UPDATE minerals
    SET associated_signs = $2,
        chakra = $3
    WHERE id=$1 
    returning *;
  `, [req.params.id, req.body.associated_signs, req.body.chakra]);

  res.json(data.rows);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

//export
module.exports = app;
