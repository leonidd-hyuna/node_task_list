var express         = require('express');
var router          = express.Router();
var q               = require('q');
var LeoTaskModel    = require('../models/leo_tasks');

/* DELETE*/
router.delete('/:id', function(req, res, next) {

    var deferred = q.defer();

    sendResponse().then(function(newResponse) {
        res.status(200).send(newResponse);
    });

    function sendResponse(){
        var data = {
            id :req.params.id,
        };

        LeoTaskModel.deleteTask(data, res, function(err, result) {
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
