// connection.js
var connectionString = '';
console.log('process.env: ', process.env.DATABASE_URL);
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
    connectionString = 'postgres://localhost:5432/solidGround4'
}

module.exports = connectionString;
