var app = {
  initialize: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function() {
    //alert("Device IS ready");
    //alert('We are Testing ');


      
  var IsActiveApp = localStorage.getItem("ActiveApp");




    function checkConnection() {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';
      //alert('Connection type: ' + states[networkState]);
      if (states[networkState] == states[Connection.NONE]) {
        //alert("أنت غير متصل بالانترنت !");
        $(".check_interent")
          .fadeIn(1000);
          
      } else {
        //alert("Connected");

        if(IsActiveApp == "") { 

          $('.SetAppData').show();
      
          //alert( IsActiveApp);
      
          $('.skip_to_home').hide();
      
        } else {

        $(".skip_to_home")
          .fadeIn(1000); }
      }
    }
    checkConnection();
 /*
    FCMPlugin.subscribeToTopic('HasanGadSupport');
    FCMPlugin.subscribeToTopic('HasanGadSupportMobile');
    FCMPlugin.onTokenRefresh(function(token) {
      localStorage.MobileToken = token;
    });
    FCMPlugin.getToken(function(token) {
      //alert(token);
      localStorage.MobileToken = token;

    });
    FCMPlugin.onNotification(function(data) {
      if (data.wasTapped) {

      } else {
      }
    });*/
  }
}
