var express = require('express');
var router = express.Router();

// DB connection start
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '10.0.10.7',
    user     : 'root',
    password : 'jomedia123',
    database : 'nodejs_test_db'
});

/* GET users listing. */
router.post('/', function(req, res, next) {
    connection.query('SELECT * from leo_tasks', function(err, rows, fields) {
        if (err) {
            throw err;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(rows));
    });
});

module.exports = router;
