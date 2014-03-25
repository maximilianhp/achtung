// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

// function getLocation(){

//       {
//           if (navigator.geolocation)

//           {

//               var options = {
//                   enableHighAccuracy: true,
//                   timeout: 5000,
//                   maximumAge: 0
//               };

//               navigator.geolocation.getCurrentPosition( success, error,options);
//           }

//           else

//           { x.innerHTML= "Geolocation is not supported by this browser."; }
//       }

//   }

//   function error(e) {

//   console.log("error code:" + e.code + 'message: ' + e.message );

//   }

//   function success(position) {
//      var  lat  = position.coords.latitude;
//      var  lng =  position.coords.longitude;

//      var  myLocation =   new google.maps.LatLng(lat, lng);


//      var mapOptions = {
//            center: new google.maps.LatLng(myLocation.lat(),myLocation.lng()),
//           zoom: 13,
//           mapTypeId: google.maps.MapTypeId.ROADMAP
//       };

//       var map = new google.maps.Map(document.getElementById("map"),
//               mapOptions);


//       var marker = new google.maps.Marker({
//           position: myLocation,
//           map: map,
//           title:"you are here"
//       });

//   }
//   google.maps.event.addDomListener(window, 'load', getLocation() );