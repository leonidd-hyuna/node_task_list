var express = require('express');
var router  = express.Router();
var q       = require('q');
var db      = require('../models/db');
var LeoTaskModel      = require('../models/leo_tasks');

/* GET users listing. */
router.post('/', function(req, res, next) {

    // sending response from model without promise
    //var result = LeoTaskModel.getAllTasks(req, res, function(err, result) {
    //    res.render('tasks', {tasks: result});
    //});

    // sending response from model WITH promise  ---
    var deferred = q.defer();

    sendResponse().then(function(newResponse) {
        res.send(newResponse, 200);
    });

    function sendResponse(){
        LeoTaskModel.getAllTasks(req, res, function(err, result) {
            if (err) {
                throw err;
            }
            deferred.resolve(result);
        });
        return deferred.promise;
    }
    // --- sending response from model WITH promise

});

module.exports = router;
