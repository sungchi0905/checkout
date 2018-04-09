var db = require('../dbconnection'); //reference of dbconnection.js  
var user_acct = {  
    
    getUserAccount: function(id, callback) {  
        return db.query("SELECT * FROM USER U JOIN checkout_db.ACCOUNT A on U.ACCT_ID = A.id WHERE U.id = ?", [id], callback);  
    }
};  


module.exports = user_acct;  