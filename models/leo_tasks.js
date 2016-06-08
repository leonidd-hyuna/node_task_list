/**
 * Created by leonid on 07.06.16.
 */
var db = require('./db');
var q  = require('q');

var LeoTasksModel = {};
LeoTasksModel.table_name = 'leo_tasks';

LeoTasksModel.getAllTasks = function(request, res, callback) {
    var req = "SELECT * from "+this.table_name;

    db.query(req, function(err, result){
        if (err) {
            return callback(err);
        }
        callback(false, result);
    });
};

LeoTasksModel.addNewTask = function(data, res, callback) {
    var req = "INSERT INTO  `nodejs_test_db`.`"+this.table_name+"`"
            +" (`title`, `description`, `date_scheduled`)"
        +" VALUES ("
        +"'"+data.title+"', '"+data.description+"', '"+data.date_scheduled+"'"
        +");";

    db.query(req, function(err, result){
        if (err) {
            return callback(err);
        }
        callback(false, result);
    });
};

module.exports = LeoTasksModel;