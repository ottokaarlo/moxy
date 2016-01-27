angular.module('ecosquared', []).controller('mainCtrl', function($http) {

      var vm = this;

      $http.post('/api').success(function(data, status, headers, config){

         vm.Prod         = data.data;

         vm.userData     = data.result.userdetail[0];
         vm.Balance      = data.result.primary_data.balance;
         vm.cantProd     = (data.data).length;
         vm.spanCantProd = true;
         vm.load         = false;
         vm.pound        = true;

         vm.ProdSelect = function(item) {

            vm.index      = vm.Prod.indexOf(item);
            vm.FinalProd  = vm.Prod[vm.index];
            vm.textProd   = true;
            vm.comment4_v = false;
            vm.comment_ev = true;

            if(vm.comment3_gift === false) {
               vm.comment4_v = true;
            }

            $('#gPeople').addClass('hidden');
            $("#fProd").removeClass("hidden");

            $("#accordion .in").delay(250).queue(function(){
               $("#accordion .in").collapse("hide").dequeue();
            });

            $("#seeMoreBtn-2").removeClass("disabled");
            $("#value").prop("disabled", false);

            vm.like = function() {
               vm.defaultBtn = true;
            };


            $http.post('/offer', {"card_id" : vm.FinalProd.card_id})
            .success(function(data, status, headers, config) {

               vm.showTable = true;
               vm.People    = data.data;
               vm.value     = false;

               vm.PeopleSelect = function(item) {

                  $("#gPeople").removeClass("hidden");

                  vm.value         = false;
                  vm.comment3_gift = true;

                  vm.index2        = vm.People.indexOf(item);
                  vm.FinalPeople   = vm.People[vm.index2];
                  vm.priceDef      = false;
                  vm.lgGift        = false;
                  vm.value2        = true;
                  vm.lgRevoke      = false;


                  $("#accordion .in").delay(250).queue(function(){
                     $("#accordion .in").collapse("hide").dequeue();
                  });

                  if(vm.FinalPeople.target_status == "1") {
                     $("#price").prop("disabled", true);
                     $("#price").select2("val", vm.FinalPeople.co_gift);

                     vm.lgRevoke = true;
                     vm.priceDef = true;
                  }
                  else if(vm.FinalPeople.target_status == "3" || vm.FinalPeople.target_status == "4" || vm.FinalPeople.target_status == "5") {

                     $("#price").prop("disabled", false);
                     $("#price").select2("val", 0.01);

                     vm.lgGift = true;
                     vm.priceDef = true;
                  }
                  else if(vm.FinalPeople.target_status == "2" || vm.FinalPeople.target_status == "6" || vm.FinalPeople.target_status == "7") {

                     $("#price").prop("disabled", true);
                     $("#price").select2("val", 0.01);
                     vm.priceDef = false;
                  }

               }; //PeopleSelect

               vm.DefaultToGift = function() {

                  $("#price").select2("val", 0.01);
                  $('.select2-container--default .select2-selection--single .select2-selection__rendered').removeClass('violet');
                  $('.select2-container--default .select2-selection--single .select2-selection__placeholder').removeClass('white');
                  $('.table-hover').addClass("gtr");

                  vm.showTable     = true;
                  vm.defLike       = true;
                  vm.gift          = true;
                  vm.tableEmpty    = true;
                  vm.tableFull     = true;
                  vm.comment4_v    = true;
                  vm.comment3_gift = false;

                  vm.comment4_v = true;
                  vm.comment3_gift = false;
                  $('#p-one').addClass("back-l-g");
                  $("#gPeople").addClass("hidden");
                  vm.cantPers = (vm.People).length;
                  vm.spanCantPers = true;
               };//vm.DefaultToGift();

            }).error(function(data, status, headers, config) {
               console.log("error on /offer");
               console.log(data);
            }); //POST /offer

         }; //ProdSelect

         vm.invite = function() {

            vm.defLike    = true;
            vm.gift       = false;
            vm.invitE     = true;
            vm.panels     = true;
            vm.invitePers = true;

         }; //invite

         vm.create = function() {

            vm.defLike    = true;
            vm.gift       = false;
            vm.creatE     = true;
            vm.panels     = true;
            vm.createProd = true;
            vm.userID     = data.result.userdetail[0].uid;
            vm.userNM     = data.result.userdetail[0].lastname + " " + data.result.userdetail[0].firstname;
            vm.ME         = '"Me"';
            vm.FinalPeople2 = {"username" : '"Me"', "uid" : vm.userID};

            $("#value2").prop("disabled", false);

            $http.post('/myprojects').success(function(data, status, headers, config) {

                  vm.People2 = data.data;
                  vm.People2.unshift({"username" : vm.userNM, "uid" : vm.userID});
                  vm.People2.unshift({"username" : "Unknow Originator", "uid" : 0});

                  vm.PeopleSelect2 = function(item) {

                     vm.index3 = vm.People2.indexOf(item);
                     vm.FinalPeople2 = vm.People2[vm.index3];

                     if(vm.FinalPeople2.username == vm.userNM) {
                        vm.FinalPeople2.username = '"Me"';
                     }

                     $("#accordion2 .in").delay(250).queue(function(){
                        $("#accordion2 .in").collapse("hide").dequeue();
                     });
                  }; //PeopleSelect2

               }).error(function(data, status, headers, config) {
                  console.log("error on /myprojects call");
                  console.log(data);
            }); // error /myproject
         }; //create

      }).error(function(data, status, headers, config) {
         console.log("Error on /api call");
         console.log(data);
      }); // error get('api')

      vm.totalRefresh = function () {
         location.reload();
      }; //totalRefresh

      vm.sortGiftCo = function() {
         if( !($('#accept-prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'gifter_co_gift';
            vm.reverse = !vm.reverse;
         }
      }; //sortGiftCo

      vm.sortCName = function() {
         if( !($('#accept-prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'cardname';
            vm.reverse = !vm.reverse;
         }
      }; //sortCName

      vm.sortCTime = function() {
         if( !($('#accept-prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'date_offered';
            vm.reverse = !vm.reverse;
         }
      }; //sortcTime

      vm.sortCmyVj = function() {
         if( !($('#accept-prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'myVj';
            vm.reverse = !vm.reverse;
         }
      }; //sortCmyVj

      vm.sortOurVj = function () {
         if( !($('#prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'ourVj';
            //vm.reverse = false;
            vm.reverse = !vm.reverse;
         }

         if( !($('#person-panel').hasClass('collapsed')) ){
            vm.predicate = 'mod_date';
            vm.reverse = !vm.reverse;
         }
      }; //sortOurVj

      vm.sortName = function () {
         if( !($('#prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'cardname';
            vm.reverse = !vm.reverse;
         }

         if( !($('#person-panel').hasClass('collapsed')) ){
            vm.predicate = 'target_name';
            vm.reverse = !vm.reverse;
         }

         if( !($('#createUser-panel').hasClass('collapsed')) ){
            vm.predicate = 'username';
            vm.reverse = !vm.reverse;
         }
      }; //sortName

      vm.sortTime = function () {
         if( !($('#prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'date_valued';
            vm.reverse = !vm.reverse;
         }

         if( !($('#person-panel').hasClass('collapsed')) ){
            vm.predicate = 'mod_date';
            vm.reverse = !vm.reverse;
         }
      }; //sortTime

      vm.sortMyVj = function () {
         if( !($('#prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'myVj';
            vm.reverse = !vm.reverse;
         }

         if( !($('#person-panel').hasClass('collapsed')) ){
            vm.predicate = 'co_gift';
            vm.reverse = !vm.reverse;
         }
      }; //sortMyVj

      vm.value = true;

      vm.DefaultToGift = function() {

         $("#helpComment2").removeClass("hidden");
         $("#gProd").addClass("hidden");

         vm.textgProd  = false;
         vm.defLike    = true;
         vm.acceptDef  = false;
         vm.acceptBTN  = false;
         vm.reject     = true;
         vm.gifterProd = '';
         vm.defNav     = true;
         vm.accNav     = true;
         vm.panels     = true;
         vm.acceptProd = true;

         $http.post('/api2').success(function(data, status, headers, config) {

            vm.gProd = data.data;
            console.log(vm.gProd);

            vm.gcantProd = (data.data).length;
            vm.gspanCantProd = true;

            vm.giftSelect = function(item) {

               vm.index3     = vm.gProd.indexOf(item);
               vm.gifterProd = vm.gProd[vm.index3];
               vm.textgProd  = true;

               $("#helpComment2").addClass("hidden");
               $("#gProd").removeClass("hidden");

               $("#accordion3 .in").delay(250).queue(function(){
                  $("#accordion3 .in").collapse("hide").dequeue();
               });

               $('#seeMoreBtn').removeClass("disabled");

               vm.acceptDef = true;
               vm.acceptBTN = true;
            };

         }).error(function(data1, status, headers, config) {
            console.log("error");
            console.log(data1);
         });
      }; //DefaultToGift

      vm.accToDef = function() {

         vm.defLike    = false;
         vm.reject     = false;
         vm.panels     = false;
         vm.acceptProd = false;
         vm.defNav     = false;
         vm.accNav     = false;
      }; //accToDef


      vm.comment3_gift = true;
      vm.comment4_v    = true;
      vm.comment_ev    = false;

      $(".score").select2({
         placeholder: "#",
         minimumResultsForSearch: Infinity,
         disabled: true,
      });

      $(".price-select").select2({
         minimumResultsForSearch: Infinity,
         disabled: true,
      });

}); //controller