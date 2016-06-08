/**
 * Created by leonid on 07.06.16.
 */
var db = require('./db');
var q       = require('q');

var LeoTasksModel = {};

LeoTasksModel.getAllTasks = function(request, res, callback) {
    var req = 'SELECT * from leo_tasks';

    db.query(req, function(err, result){
        if (err) {
            return callback(err);
        }
        callback(false, result);
    });
};

module.exports = LeoTasksModel;