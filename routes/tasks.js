var express         = require('express');
var router          = express.Router();
var q               = require('q');
var LeoTaskModel    = require('../models/leo_tasks');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var deferred = q.defer();
    sendResponse().then(function(newResponse) {
        res.status(200).send(newResponse);
    });

    function sendResponse(){
        LeoTaskModel.getAllTasks(res, function(err, result) {
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
.get('/:id', function(req, res, next) {
    var deferred = q.defer();
    sendTask().then(function(newResponse) {
        res.status(200).send(newResponse);
    });

    function sendTask(){
        var data = {
            id :req.params.id,
        };
        LeoTaskModel.getTask(data, res, function(err, result) {
            if (err) {
                //throw err; //commented because of server fail
                console.log(err);
                deferred.reject(err);
            }
            deferred.resolve(result);
        });
        return deferred.promise;
    }
});

module.exports = router;
