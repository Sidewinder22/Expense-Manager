const express = require('express');
const app = express();
const port = 2999;

var cors = require('cors')
var database = require("./database.js")

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/', (request, response) => {
    response.send('<h1>Expense Manager backend</h1>');
});

app.get('/welcome', (request, response) => {
    console.log('Handling welcome request...');

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify('{"label": "Welcome from the backend!"}'));
});

app.listen(port, () => {
    console.log(`Expense manager backend app listening on the port ${port}`);
});

app.get("/api/users", (request, response, next) => {
    console.log("api users");

    var sql = "select * from user";
    var params = [];
    database.all(sql, params, (err, rows) => {
        if (err) {
            response.status(400).json({"error": err.message});
            return;
        }
        
        response.json({
            "message": "success",
            "data": rows
        })
    });
});


app.get("/api/expences", (request, response, next) => {
    var sql = "select * from expence"
    var params = []
    database.all(sql, params, (err, rows) => {
        if (err) {
            response.status(400).json({"error": err.message});
            return;
        }
        response.json({
            "message": "success",
            "data": rows
        })
    });
});

// Returns 404 error when wrong request URL
app.use( (request, response) => {
    response.status(404);
});
