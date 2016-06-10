/**
 * Created by leonid on 07.06.16.
 */
var db = require('./db');
var q  = require('q');

function LeoTasksModel() {
    this.table_name = 'leo_tasks',
    prototype  = db,

    this.getAllTasks = function(res, callback) {
        var req = "SELECT * from `"+db.db_name+"`.`"+this.table_name+"`";

        db.query(req, function(err, result){
            if (err) {
                return callback(err);
            }
            callback(false, result);
        });
    },
        this.getTask = function(data, res, callback) {
        var req = "SELECT * from `"+db.db_name+"`.`"+this.table_name+"`" +
            " WHERE `id`='"+data.id+"'";

        db.query(req, function(err, result){
            if (err) {
                return callback(err);
            }
            callback(false, result);
        });
    },
    this.addNewTask = function(data, res, callback) {
        var req = "INSERT INTO  `"+db.db_name+"`.`"+this.table_name+"`"
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
    },
    this.deleteTask = function(data, res, callback) {
        var req = "DELETE FROM `"+db.db_name+"`.`"+this.table_name+"`"
            +" WHERE `id` = '"+data.id+"';";

        db.query(req, function(err, result){
            if (err) {
                return callback(err);
            }
            callback(false, result);
        });
    },
    this.patchTask = function(data, res, callback) {
        var req = "UPDATE `"+db.db_name+"`.`"+this.table_name+"`"
            +" SET `date_finished` = '" + data.date_finished + "'" +
            "WHERE `id`='"+data.id+"';";

        db.query(req, function(err, result){
            if (err) {
                return callback(err);
            }
            callback(false, result);
        });
    }
};

module.exports = new LeoTasksModel;