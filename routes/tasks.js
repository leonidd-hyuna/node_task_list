var express = require('express');
var router = express.Router();
var q      = require('q');

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

    var deferred = q.defer();

    sendResponse().then(function(newResponse) {
        res.send(newResponse, 200);
    });

    function sendResponse(){

        connection.query('SELECT * from leo_tasks', function(err, rows, fields) {
            if (err) {
                throw err;
            }
            deferred.resolve(rows);
        });
        return deferred.promise;
    }

});

module.exports = router;
