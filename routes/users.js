var express = require('express');
var router = express.Router();
var user = require('../models/user');  
var crypto = require('crypto');
var jwt    = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {  
    var password = md5(req.body.password);
    user.createUser(password,req.body, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(req.body); //or return count for 1 & 0  
        }  
    });  
});  

function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}

module.exports = router;
