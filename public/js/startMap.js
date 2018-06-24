
            
            //declaramos "map" en scope global
            let map; 
            let pos;
            let lat;
            let lng;

      function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: -26.185557, lng: -58.184026},
              zoom: 14,
              //mapTypeId: 'terrain'
            });
            var infoWindow = new google.maps.InfoWindow({map: map}); 
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent('ACÀ ESTAS ;-)');
                map.setCenter(pos);
                var cityCircle = new google.maps.Circle({
                  strokeColor: '#FF0000',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: '#FF0000',
                  fillOpacity: 0.35,
                  map: map,
                  center: pos,
                  radius: 700
                });

              }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
              });
            } else {
              // Browser doesn't support Geolocation
              handleLocationError(false, infoWindow, map.getCenter());
            }
            } 
            //---          
            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                                  'Error: The Geolocation service failed.' :
                                  'Error: Your browser doesn\'t support geolocation.');
            }      
        