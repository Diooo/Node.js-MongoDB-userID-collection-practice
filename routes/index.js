var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/c4y', function(req, res, next) {
  res.render('cash4you', { title: 'Cash 4 you' });
});


router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{}, function(e,docs) {
        res.render('userlist', {
            "userlist": docs
        });
    });
});
// GET New User Page.
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

// Post to add user service
router.post('/adduser', function(req, res) {
    //set our internal DB variable
    var db = req.db;
    //Get our form values. These rely on the 'name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    //Set our collection
    var collection = db.get('usercollection');
    //submit to the DB
    collection.insert({
    "username": userName,
    "email": userEmail
    }, function(err, doc) {
        if(err) {
            //if it failed, return error
            res.send("Error");
        }
        else {
            //and orward to success page
            res.redirect("userlist");
        }
    });
});




module.exports = router;
