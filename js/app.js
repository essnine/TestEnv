// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

var watchID;
var opString;


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  DBMeter.start(function(dB){
    console.log(dB);
  }, function(e){
    console.log('code: ' + e.code + ', message: ' + e.message);
  });
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.fusion);
  }

  $scope.onTap = function(e) {
       if(ionic.Platform.isANDROID()) {
         $scope.barProgress = (e.target.max / e.target.offsetWidth)*(e.gesture.touches[0].screenX - e.target.offsetLeft);
       }
     };


function sense_Go()
{ 
    document.getElementById("output").value = "ON";

    DBMeter.start(function(dB){
    console.log(dB);
    opString = "volume: "+dB.toFixed(3);
    }, function(e){
    console.log('code: ' + e.code + ', message: ' + e.message);
    });


    function onSuccess(acceleration) {
        document.getElementById("output").value = opString + '\n' + ('Acceleration X: ' + acceleration.x.toFixed(3) + '\n' +
            'Acceleration Y: ' + acceleration.y.toFixed(3) + '\n' +
            'Acceleration Z: ' + acceleration.z.toFixed(3) + '\n' +
            'Timestamp: '      + acceleration.timestamp + '\n');
    }
  
      function onError() {
          alert('onError!');
      }
      var options = { frequency: 500 };  // Update every 3 seconds
    
      watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options)
}

function sense_Stop()
{
  cordova.plugins.backgroundMode.disable();
  navigator.accelerometer.clearWatch(watchID);
  document.getElementById("output").value = "Off";
  DBMeter.stop(function(){
    alert("DBMeter well stopped");
  }, function(e){
    console.log('code: ' + e.code + ', message: ' + e.message);  
    alert(e.message);
  });
}


