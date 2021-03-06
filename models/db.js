/**
 * Created by leonid on 07.06.16.
 */
var mysql   = require('mysql');
var config  = require('../config');

// DB connection start

function Db() {
    this.pool = mysql.createPool(config.db_config);
    this.db_name = config.db_config.database;
}

Db.prototype = {
    config      : config,
    constructor : Db,
    query       : function(query, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                return callback(err);
            }

            connection.query(query, function (err, rows) {
                if (err) {
                    return callback(err);
                }
                connection.release();
                callback(false, rows);
            });
        });
    }
};
module.exports = new Db;