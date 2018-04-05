var mysql = require('mysql');  
var connection = mysql.createPool({  
    host: 'localhost',  
    user: 'root',  
    password: 'chi2063',  
    database: 'checkout_db'  
});  
module.exports = connection;  