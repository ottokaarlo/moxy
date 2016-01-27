var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

 if(req.session.loggedIn){
   console.log("Var session.user_id "+req.session.user_id);
   res.render('index');
 }else{
   console.log("Var session.user_id "+req.session.user_id);
   res.render('login');
 }
 
});

module.exports = router;
