var express         = require('express');
var router          = express.Router();
var q               = require('q');
var LeoTaskModel    = require('../models/leo_tasks');

/* POST*/
router.post('/', function(req, res, next) {

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

        LeoTaskModel.addNewTask(data, res, function(err, result) {
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
