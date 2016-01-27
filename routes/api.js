var express = require('express');
var router  = express.Router();
var request = require('request');
var validator = require('validator');

router.post('/api', function(req, res) {

   request.post('https://api.ecosquared.gift/things/cards/received_byme',
             {body: JSON.stringify({"user_id": req.session.user_id })}, function (error, response, body) {

      if (!error && response.statusCode == 200) {

         var data = JSON.parse(body);
         res.json(data);

      }else{
         console.log("Error on /api "+error);
      }
   });
});

router.post('/things/evaluate', function(req, res) {

   user    = req.session.user_id;
   card    = +(req.body.card_id);
   vj      = +(req.body.Vj);
   comment = validator.blacklist(req.body.comment, "'");

   request.post('https://api.ecosquared.gift/things/evaluate',
   {body: JSON.stringify({"user_id": req.session.user_id, "card_id": card, "Vj": vj, "comment": comment})}, function (error, response, body) {

      if (!error && response.statusCode == 200) {

         var data = JSON.parse(body);
         res.json(data);

      }else{
         console.log("Error on /evaluate");
         console.log(response.statusCode);
         console.log(error);
      }

   });
});


router.post('/cards/create', function(req, res) {

   var originator       = req.body.originator;
   console.log(originator);
   var originatorID     = +(req.body.originator_id);
   var creator_id       = req.session.user_id;
   var card_name        = validator.blacklist(req.body.card_name, "'");
   var gift             = validator.blacklist(req.body.gift, "'");
   var creation_eval    = +(req.body.creation_eval);
   var original_comment = validator.blacklist(req.body.original_comment, "'");


   request.post('https://api.ecosquared.gift/things/cards/create',

   {body: JSON.stringify({"originator": originator,
                          "originatorID": originatorID,
                          "creator_id": creator_id,
                          "card_name": card_name,
                          "the_gift": gift,
                          "creation_eval": creation_eval,
                          "original_comment": original_comment
                        })}, function (error, response, body) {

      if (!error && response.statusCode == 200) {

         var data = JSON.parse(body);
         res.json(data);
         console.log(data);

      }else{

         console.log("Error on /create");
         console.log(response.statusCode);
         console.log(error);
      }

   });

});


router.post('/offer', function(req, res) {

  var user_id = req.session.user_id;
  var card_id = +(req.body.card_id);

  request.post('https://api.ecosquared.gift/gift/offer_toothers',

  {body: JSON.stringify({"user_id": user_id,
                         "card_id": card_id
                       })}, function (error, response, body) {

     if (!error && response.statusCode == 200) {

        var data = JSON.parse(body);
        res.json(data);

     }else{
         console.log("Error on /offer");
         console.log(response.statusCode);
         console.log(error);
     }
  });
});


router.post('/gift', function(req, res) {

  var gifter        = req.session.user_id;
  var receiver      = +(req.body.receiver);
  var co_gift_value = +(req.body.co_gift_value);
  var comment       = validator.blacklist(req.body.comment, "'");
  var card_id       = +(req.body.card_id);

  request.post('https://api.ecosquared.gift/gift/gift',

  {body: JSON.stringify({"giver": gifter,
                         "receiver": receiver,
                         "co_gift_value": co_gift_value,
                         "comment": comment,
                         "card_id": card_id
                       })}, function (error, response, body) {

     if (!error && response.statusCode == 200) {

        var data = JSON.parse(body);
        res.json(data);

     }else{
         console.log("Error on /gift");
         console.log(response.statusCode);
         console.log(error);
     }
  });
});


router.post('/revoke', function(req, res) {

  var gift_id = +(req.body.gift_id);
  var comment = validator.blacklist(req.body.comment, "'");
  var card_id = +(req.body.card_id);

  request.post('https://api.ecosquared.gift/gift/revoke',

  {body: JSON.stringify({"gift_id": gift_id,
                         "comment": comment,
                         "card_id": card_id
                       })}, function (error, response, body) {

     if (!error && response.statusCode == 200) {

        var data = JSON.parse(body);
        res.json(data);

     }else{
         console.log("Error on /revoke");
         console.log(response.statusCode);
         console.log(error);
     }
  });
});

