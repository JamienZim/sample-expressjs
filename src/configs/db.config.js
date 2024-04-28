// const env = process.env;
const fs = require('fs');

// ssl: {
//     mode: 'VERIFY_IDENTITY',
//     ca: fs.readFileSync('/etc/ssl/cert.pem', 'utf-8'),
//   }

const dbconfig = {
    username: "doadmin",
    password: "AVNS_CSj4CfCksFUPPOG3kHg",
    host: "db-mysql-syd1-26793-do-user-16478014-0.c.db.ondigitalocean.com",
    port: "25060",
    database: "defaultdb",
    sslmode: "REQUIRED"
}

const env = process.env;
const db = {
    host: dbconfig.host,
    user: dbconfig.username,
    password: dbconfig.password,
    database: dbconfig.database,
    port: dbconfig.port,

};

module.exports = db;