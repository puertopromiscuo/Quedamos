(function() {
    var root = this;

    var image = new google.maps.MarkerImage(
            './img/event.png'
            , new google.maps.Size(40, 53)
            );


    function createMarker(event_id, event_title, event_description, event_date, event_userid, event_x, event_y, event_users, map) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(event_x, event_y),
            icon: image,
            animation: google.maps.Animation.DROP,
            map: map,
            event_id: event_id.toString(),
            event_title: event_title.toString(),
            event_description: event_description.toString(),
            event_date: event_date.toString(),
            event_userid: event_userid.toString(),
            event_users: EVENTS.arrayUsersToString(event_users)
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
            content: createInfo(marker)
        });
        
        infowindow.open(marker.get('map'), marker);
    }


    function createInfo(marker) {
        var contentString = '' +
                '<div class="contentInfo" id="contentWindow">' +
                '<div class="firstHeadingInfo">' + marker.event_title + '</div>' +
                '<div class="secondHeadingInfo">>' + marker.event_date + '</div>' +
                '<div class="bodyContentInfo">' +
                '<p>Descripcion:' + marker.event_description + '</p>' +
                '<p>Apuntados:' + marker.event_users + '</p>' +
                '<button class="glyphicon glyphicon-plus btn btn-sm btn-success" onclick="MAP.registerEvent(' + marker.event_id + ');"> Me apunto</button>' +
                '</div>';
        
        return contentString;

    }


    if (!root.MAP) {
        root.MAP = {};
    }

    root.MAP.createMarker = createMarker;
    root.MAP.animateMarker = animateMarker;

    

}).call(this);
