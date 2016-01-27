//   <script type="text/javascript">
     $(document).ready(function() {

         $("#passError").hide();
         $("#passOK").hide();

      });
//   </script>

//   <!-- Like Form -->
//   <script type="text/javascript">
   $(document).ready(function() {
      $('#LikeForm').on('submit', function(e){
         e.preventDefault();
         $.ajax({
            type: 'POST',
            url: '/things/evaluate',
            data: {
               card_id: $('#card_id').val(),
               comment: $('#comment').val(),
               Vj: $('#value').val(),
            },
            success: function(result) {
               console.log(result);
               if(result.error){
                  console.log("error");
               }else{
                  console.log("todo ok");

                  if(result.result.result == "ERROR") {
                     $("#msg_alert").html(result.result.errorText);
                     $("#modal-status-err").modal("show");
                  }
                  else if (result.result.result == "OK") {
                     $("#msg_alert_acc").html("Card successfully evaluated");
                     $("#modal-status-acc").modal("show");
                     setTimeout(window.location.reload.bind(window.location), 500);
                  }
               }
            },
            error: function(xhr, ajaxOptions, thrownError) {
               console.log(xhr.status);
               console.log(thrownError);
            },
         });
      });
   });
//   </script>

//   <!-- Create Form -->
//   <script type="text/javascript">
   $(document).ready(function() {
      $('#CreateForm').on('submit', function(e){
         e.preventDefault();
         $.ajax({
            type: 'POST',
            url: '/cards/create',
            data: {
               originator: $('#originator_name').val(),
               originator_id: $('#author_id').val(),
               card_name: $('#prod_name').val(),
               gift: $('#content_link').val(),
               creation_eval: $('#value2').val(),
               original_comment: $('#original_comment').val(),
            },
            success: function(result) {
               console.log(result);
               if(result.error){
                  console.log("error");
               }else{
                  console.log("todo ok2");

                  if(result.result.result == "ERROR") {
                     $("#msg_alert").html(result.result.errorText);
                     $("#modal-status-err").modal("show");
                  }
                  else if (result.result.result == "OK") {
                     $("#msg_alert_acc").html("Card successfully created.");
                     $("#modal-status-acc").modal("show");
                     setTimeout(window.location.reload.bind(window.location), 500);
                  }
               }
            },
            error: function(xhr, ajaxOptions, thrownError) {
               console.log(xhr.status);
               console.log(thrownError);
            },
         });
      });
   });
//   </script>

//   <!-- Gift Form -->
//   <script type="text/javascript">
   $(document).ready(function() {
      $('#GiftForm').on('submit', function(e){
         e.preventDefault();
         $.ajax({
            type: 'POST',
            url: '/gift',
            data: {
               receiver: $('#receiver').val(),
               co_gift_value: $('#price').val(),
               comment: $('#comment_gift').val(),
               card_id: $('#card_id').val(),
            },
            success: function(result) {
               console.log(result);
               if(result.error){
                  console.log("error");
               }else{
                  console.log("todo ok3");

                  if(result.result.result == "ERROR") {
                     $("#msg_alert").html(result.result.errorText);
                     $("#modal-status-err").modal("show");
                  }
                  else if (result.result.result == "OK") {
                     $("#msg_alert_acc").html("Card successfully gifted.");
                     $("#modal-status-acc").modal("show");
                     setTimeout(window.location.reload.bind(window.location), 500);
                  }
               }
            },
            error: function(xhr, ajaxOptions, thrownError) {
               console.log(xhr.status);
               console.log(thrownError);
            },
         });
      });
   });
 //  </script>

//   <!-- Revoke Form -->
//   <script type="text/javascript">
   $(document).ready(function() {
      $('#RevokeForm').on('submit', function(e){
         e.preventDefault();
         $.ajax({
            type: 'POST',
            url: '/revoke',
            data: {
               gift_id: $('#gift_id').val(),
               comment: $('#comment_gift').val(),
               card_id: $('#card_id').val(),
            },
            success: function(result) {
               console.log(result);
               if(result.error){
                  console.log("error");
               }else{
                  console.log("todo ok4");

                  if(result.result.result == "ERROR") {
                     $("#msg_alert").html(result.result.errorText);
                     $("#modal-status-err").modal("show");
                  }
                  else if(result.result.result == "OK") {
                     $("#msg_alert_acc").html("Card successfully revoked.");
                     $("#modal-status-acc").modal("show");
                     setTimeout(window.location.reload.bind(window.location), 500);
                  }
               }
            },
            error: function(xhr, ajaxOptions, thrownError) {
               console.log(xhr.status);
               console.log(thrownError);
            },
         });
      });
   });
//   </script>

