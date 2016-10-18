// connection.js
var connectionString = '';

if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
    connectionString = {
      user: 'nmatecki', //env var: PGUSER
      database: 'solidground', //env var: PGDATABASE
      password: '', //env var: PGPASSWORD
      port: 5432, //env var: PGPORT
      max: 1000, // max number of clients in the pool
      idleTimeoutMillis: 1000, // how long a client is allowed to remain idle before being closed
    };
}

module.exports = connectionString;
