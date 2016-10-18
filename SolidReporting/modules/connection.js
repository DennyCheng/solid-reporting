// connection.js
var connectionString = '';

if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
    connectionString = 'postgres://localhost:5432/solidGround4';
}

module.exports = connectionString;