//   <!-- Accept Form -->
//   <script type="text/javascript">
   $(document).ready(function() {
      $('#acceptForm').on('submit', function(e){

         e.preventDefault();
         $.ajax({
            type: 'POST',
            url: '/accept',
            data: {
               comment: $('#comment_accept').val(),
               gift_id: $('#gift_id_2').val(),
            },
            success: function(result) {
               console.log(result);
               if(result.error){
                  console.log("error");
               }else{
                  console.log("todo ok5");

                  if(result.result.result == "ERROR") {
                     $("#msg_alert").html(result.result.errorText);
                     $("#modal-status-err").modal("show");
                  }
                  else if (result.result.result == "OK") {
                     $("#modal-more-3").modal("show");
                     var index = (result.data.data).length;
                     $("#gName").val(result.data.data[index-1].gifter_name);
                     $("#cName").val(result.data.data[index-1].cardname);
                     $("#oName").val(result.data.data[index-1].originator);
                     $("#aLink").attr("href", result.data.data[index-1].gift);
                  }
               }
            },
            error: function(xhr, ajaxOptions, thrownError) {
               console.log(xhr.status);
               console.log(thrownError);
            },
         });
      });
   });
//   </script>

//   <!-- Reject Form -->
//   <script type="text/javascript">
   $(document).ready(function() {
      $('#rejectForm').on('submit', function(e){
         e.preventDefault();
         $.ajax({
            type: 'POST',
            url: '/reject',
            data: {
               comment: $('#comment_accept').val(),
               gift_id: $('#gift_id_2').val(),
            },
            success: function(result) {
               console.log(result);
               if(result.error){
                  console.log("error");
               }else{
                  console.log("todo ok51");
                  $(".alert").removeClass("hidden");

                  if(result.result.result == "ERROR") {
                     $("#msg_alert").html(result.result.errorText);
                     $("#modal-status-err").modal("show");
                  }
                  else if (result.result.result == "OK") {
                     $("#msg_alert_acc").html("Card successfully rejected.");
                     $("#modal-status-acc").modal("show");
                     setTimeout(window.location.reload.bind(window.location), 500);
                  }
               }
            },
            error: function(xhr, ajaxOptions, thrownError) {
               console.log(xhr.status);
               console.log(thrownError);
            },
         });
      });
   });
//   </script>

//   <!-- invitation -->
//   <script type="text/javascript">
   $(document).ready(function() {
      $('#inviteLightForm').on('submit', function(e){ //#inviteForm
         e.preventDefault();
         $.ajax({
            type: 'POST',
            url: '/invite/lightsms',
            data: {
               app_link: $('#invEco').val(),
               target_mobileSMS: $('#invite_mobile').val(),
               comment: $('#invite_commet').val(),
               //co_gift: $('#value-3').val()
            },
            success: function(result) {
               console.log(result);
               if(result.error){
                  console.log("error");
               }else{
                  console.log("todo ok12929");
                  $(".alert").removeClass("hidden");

                  if(result.result.result == "ERROR") {
                     $("#msg_alert").html(result.result.errorText);
                     $("#modal-status-err").modal("show");
                  }
                  else if (result.result.result == "OK") {
                     $("#msg_alert_acc").html("Invitation sent successfully.");
                     $("#modal-status-acc").modal("show");
                     setTimeout(window.location.reload.bind(window.location), 500);
                  }
               }
            },
            error: function(xhr, ajaxOptions, thrownError) {
               console.log(xhr.status);
               console.log(thrownError);
            },
         });
      });
   });
//   </script>

//   <!-- invitation -->
//   <script type="text/javascript">
   $(document).ready(function() {
      $('#changePassword').on('submit', function(e){ //#inviteForm
         e.preventDefault();
         $.ajax({
            type: 'POST',
            url: '/changePassword',
            data: {
               ap:  $('#ap').val(),
               np1: $('#np1').val(),
               np2: $('#np2').val()
            },
            success: function(result) {
               console.log(result);
               if(!result.success){
                  console.log("error");
                  $("#passError").html(result.msg);
                  $("#passError").show();
               }else{
                  $(".alert").removeClass("hidden");

                  if(result.msg == "error") {
                     /*$("#modal-content").modal('hide');
                     $("#msg_alert").html(result.msg);
                     $("#modal-status-err").modal("show");*/
                     $("#passError").html(result.msg);
                     $("#passError").show();
                  }
                  else if (result.msg == "ok") {

                     $("#passOK").html(result.msg);
                     $("#passOK").show();
/*
                     $("#modal-content").modal('hide');
                     $("#msg_alert_acc").html("Password Changed.");
                     $("#modal-status-acc").modal("show");
                     setTimeout(window.location.reload.bind(window.location), 700);*/
                  }
               }
            },
            error: function(xhr, ajaxOptions, thrownError) {
               console.log(xhr.status);
               console.log(thrownError);
            },
         });
      });
   });
//   </script>