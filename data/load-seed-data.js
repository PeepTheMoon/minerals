const client = require('../lib/client');
// import our seed data:
const minerals = require('./minerals.js');
// const usersData = require('./users.js');

run();

async function run() {

  try {
    await client.connect();

    //   const users = await Promise.all(
    //     usersData.map(user => {
    //       return client.query(`
    //                     INSERT INTO users (email, hash)
    //                     VALUES ($1, $2)
    //                     RETURNING *;
    //                 `,
    //       [user.email, user.hash]);
    //     })
    //   );
      
    // const user = users[0].rows[0];

    await Promise.all(
      minerals.map(mineral => {
        return client.query(`INSERT INTO minerals (name, vibrates_to, healing, associated_signs, chakra)
                    VALUES ($1, $2, $3, $4, $5);`,
        [mineral.name, mineral.vibrates_to, mineral.healing, mineral.associated_signs, mineral.chakra]);
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
