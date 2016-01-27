   var express   = require('express');
var router    = express.Router();
var request   = require('request');
var validator = require('validator');

router.get('/login', function(req, res, next) {
  res.render('login');
});


router.post('/login', function(req, res, next) {

   var user_name = validator.escape(req.body.user_name);
   var password  = validator.escape(req.body.password);

   request.post('https://api.ecosquared.gift/login',
             {body: JSON.stringify({"user_name": user_name, "password": password})},
             function (error, response, body) {

      if (!error && response.statusCode == 200) {

         var data = JSON.parse(body);

         console.log("Result: "+data.result.result);

         if(data.result.result == "OK"){

            req.session.loggedIn = true;
            req.session.user_id  = data.result.primary_data.this_user_id;
            res.json({success: true, id: data.result.primary_data.this_user_id});

         }else{
            res.json({success: false, msg: data.result.errorText});
            console.log("Error: "+data.result.errorText);
         }

      }else{

         console.log("Response: "+response.statusCode);
         console.log("Error: "+error);
      }

   });
});

router.post('/register', function(req, res, next) {
   //req.session.loggedIn = true;

   var first_name     = validator.escape(req.body.first_name);
   var last_name      = validator.escape(req.body.last_name);
   var user_name      = validator.escape(req.body.user_name);
   var password       = validator.escape(req.body.password);
   var mail           = validator.escape(req.body.mail);
   var movile         = validator.escape(req.body.movile);
   var profile_info   = validator.escape(req.body.profile_info);

   request.post('https://api.ecosquared.gift/register',
             {body: JSON.stringify({"first_name": first_name,
                                    "last_name": last_name,
                                    "user_name": user_name,
                                    "password": password,
                                    "mail": mail,
                                    "movile": movile,
                                    "profile_info": profile_info
                                  })}, function (error, response, body) {

      if (!error && response.statusCode == 200) {

         var data = JSON.parse(body);

         if(data.result.result == "OK"){
            //req.session.loggedIn = true;
            //req.session.user_id  = data.result.primary_data.this_user_id;
            //res.json({success: true, id: data.result.primary_data.this_user_id});
         }else{
            console.log(data);
            res.json({success: false, msg: data.result.errorText});
         }
      }else{
         console.log(error);
      }

   });
});


router.post('/lightregister', function(req, res, next) {
   //req.session.loggedIn = true;

   var first_name     = validator.escape(req.body.first_name);
   var last_name      = validator.escape(req.body.last_name);
   var user_name      = validator.escape(req.body.user_name);
   var password       = validator.escape(req.body.password);

   request.post('https://api.ecosquared.gift/lightregister',
             {body: JSON.stringify({"first_name": first_name,
                                    "last_name": last_name,
                                    "user_name": user_name,
                                    "password": password,
                                  })}, function (error, response, body) {

      if (!error && response.statusCode == 200) {

         var data = JSON.parse(body);

         if(data.result.result == "OK"){
            res.json({success: true});
         }else{
            console.log(data);
            res.json({success: false, msg: data.result.errorText});
         }
      }else{
         console.log(error);
      }

   });
});


router.post('/changePassword', function(req, res) {

   var ap = req.body.ap;
   console.log("ap "+ap);
   var np1 = req.body.np1;
   console.log("np1 "+np1);
   var np2 = req.body.np2;
   console.log("np2 "+np2);

   if(np1 != np2){
      res.json({success: false, msg: 'Passwords do not match'});
   }else{

   request.post('https://api.ecosquared.gift/users/newpass',
             {body: JSON.stringify({"user_id": req.session.user_id, "actual_password": ap, "new_password": np2})},
             function (error, response, body) {

      if (!error && response.statusCode == 200) {

         var data = JSON.parse(body);

         console.log("Result: "+data.result.result);

         if(data.result.result == "OK"){

            res.json({success: true, msg: 'ok'});

         }else{
            res.json({success: false, msg: 'error'});
            console.log("Error: "+data.result.errorText);
         }

      }else{
         console.log("Response: "+response.statusCode);
         console.log("Error: "+error);
         res.json({success: false, msg: response.statusCode});
      }

   });

}//else

});

module.exports = router;
