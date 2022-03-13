const express = require('express');
const app = express();
const port = 2999;

var cors = require('cors')

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/', function(request, response) {
    response.send('<h1>Expense Manager backend</h1>');
});

app.get('/welcome', function(request, response) {
    console.log('Handling welcome request...');

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify('{"label": "Welcome from the backend!"}'));
});

app.listen(port, function() {
    console.log('Expense manager backend app listening on the port %d', port);
});