router.post('/api2', function(req, res) {

   request.post('https://api.ecosquared.gift/things/cards/offered_tome',
             {body: JSON.stringify({"user_id": req.session.user_id })}, function (error, response, body) {

      if (!error && response.statusCode == 200) {

         var data = JSON.parse(body);
         res.json(data);

      }else{
         console.log("Error on /api2");
         console.log(error);
      }

   });
});

router.post('/accept', function(req, res) {

  var comment = validator.blacklist(req.body.comment, "'");
  var gift_id = +(req.body.gift_id);

  request.post('https://api.ecosquared.gift/gift/accept',

  {body: JSON.stringify({"comment": comment,
                         "gift_id": gift_id
                       })}, function (error, response, body) {

     if (!error && response.statusCode == 200) {

        var data = JSON.parse(body);
        res.json(data);

     }else{
         console.log("Error on /accept");
         console.log(response.statusCode);
         console.log(error);
     }
  });
});

router.post('/reject', function(req, res) {

  var comment = validator.blacklist(req.body.comment, "'");
  var gift_id = +(req.body.gift_id);

  request.post('https://api.ecosquared.gift/gift/reject',

  {body: JSON.stringify({"comment": comment,
                         "gift_id": gift_id
                       })}, function (error, response, body) {

     if (!error && response.statusCode == 200) {

        var data = JSON.parse(body);
        res.json(data);

     }else{
        console.log(response.statusCode);
        console.log(error);
     }
  });
});

router.post('/myprojects', function(req, res) {

  var user_id = req.session.user_id;

  request.post('https://api.ecosquared.gift/user/inmyprojects',

   {body: JSON.stringify({"user_id": user_id,
                        })}, function (error, response, body) {

      if (!error && response.statusCode == 200) {

         var data = JSON.parse(body);
         res.json(data);

      }else{
         console.log(response.statusCode);
         console.log(error);
      }

   });
});


router.post('/invite/sms', function(req, res) {

  var inviter             = req.session.user_id;
  var app_link            = req.body.app_link;
  var target_mobileSMS    = validator.blacklist(req.body.target_mobileSMS, "'");
  var comment             = validator.blacklist(req.body.comment, "'");
  var co_gift             = +(req.body.co_gift);
  var verification_level  = 1;

  request.post('https://api.ecosquared.gift/invite/sms',

   {body: JSON.stringify({"inviter": inviter,
                          "app_link": app_link,
                          "target_mobileSMS": target_mobileSMS,
                          "invitation_txt": comment,
                          "co_gift": co_gift,
                          "verification_level": verification_level
                        })}, function (error, response, body) {

      if (!error && response.statusCode == 200) {
         var data = JSON.parse(body);
         res.json(data);
      }else{
         console.log(response.statusCode);
         console.log(error);
      }

   });
});

router.post('/invite/lightsms', function(req, res) {

  var inviter             = req.session.user_id;
  var app_link            = req.body.app_link;
  var target_mobileSMS    = validator.blacklist(req.body.target_mobileSMS, "'");
  var comment             = validator.blacklist(req.body.comment, "'");

  request.post('https://api.ecosquared.gift/invite/lightsms',

   {body: JSON.stringify({"inviter": inviter,
                          "app_link": app_link,
                          "target_mobileSMS": target_mobileSMS,
                          "invitation_txt": comment,
                        })}, function (error, response, body) {

      if (!error && response.statusCode == 200) {
         var data = JSON.parse(body);
         res.json(data);
      }else{
         console.log(response.statusCode);
         console.log(error);
      }

   });
});

router.post('/things/cards/edit', function(req, res) {

   var originator   = req.body.originator,
   originator_id    = req.body.originator_id,
   cardname         = req.body.cardname,
   original_comment = req.body.original_comment;

   request.post('https://api.ecosquared.gift/things/cards/edit',

    {body: JSON.stringify({"originator": originator,
                           "originator_id": originator_id,
                           "cardname": cardname,
                           "original_comment": original_comment
                         })}, function (error, response, body) {

       if (!error && response.statusCode == 200) {
          var data = JSON.parse(body);
          res.json(data);
       }else{
          console.log(response.statusCode);
          console.log(error);
       }

    });
});

router.get('/logout', function(req, res){
   req.session.destroy();
   res.redirect('/login');
});



module.exports = router;
