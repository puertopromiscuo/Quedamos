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
            MAP.getInfoWindow(this, createInfo(marker));
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
                '<div style="overflow:hidden;">' +
                '<div class="list-group">' +
                '<a class="list-group-item active"><b>' + marker.event_title + '</b></a>' +
                '<a class="list-group-item"><b>FECHA:</b> ' + marker.event_date + '</a>' +
                '<a class="list-group-item"><b>DESCRIPCION:</b> ' + marker.event_description + '</a>' +
                '<a class="list-group-item"><b>APUNTADOS:</b> '+
        '<ul>';
        marker.event_users.forEach(function(user) {
            contentString += '<li>' + user.user_name + '</li>';
        })
        contentString += '</ul>'+
        '</a>' +
        '</div>';
                if (userIndicate) {
            contentString = contentString +
                    '<div id="come' + marker.event_id + '">' +
                    '<button class="glyphicon glyphicon-minus btn btn-sm btn-danger" onclick="MAP.deleteUserEvent(' + marker.event_id + ');"> Desapuntarte</button>' +
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
