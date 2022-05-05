const express = require('express');
const app = require('../app');
const router = express.Router();
const database = require('../services/database.js');
const md5 = require('md5');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.unsubscribe(bodyParser.json());


////// USERS //////
// Get all users
router.get('/users', (request, response, next) => {
    console.log("Get all users");

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
        });
    });
});

// get user by id
router.get('/user/:id', (request, response, next) => {
    console.log("Get specific user by id");

    var sql = "select * from user where id = ?";
    var params = [request.params.id]

    database.get(sql, params, (error, row) => {
        if (error) {
            response.status(400).json({ "error": error.message });
            return;
        }
        response.json({
            "message": "success",
            "data": row
        });
    });
});

// Create new
router.post('/user', (request, response, next) => {
    console.log("Create new user");

    var errors = [];

    if (!request.body.password) {
        errors.push('No password!');
    }
    
    if (!request.body.email) {
        errors.push('No email!');
    }

    if (errors.length) {
        response.status(400).json({ "error": errors.json(",") });
        return;
    }

    var data = {
        name: request.body.name,
        email: request.body.email,
        password: md5(request.body.password)
    }

    var sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
    var params = [data.name, data.email, data.password];

    database.run(sql, params, (error, result) => {
        if (error) {
            response.status(400).json({ "error": error.message });
            return;
        }

        response.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        });
    });
});

// Delete user by id
router.delete('/user/:id', (request, response, next) => {
    console.log(`Delete user by id: ${request.params.id}`);

    var sql = 'DELETE FROM user WHERE id = ?';

    database.run(
        sql,
        request.params.id,
        (error, result) => {
            if (error) {
                response.status(400).json({ "error": response.message });
                return;
            }
            response.json({ "message": "deleted", changes: this.changes })
    });
});


////// EXPENCES //////
router.get('/expences', (request, response, next) => {
    console.log("Get all expences");

    var sql = "select * from expence";
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

module.exports = router;
