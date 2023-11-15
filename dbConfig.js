const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host : "localhost",
        user : "root",
        password : "aa123@@.",
        database : "chatdb"
    }
);

module.exports = db;