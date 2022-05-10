const express = require('express');
const app = module.exports = express();
const apiRouter = require('./routers/apiRouter.js');
const port = 2999;

var cors = require('cors')


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


////// ROUTING ////////
app.use('/api', apiRouter);


// Returns 404 error when wrong request URL
app.use( (request, response) => {
    response.status(404);
});
