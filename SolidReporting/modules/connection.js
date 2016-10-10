// connection.js
var connectionString = '';

if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
    // connectionString = 'postgres://localhost:5432/solidGround4';
    connectionString = {
      user: 'elizabethhaakenson', //env var: PGUSER
      database: 'solidGround4', //env var: PGDATABASE
      password: '', //env var: PGPASSWORD
      port: 5432, //env var: PGPORT
      max: 100, // max number of clients in the pool
      idleTimeoutMillis: 1000, // how long a client is allowed to remain idle before being closed
    };
}

module.exports = connectionString;
