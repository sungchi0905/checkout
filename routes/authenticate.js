var express = require('express');  
var router = express.Router();  
var user = require('../models/user');  
var crypto = require('crypto');
var jwt    = require('jsonwebtoken');
var config = require('../config');

router.post('/', function(req, res, next) {  
    user.findOne(req.body.id, function(err, user) { 
        
        if(err) throw err;
        if (user.length <= 0){
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user.length > 0) {
              // check if password matches
              if (user[0].PASSWORD != md5(req.body.password)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
              } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                  roleType: user[0].ROLE_TYPE
                };
                
                    var token = jwt.sign(payload,  config.secret, {
                      expiresIn: 1440*60 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.cookie('auth',token);
                
                    res.json({
                      success: true,
                      message: 'Enjoy your token!',
                      token: token
                    });
                
              }   
        }

    });  
});  


router.get('/logout', function(req, res, next) {  
  res.cookie('auth',"");
  res.json({
    success: true,
    message: 'Successfully logged out!'
  }); 
}); 

function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}
module.exports = router;  