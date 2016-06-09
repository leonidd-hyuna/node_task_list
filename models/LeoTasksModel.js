/**
 * Created by leonid on 07.06.16.
 */
var db = require('./db');
var q  = require('q');

var LeoTasksModel = {
    table_name      : 'leo_tasks',
    database_name   : db.pool.config.connectionConfig.database,

    getAllTasks : function(res, callback) {
        var req = "SELECT * from `"+this.database_name+"`.`"+this.table_name+"`";

        db.query(req, function(err, result){
            if (err) {
                return callback(err);
            }
            callback(false, result);
        });
    },
    getTask : function(data, res, callback) {
        var req = "SELECT * from `"+this.database_name+"`.`"+this.table_name+"`" +
            " WHERE `id`='"+data.id+"'";

        db.query(req, function(err, result){
            if (err) {
                return callback(err);
            }
            callback(false, result);
        });
    },
    addNewTask : function(data, res, callback) {
        var req = "INSERT INTO  `"+this.database_name+"`.`"+this.table_name+"`"
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
    deleteTask : function(data, res, callback) {
        var req = "DELETE FROM `"+this.database_name+"`.`"+this.table_name+"`"
            +" WHERE `id` = '"+data.id+"';";

        db.query(req, function(err, result){
            if (err) {
                return callback(err);
            }
            callback(false, result);
        });
    },
    patchTask : function(data, res, callback) {
        var req = "UPDATE `"+this.database_name+"`.`"+this.table_name+"`"
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

module.exports = LeoTasksModel;