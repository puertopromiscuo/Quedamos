(function() {
    var root = this;
    
    var image = new google.maps.MarkerImage(
            './img/event.png'
            , new google.maps.Size(40, 53)
            );
    
    function addMarker(point_id, point_x, point_y,map) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(point_x, point_y),
            map: map,
            icon: image,
            title: 'soy ' + point_id,
            animation: google.maps.Animation.DROP,
            marker_id: point_id
        });
        google.maps.event.addListener(marker, 'click', function() {
            map.setZoom(15);
            map.setCenter(marker.getPosition());
            animaMarker(this);
            getInfoWindow(this);
        });
       return marker;
    }

    //Animar marcador onclick
    function animaMarker(marker) {
        if (marker.getAnimation() != null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
    //Mostrar titulo
    function getInfoWindow(marker) {
        var infowindow = new google.maps.InfoWindow({
            content: '<div class="marker">' + marker.title + '</div>'
        });
        infowindow.open(marker.get('map'), marker);        
    }  

    if (!root.MAP_APP) {
        root.MAP_APP = {};
    }
    
    root.MAP_APP.addMarker = addMarker;
    root.MAP_APP.animaMarker = animaMarker;
    root.MAP_APP.getInfoWindow = getInfoWindow;    

}).call(this);
/*
 * function getPointDOM(point_id) {
 MAP_APP.getPoint(point_id, function(data) {
 console.log(data);
 });
 }
 */