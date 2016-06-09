var express         = require('express');
var router          = express.Router();
var q               = require('q');
var LeoTasksModel    = require('../models/LeoTasksModel');

router.get('/', function(req, res) {
    var deferred = q.defer();
    sendResponse().then(function(newResponse) {
        res.status(200).send(newResponse);
    });

    function sendResponse(){
        LeoTasksModel.getAllTasks(res, function(err, result) {
            if (err) {
                //throw err; //commented because of server fail
                console.log(err);
                deferred.reject(err);
            }
            deferred.resolve(result);
        });
        return deferred.promise;
    }
})
.get('/:id', function(req, res) {
    var deferred = q.defer();
    sendTask().then(function(newResponse) {
        res.status(200).send(newResponse);
    });

    function sendTask(){
        var data = {
            id :req.params.id,
        };
        LeoTasksModel.getTask(data, res, function(err, result) {
            if (err) {
                //throw err; //commented because of server fail
                console.log(err);
                deferred.reject(err);
            }
            deferred.resolve(result);
        });
        return deferred.promise;
    }
})
.post('/', function(req, res) {

    var deferred = q.defer();

    sendResponse().then(function(newResponse) {
        res.status(200).send(newResponse);
    });

    function sendResponse(){
        var data = {
            title           :req.body.title,
            description     :req.body.description,
            date_scheduled  :req.body.date_scheduled
        };

        LeoTasksModel.addNewTask(data, res, function(err, result) {
            if (err) {
                //throw err; //commented because of server fail
                console.log(err);
                deferred.reject(err);
            }
            deferred.resolve(result);
        });
        return deferred.promise;
    }
    // --- sending response from model WITH promise

})
.delete('/:id', function(req, res) {

    var deferred = q.defer();

    sendResponse().then(function(newResponse) {
        res.status(200).send(newResponse);
    });

    function sendResponse(){
        var data = {
            id :req.params.id,
        };

        LeoTasksModel.deleteTask(data, res, function(err, result) {
            if (err) {
                //throw err; //commented because of server fail
                console.log(err);
                deferred.reject(err);
            }
            deferred.resolve(result);
        });
        return deferred.promise;
    }
    // --- sending response from model WITH promise

})
.patch('/:id', function(req, res) {

    var deferred = q.defer();

    sendResponse().then(function(newResponse) {
        res.status(200).send(newResponse);
    });

    function sendResponse(){
        var date = new Date();
        var data = {
            id              :req.params.id,
            date_finished   :date.toISOString(),
        };

        LeoTasksModel.patchTask(data, res, function(err, result) {
            if (err) {
                //throw err; //commented because of server fail
                console.log(err);
                deferred.reject(err);
            }
            deferred.resolve(result);
        });
        return deferred.promise;
    }
    // --- sending response from model WITH promise

});

module.exports = router;
