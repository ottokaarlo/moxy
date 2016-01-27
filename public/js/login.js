angular.module('ecosquared', [])
   .controller('loginCtrl', function() {

      var vm = this; 

      vm.login = function() {

         vm.lg      = true;
         vm.rg      = true;
         vm.vl      = true;
         vm.lgInput = true;
         vm.back    = false;

         $('.centered').addClass("hidden");

         vm.back = function () {

            vm.lg      = false;
            vm.rg      = false;
            vm.vl      = false;
            vm.lgInput = false;
            vm.lgReg   = false;
            vm.lgVal   = false;
            vm.back    = false;

            $('.centered').removeClass("hidden");
         };
      }; //login

      vm.register = function() {

         vm.lg    = true;
         vm.rg    = true;
         vm.vl    = true;
         vm.lgReg = true;
         vm.back  = false;

         $('.centered').addClass("hidden");

         vm.back = function () {

            vm.lg      = false;
            vm.rg      = false;
            vm.vl      = false;
            vm.lgInput = false;
            vm.lgReg   = false;
            vm.lgVal   = false;
            vm.back    = false;

            $('.centered').removeClass("hidden");
         };
      };//register
      
      vm.validate = function() {

         vm.lg    = true;
         vm.rg    = true;
         vm.vl    = true;
         vm.lgVal = true;
         vm.back  = false;

         $('.centered').addClass("hidden");

         vm.back = function () {

            vm.lg      = false;
            vm.rg      = false;
            vm.vl      = false;
            vm.lgInput = false;
            vm.lgReg   = false;
            vm.lgVal   = false;
            vm.back    = false;

            $('.centered').removeClass("hidden");
         };
      };

   }); //controller login