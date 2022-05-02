const sqlite3 = require('sqlite3');
var md5 = require('md5');

const databaseName = 'expences.sqlite';

let database = new sqlite3.Database(databaseName, (error) => {
    if (error) {
        // Can't open database
        console.error(`Can't open database, error: ${error.message}`);
        throw error;
    }
    else {
        console.log(`Successfully connected to the database.`)

        database.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            email text UNIQUE,
            password text,
            CONSTRAINT email_unique UNIQUE (email)
            )`,
            (error) => {
                if (error) {
                    // Table exists
                }
                else {
                    var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                    database.run(insert, ["admin", "admin@example.com", md5("admin123456")])
                    database.run(insert, ["user", "user@example.com", md5("user123456")])
                }
            }
        );
    }
});

module.exports = database
