var db = require('../dbconnection'); //reference of dbconnection.js  
var user = {  
    findOne: function(id, callback) {  
        return db.query("select * from user where USER_ID=?", [id], callback);  
    }
};  
module.exports = user;  