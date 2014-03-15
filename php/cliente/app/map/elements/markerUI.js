(function() {
    var root = this;

    function getIcon(type) {
        var image = new google.maps.MarkerImage(
                './img/' + type + '.png'
                , new google.maps.Size(40, 53)
                );
        return image;
    }


    function createMarker(event_id, event_title, event_description, event_date, event_userid, event_x, event_y, event_users, event_type, map) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(event_x, event_y),
            icon: getIcon(event_type),
            //animation: google.maps.Animation.DROP,
            map: map,
            event_id: event_id.toString(),
            event_title: event_title.toString(),
            event_description: event_description.toString(),
            event_date: event_date.toString(),
            event_userid: event_userid.toString(),
            event_users: event_users,
            event_type: event_type
        });

        google.maps.event.addListener(marker, 'click', function() {
            map.setCenter(marker.getPosition());            
            MAP.getInfoWindow(this,createInfo(marker));
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


    function createInfo(marker) {
        var userIndicate = false;
        for (var i in marker.event_users) {
            if (marker.event_users[i].user_id == EVENTS.getUserId()) {
                userIndicate = true;
            }
        }

        var contentString = '' +
                '<div class="contentInfo" id="contentWindow">' +
                '<div class="firstHeadingInfo">' + marker.event_title + '</div>' +
                '<div class="secondHeadingInfo">' + marker.event_date + '</div>' +
                '<div class="bodyContentInfo">' +
                '<p>Descripcion:' + marker.event_description + '</p>' +
                '<p>Apuntados:' + EVENTS.arrayUsersToString(marker.event_users) + '</p>';
        if (userIndicate) {
            contentString = contentString +
                    '<div id="come' + marker.event_id + '">' +
                    '<button class="glyphicon glyphicon-minus btn btn-sm btn-danger" onclick="MAP.deleteUserEvent(' + marker.event_id + ');"> Desapuntarte</button>' +
                    '</div>' +
                    '</div>';
        } else {
            contentString = contentString +
                    '<div id="come' + marker.event_id + '">' +
                    '<button class="glyphicon glyphicon-plus btn btn-sm btn-success" onclick="MAP.registerUserEvent(' + marker.event_id + ');"> Me apunto</button>' +
                    '</div>' +
                    '</div>';
        }

        return contentString;

    }


    if (!root.MAP) {
        root.MAP = {};
    }

    root.MAP.createMarker = createMarker;
    root.MAP.animateMarker = animateMarker;
    root.MAP.getIcon = getIcon;



}).call(this);
