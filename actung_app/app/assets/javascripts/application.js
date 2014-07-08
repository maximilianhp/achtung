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

// $(window).resize(function(){

//     $('#homegif').css({
//         position:'absolute',
//         left: ($(window).width() - $('#homegif').outerWidth())/2,
//         top: ($(window).height() - $('#homegif').outerHeight())/2
//     });

// });

// // To initially run the function:
// $(window).resize();

$(function(){

  $('#achtungbuttonlink').click(function(ev){
    ev.preventDefault();
    getLocation();

  });


  if (navigator.geolocation)
    {
        var options = {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition( 
        function(position) {
          cur_loc.lat = position.coords.latitude;
          cur_loc.lng = position.coords.longitude;
          setupMap(cur_loc.lat, cur_loc.lng);
        },
        function(e) {
          console.log("error code:" + e.code + 'message: ' + e.message );
        },
        options
      );
    }






});

  var locs = [];

  var cur_loc = {
    lat: null,
    lng: null
  };

  function getLocation() {

    if (navigator.geolocation)
      {
          var options = {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0
          };
          navigator.geolocation.getCurrentPosition( success, error,options);
      }
      else
      { x.innerHTML= "Geolocation is not supported by this browser."; }
  }

  function error(e) {
    console.log("error code:" + e.code + 'message: ' + e.message );
  }

  // If current location request was successful, initializes location
  function success(position) {

    //reset_location(cur_loc);
    cur_loc.lat  = position.coords.latitude;
    cur_loc.lng =  position.coords.longitude;
    console.log(cur_loc);
    addLocationToDB(cur_loc);
    window.location.href='/';
  }

  function setupMap(lat, lng)
    {
      var  myLocation =   new google.maps.LatLng(lat, lng);
      cur_loc.lat = lat
      cur_loc.lng = lng

      var mapOptions = {
          center: new google.maps.LatLng(myLocation.lat(),myLocation.lng()),
          zoom: 13,
          streetViewControl: false,
          mapTypeControl: false,
          scaleControl: false,
          panControl: false,
          zoomControl: false,
          scaleControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#ede6ce" }
    ]
  },{
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#777367" }
    ]
  },{
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#ede6ce" }
    ]
  },{
    "elementType": "labels.icon",
    "stylers": [
      { "visibility": "on" }
    ]
  },{
    "featureType": "landscape",
    "stylers": [
      { "visibility": "simplified" },
      { "color": "#221f1f" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "elementType": "labels.text.stroke",
    "stylers": [
      { "color": "#808080" },
      { "visibility": "off" }
    ]
  },{
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#4e4c4c" }
    ]
  }
]
      
      };

      var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

      geocoder = new google.maps.Geocoder();

      addAllMarkers(map);
      
    }


    function addAllMarkers(map) {
      $.ajax({
            url: "/locations",
            type: "GET",
            dataType: "json",
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            success: function(data){
              console.log(data);

              for(var i=0; i<data.length; i++)
              {
                var obj = {
                    lat: data[i].lat,
                    lng: data[i].lng,
                };
                console.log('adding marker ' + data[i].id);
                marker = new google.maps.Marker({
                  position: new google.maps.LatLng(data[i].lat, data[i].lng),
                  map: map,
                  icon: 'http://imgh.us/marker_1.svg',
                  animation: google.maps.Animation.DROP
                });
              }
          }
        });
    }

    function addLocationToDB(cur_loc) {
      $.ajax({
            url: "/locations",
            type: "POST",
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            data: { lat: cur_loc.lat, lng: cur_loc.lng },
            success: function(data){ console.log(data); }
        });
    }

