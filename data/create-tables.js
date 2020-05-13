const client = require('../lib/client');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY NOT NULL,
                    email VARCHAR(256) NOT NULL,
                    hash VARCHAR(512) NOT NULL
                ); 
                CREATE TABLE colors (
                    id SERIAL PRIMARY KEY NOT NULL,
                    color VARCHAR(512) NOT NULL
            );          
                CREATE TABLE minerals (
                    id SERIAL PRIMARY KEY NOT NULL,
                    name VARCHAR(512) NOT NULL,
                    vibrates_to INTEGER NOT NULL,
                    rarity BOOLEAN NOT NULL,
                    associated_signs VARCHAR(512) NOT NULL,
                    chakra VARCHAR(512) NOT NULL,
                    color_id INTEGER NOT NULL REFERENCES colors(id),
                    user_id INTEGER NOT NULL REFERENCES users(id)
            );  

        `);

    console.log('create tables complete');
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
