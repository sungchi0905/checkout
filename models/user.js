var db = require('../dbconnection'); //reference of dbconnection.js  
var user = {  
    findOne: function(id, callback) {  
        return db.query("select * from user where USER_ID=?", [id], callback);  
    },
    
    getAccount: function(id, callback) {  
        return db.query("select acct_id from user where USER_ID=?", [id], callback);  
    },
    
    createUser: function(password,newUser, callback) {  
        return db.query("Insert into USER(first_name, last_name, role_type, acct_id, password, user_id, user_phone, user_email) values(?,?,?,?,?,?,?,?)", [newUser.firstName, newUser.lastName, newUser.roleType, newUser.acctId, password, newUser.userId, newUser.userPhone, newUser.userEmail], callback); 
    }
};  


module.exports = user;  