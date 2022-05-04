const express = require('express');
const router = express.Router();

var database = require('../services/database.js');


////// USERS //////
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
        })
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
