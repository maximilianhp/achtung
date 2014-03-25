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

$(function(){

  var cur_loc = {
    lat: null,
    lng: null
  };

  $('#achtungbutton').click(function(ev){
    ev.preventDefault();
    getLocation();
  });

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
    setupMap(cur_loc.lat, cur_loc.lng);
    addLocationToDB(cur_loc);
  }

  function setupMap(lat, lng)
    {
      var  myLocation =   new google.maps.LatLng(lat, lng);
      cur_loc.lat = lat
      cur_loc.lng = lng

      var mapOptions = {
          center: new google.maps.LatLng(myLocation.lat(),myLocation.lng()),
          zoom: 15,
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

      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

      geocoder = new google.maps.Geocoder();

      addCurrentLocMarker(map);
      
    }

    function addCurrentLocMarker(map)
    {
      marker = new google.maps.Marker({
          position: new google.maps.LatLng(cur_loc.lat, cur_loc.lng),
          map: map,
          icon: 'http://imgh.us/marker_1.svg',
          animation: google.maps.Animation.DROP
        });

      //addMarkerListeners(marker);
      
    }

    // function addLocationToDB(loc) {
    //   $.ajax({
    //         url: "/locations",
    //         type: "POST",
    //         beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    //         data: { lat: loc.lat, lng: loc.lng },
    //         success: function(data){
    //           //console.log(data);
    //           var obj = {
    //               lat: data.lat,
    //               lng: data.lng,
    //           };
    //           locs.push(obj);
    //           $('#content_box').addClass("hidden");
    //           reset_fields();
    //           setupMap(data.lat, data.lng);
    //           console.log('addLocationToDB completed');
    //         }
    //     });
    // }

});

// function lookup_location() {
//   geoPosition.getCurrentPosition(show_map, show_map_error);
// }

// function show_map(loc) {
//   $("#map-canvas").css({'width':'100%','height':'350px'});
//   var map = new GMap2(document.getElementById("map-canvas"));
//   var center = new GLatLng(loc.coords.latitude, loc.coords.longitude);
//   map.setCenter(center, 14);
//   map.addControl(new GSmallMapControl());
//   map.addControl(new GMapTypeControl());
//   map.addOverlay(new GMarker(center, {draggable: false, title: "You are here (more or less)"}));
// }

// Google Maps Styling

