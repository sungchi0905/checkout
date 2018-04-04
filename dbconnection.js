var mysql = require('mysql');  
var connection = mysql.createPool({  
    host: 'localhost',  
    user: 'root',  
    password: 'chi2063',  
    database: 'sys'  
});  
module.exports = connection;  