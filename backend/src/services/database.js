const sqlite3 = require('sqlite3');
var md5 = require('md5');

const databaseName = 'database.sqlite';

let database = new sqlite3.Database(databaseName, (error) => {
    if (error) {
        // Can't open database
        console.error(`Can't open database, error: ${error.message}`);
        throw error;
    }
    else {
        console.log(`Successfully connected to the database.`)

        database.run(`CREATE TABLE user (
            user_id             INTEGER PRIMARY KEY AUTOINCREMENT,
            name                TEXT NOT NULL,
            email               TEXT NOT NULL UNIQUE,
            password            TEXT NOT NULL,
            CONSTRAINT          email_unique UNIQUE (email))`,
            (error) => {
                if (error) {
                    // Table exists
                    console.log(`Error during creating user table: ${error}`);
                }
                else {
                    // Temporary, only for tests
                    var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
                    database.run(insert, ["admin", "admin@example.com", md5("admin123456")]);
                    database.run(insert, ["user", "user@example.com", md5("user123456")]);
                }
            }
        );

        database.run(`CREATE TABLE expence (
            expence_id              INTEGER PRIMARY KEY AUTOINCREMENT,
            date                    DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            amount                  REAL NOT NULL,
            category                INTEGER NOT NULL,
            notes                   TEXT,
            user_id                 INTEGER,
            CONSTRAINT fk_user      FOREIGN KEY (user_id) REFERENCES user (user_id)
            )`,
            (error) => {
                if (error) {
                    // Table exists
                    console.log(`Error during creating expence table: ${error}`);
                }
                else {
                    var insert = 'INSERT INTO expence (date, amount, category, notes, user_id) VALUES (?,?,?,?,?)';
                    database.run(insert, ["2022-05-03 23:11:11.001", "20.2", "przemys??owe", "rzeczy do mycia okien", "2"]);
                    database.run(insert, ["2022-04-13 12:11:11.001", "197", "spo??ywcze", "Lidl", "1"]);
                }
            }
        );
    }
});

module.exports = database
