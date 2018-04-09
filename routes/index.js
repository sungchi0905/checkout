var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');
var config = require('../config');  
var user = require('../models/user'); 
var user_acct = require('../models/user_acct');  
var crypto = require('crypto');

router.post('/authenticate', function(req, res, next) {  
    user.findOneAdmin(req.body.id, function(err, user) { 
        
        if(err) throw err;
        if (user.length <= 0){
            res.render('login', { msg: 'User name does not exist.' });
            //res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user.length > 0) {
              // check if password matches
              if (user[0].PASSWORD != md5(req.body.password)) {
              res.render('login', { msg: 'Your password is incorrect.' });
                //res.json({ success: false, message: 'Authentication failed. Wrong password.' });
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
                    res.cookie('userId',user[0].ID);
                    res.redirect('/');
                
              }   
        }

    });  
});  


router.get('/logout', function(req, res, next) {  
  res.cookie('auth',"");
  res.cookie('userId',"");
  res.render('login');
}); 

function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}

//Check token

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.cookies.auth || req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        res.render('login', { title: 'Express' });
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    /* GET login page. */
    res.render('login', { title: 'Express' });
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var userId = req.cookies.userId || req.query.id;
    user_acct.getUserAccount(userId, function(err, userAcct) { 

        if(err) throw err;
        //res.json(userAcct);  
        res.render('index', {"ID":userAcct[0].ID,"FIRST_NAME":userAcct[0].FIRST_NAME,"LAST_NAME":userAcct[0].LAST_NAME,"ACCT_ID":userAcct[0].ACCT_ID,"COMPANY_NAME":userAcct[0].COMPANY_NAME});
    });

});

module.exports = router;
