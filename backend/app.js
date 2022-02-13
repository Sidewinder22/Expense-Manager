var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.send('<h1>Expense Manager</h1>');
});

app.listen(3000, function() {
    console.log('Expense manager backend app listening on the port 3000');
});
