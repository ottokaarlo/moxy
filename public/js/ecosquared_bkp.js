angular.module('ecosquared', [])
   .controller('mainCtrl', function($http) {
      var vm = this; //haces que se pueda mandar a la vista los valores con vm.
      vm.load = true;
         
      vm.totalRefresh = function () {
         location.reload();
      }


      vm.sortGiftCo = function() {
         if( !($('#accept-prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'gifter_co_gift';
            vm.reverse = true;
         }
      }
      vm.sortCName = function() {
         if( !($('#accept-prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'cardname';
            vm.reverse = false;
         }
      }
      vm.sortCTime = function() {
         if( !($('#accept-prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'date_offered';
            vm.reverse = true;
         }
      }
      vm.sortCmyVj = function() {
         if( !($('#accept-prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'myVj';
            vm.reverse = true;
         }         
      }

      vm.sortOurVj = function () {
         if( !($('#prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'ourVj';
            vm.reverse = true;
         } 

         if( !($('#person-panel').hasClass('collapsed')) ){
            console.log("fecha");
            vm.predicate = 'mod_date';
            vm.reverse = true;
         }
      }
      vm.sortName = function () {
         if( !($('#prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'cardname';
            vm.reverse = false;
         }

         if( !($('#person-panel').hasClass('collapsed')) ){
            vm.predicate = 'target_name';
            vm.reverse = false;
         }

         if( !($('#createUser-panel').hasClass('collapsed')) ){
            vm.predicate = 'username';
            vm.reverse = false;
         }
      }
      vm.sortTime = function () {
         if( !($('#prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'date_valued';
            vm.reverse = true;
         }

         if( !($('#person-panel').hasClass('collapsed')) ){
            vm.predicate = 'mod_date';
            vm.reverse = false;
         }
      }
      vm.sortMyVj = function () {
         if( !($('#prod-panel').hasClass('collapsed')) ){
            vm.predicate = 'myVj';
            vm.reverse = true;
         }

         if( !($('#person-panel').hasClass('collapsed')) ){
            console.log("co_gift");
            vm.predicate = 'co_gift';
            vm.reverse = true;
         }
      }

      vm.value = true;
      vm.DefaultToGift = function() {
         $("#helpComment2").removeClass("hidden");
         $("#gProd").addClass("hidden");
         vm.textgProd = false;
         vm.defLike = true;
         vm.acceptDef = false;
         vm.acceptBTN = false;
         vm.reject = true;
         vm.gifterProd = "";
         vm.defNav = true;
         vm.accNav = true;
         vm.panels = true;
         vm.acceptProd = true;
         $('.table-hover').addClass("gtr");

         $http.get('/api2')
         .success(function(data, status, headers, config) { 
            vm.gProd = data.data;
            vm.gcantProd = (data.data).length;
            vm.gspanCantProd = true;

            vm.giftSelect = function(item) {
               vm.index3 = vm.gProd.indexOf(item);
               vm.gifterProd = vm.gProd[vm.index3];
               vm.textgProd = true;

               $("#helpComment2").addClass("hidden");
               $("#gProd").removeClass("hidden");

               $("#accordion3 .in").delay(250).queue(function(){
                  $("#accordion3 .in").collapse("hide").dequeue();
               });

               $('#seeMoreBtn').removeClass("disabled");

               vm.acceptDef = true;
               vm.acceptBTN = true;
            }
         }).error(function(data, status, headers, config) {
            console.log("error");
         });        
      }

      vm.accToDef = function() {
         vm.defLike = false;
         vm.reject = false;
         vm.panels = false;
         vm.acceptProd = false;
         vm.defNav = false;
         vm.accNav = false;
         $('.table-hover').removeClass("gtr");
      }


      vm.comment3_gift = true;
      vm.comment4_v = true;
      vm.comment_ev = false;
      $http.get('/api')
      .success(function(data, status, headers, config) {
         vm.Prod = data.data;
         vm.cantProd = (data.data).length;
         vm.spanCantProd = true;
         vm.userData = data.result.userdetail[0];
         vm.Balance = data.result.primary_data.balance;
         vm.load = false;
         vm.pound = true;

         vm.ProdSelect = function(item) {
            vm.index = vm.Prod.indexOf(item);
            vm.FinalProd = vm.Prod[vm.index];
            vm.textProd = true;
            vm.comment4_v = false;
            vm.comment_ev = true;

            //$('#v-one').addClass('back-v');

            if(vm.comment3_gift == false) {
               vm.comment4_v = true;
            }

            $('#gPeople').addClass('hidden');
            $("#fProd").removeClass("hidden");

            $("#accordion .in").delay(250).queue(function(){
               $("#accordion .in").collapse("hide").dequeue();
            });

            $("#seeMoreBtn-2").removeClass("disabled");
            $("#value").prop("disabled", false);
            $('.select2-container--default .select2-selection--single .select2-selection__rendered').addClass('violet');
            $('.select2-container--default .select2-selection--single .select2-selection__placeholder').addClass('white');

            vm.like = function() {
               vm.defaultBtn = true;
            };

            vm.GiftToDefault = function() {
               vm.defLike = false;
               vm.gift = false;
               vm.tableEmpty = false;
               vm.tableFull = false;
               vm.FinalPeople = "";
               vm.value2 = false;
               vm.showTable = false;
               vm.lgRevoke = false;
               vm.priceDef = false;
               vm.lgGift = false;
               $('.select2-container--default .select2-selection--single .select2-selection__rendered').addClass('violet');
               $('.select2-container--default .select2-selection--single .select2-selection__placeholder').addClass('white');
               $('.select2-container--default .select2-selection--single .select2-selection__rendered').removeClass('green');
               vm.spanCantPers = false;
               $('.table-hover').removeClass("gtr");
               
               $("#helpComment4").removeClass("hidden");
               vm.comment4_v = false;
               vm.comment3_gift = true;
               $('#gPeople').addClass('hidden');
            }

            $http.post('/offer', {"card_id" : vm.FinalProd.card_id}) 
            .success(function(data, status, headers, config) {
               vm.showTable = true;
               vm.People = data.data;
               vm.value = false;
               
               vm.PeopleSelect = function(item) {
                  $("#gPeople").removeClass("hidden");
                  vm.value = false;
                  vm.comment3_gift = true;

                  vm.index2 = vm.People.indexOf(item);
                  vm.FinalPeople = vm.People[vm.index2];
                  vm.priceDef = false;
                  vm.lgGift = false;
                  vm.value2 = true;
                  vm.lgRevoke = false;


                  $("#accordion .in").delay(250).queue(function(){
                     $("#accordion .in").collapse("hide").dequeue();
                  });
                  
                  if(vm.FinalPeople.target_status == "1") {
                     $("#price").prop("disabled", true);
                     $("#price").select2("val", vm.FinalPeople.co_gift);
                     $('.select2-container--default .select2-selection--single .select2-selection__rendered').removeClass('green');
                     $('.select2-container--default .select2-selection--single .select2-selection__placeholder').removeClass('white');
                     
                     vm.lgRevoke = true;
                     vm.priceDef = true;
                  }
                  else if(vm.FinalPeople.target_status == "3" || vm.FinalPeople.target_status == "4"
                     || vm.FinalPeople.target_status == "5") {
                     $("#price").prop("disabled", false);
                     $("#price").select2("val", 0.01);
                     $('.select2-container--default .select2-selection--single .select2-selection__rendered').addClass('green');
                     $('.select2-container--default .select2-selection--single .select2-selection__placeholder').addClass('white');

                     vm.lgGift = true;
                     vm.priceDef = true;
                  }
                  else if(vm.FinalPeople.target_status == "2" || vm.FinalPeople.target_status == "6"
                     || vm.FinalPeople.target_status == "7") {
                     $("#price").prop("disabled", true);
                     $("#price").select2("val", 0.01);
                     vm.priceDef = false;
                     $('.select2-container--default .select2-selection--single .select2-selection__rendered').removeClass('green');
                     $('.select2-container--default .select2-selection--single .select2-selection__placeholder').removeClass('white');
                  }

               }
            })
            .error(function(data, status, headers, config) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
               console.log("error2");
            })

            vm.DefaultToGift = function() {
               $("#price").select2("val", 0.01);
               $('.select2-container--default .select2-selection--single .select2-selection__rendered').removeClass('violet');
               $('.select2-container--default .select2-selection--single .select2-selection__placeholder').removeClass('white');
               $('.table-hover').addClass("gtr");
               vm.showTable = true;
               vm.defLike = true;
               vm.gift = true;
               vm.tableEmpty = true;
               vm.tableFull = true;

               vm.comment4_v = true;
               vm.comment3_gift = false;
               $('#p-one').addClass("back-l-g");
               //$("#helpComment4").addClass("hidden");
               $("#gPeople").addClass("hidden");
               vm.cantPers = (vm.People).length;
               vm.spanCantPers = true;
            }
            //vm.DefaultToGift();
         }

         vm.invite = function() {
            $('.table-hover').addClass("btr");
            vm.defLike = true;
            vm.gift = false;
            vm.invitE = true;
            vm.panels = true;
            vm.invitePers = true;
            $('.select2-container--default .select2-selection--single .select2-selection__rendered').removeClass('violet');
            $('.select2-container--default .select2-selection--single .select2-selection__placeholder').removeClass('white');
            $('.select2-container--default .select2-selection--single .select2-selection__rendered').removeClass('green');
            //$('#value-3').prop("disabled", false);
         }

         vm.create = function() {
            $('.table-hover').addClass("btr");
            $('.select2-container--default .select2-selection--single .select2-selection__rendered').addClass('blue');
            $('.select2-container--default .select2-selection--single .select2-selection__placeholder').addClass('white');
            vm.defLike = true;
            vm.gift = false;
            vm.creatE = true;
            vm.panels = true;
            vm.createProd = true;
            vm.userID = data.result.userdetail[0].uid;
            vm.userNM = data.result.userdetail[0].lastname + " " + data.result.userdetail[0].firstname;
            vm.ME = '"Me"';
            console.log(vm.userID);
            console.log(vm.userNM);
            vm.FinalPeople2 = {"username" : '"Me"', "uid" : vm.userID};
            $("#value2").prop("disabled", false);
            $http.post('/myprojects') 
               .success(function(data, status, headers, config) {
                  vm.People2 = data.data;
                  vm.ccantPers = (vm.People2).length;
                  vm.cspanCantPers = true;
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
                  }
               })
               .error(function(data, status, headers, config) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                  console.log("error2");
               })
         }
      }).error(function(data, status, headers, config) {
         // called asynchronously if an error occurs
         // or server returns response with an error status.
         console.log("error");
      });

      /*
      var helpmodal = document.getElementById('help-modal');
      var mc = new Hammer(helpmodal);      
      mc.add(new Hammer.Press({
            time: 300,
         })
      );      
      mc.on("press tap", function(ev) {
         if(ev.type == "tap") 
            $("#modal-one").modal("show");
         else
            $("#modal-two").modal("show");
      });
      */
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