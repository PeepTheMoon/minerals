const client = require('../lib/client');

// import our seed data:
const minerals = require('./minerals.js');
const usersData = require('./users.js');
const colors = require('./colors.js');

run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                        INSERT INTO users (email, hash)
                        VALUES ($1, $2)
                        RETURNING *;
                    `,
        [user.email, user.hash]);
      })
    );
      //why is user underlined in red here?
    const user = users[0].rows[0];

    await Promise.all(
      minerals.map(mineral => {
        return client.query(`INSERT INTO minerals (name, vibrates_to, rarity, associated_signs, chakra)
                    VALUES ($1, $2, $3, $4, $5);`,
        [mineral.name, mineral.vibrates_to, mineral.rarity, mineral.associated_signs, mineral.chakra]);
      })
    );

    await Promise.all(
      colors.map(color => {
        return client.query(`INSERT INTO colors (color)
                    VALUES ($1);`,
        [color.color]);
      })
    );

    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
