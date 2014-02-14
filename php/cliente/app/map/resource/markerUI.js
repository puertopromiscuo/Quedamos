(function() {
    var root = this;
    
    var image = new google.maps.MarkerImage(
            './img/event.png'
            , new google.maps.Size(40, 53)
            );
    
    function createMarker(event_id, event_title, event_description,event_date,user_id,point_id,point_x,point_y,map) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(point_x, point_y),           
            icon: image,            
            animation: google.maps.Animation.DROP,
            map:map,
            
            event_id:event_id.toString(),
            event_title:event_title.toString(),
            event_description:event_description.toString(),
            event_date:event_date.toString(),
            user_id:user_id.toString(),
            point_id:point_id.toString(),           
            
        });
        google.maps.event.addListener(marker, 'click', function() {            
            map.setCenter(marker.getPosition());            
            getInfoWindow(this);
        });       
       return marker;
    }

    //Animar marcador onclick
    function animateMarker(marker) {
        if (marker.getAnimation() != null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
    //Mostrar titulo
    function getInfoWindow(marker) {
        var infowindow = new google.maps.InfoWindow({
            content: '<div class="marker">' + marker.event_title + '</div>'
        });
        infowindow.open(marker.get('map'), marker);        
    }  

    if (!root.MAP) {
        root.MAP = {};
    }
    
    root.MAP.createMarker = createMarker;     
    root.MAP.animateMarker = animateMarker; 

}).call(this);
