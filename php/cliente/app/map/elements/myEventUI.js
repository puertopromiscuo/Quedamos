(function() {
    var root = this;

    function createMyEvent(event_id, event_title, event_date, event_users, admin) {
        li = $('<li data-eventid ="' + event_id + '" ><br></li>');
        container = $('<div data-eventid ="' + event_id + '" class="row"><br></div>');



        title = $('<button class="col-xs-4"><span>' + event_title + '</span></button>');
        title.on("click", function() {    
            MAP.centerMap(event_id);            
        })
        container.append(title);
        date = $('<div class="col-xs-2"><small>' + event_date.substr(5, 9).trim().replace("-", "/") + '</small></div>');
        container.append(date);

        users = $('<div class="col-xs-2"><span class="badge">' + event_users.length + '</span></div>');
        container.append(users);

        if (admin) {
            conf = $('<button id="conf-my-event" class="glyphicon glyphicon-edit btn btn-warning btn-sm" role="menuitem" tabindex="-1" event-id="' + $(this).parent().parent().data("eventid") + '" data-toggle="modal" data-target="#customEvent"></button>');
            conf.on("click", function() {
                $("#event-id-oculto").val($(this).parent().parent().data("eventid"));
                eventID = $(this).parent().parent().data("eventid");
                $("#user-list").html("");
                $("#date-event").attr("placeholder", event_date);
                $("#name-event").attr("placeholder", event_title);
                if (event_users.length) {
                    for (var i = 0; i < event_users.length; i++) {
                        var userLi = USERLIST.createUserList(eventID, event_title, event_date, event_users[i]);
                        $("#user-list").append(userLi);
                    }
                } else {
                    $("#user-list").append("<p>No hay usuarios apuntados a este evento</p>");
                }
            })
            divConf = $('<div class="col-xs-2"></div>').append(conf);
            container.append(divConf);

            del = $('<button id="del-my-event" class="glyphicon glyphicon-remove btn btn-danger btn-sm"> </button>');
            del.on("click", function() {
                EVENTS.deleteEvent($(this).parent().parent().data("eventid"), function(data) {
                    iris.notify("render", true);
                    iris.notify("alertSuccess", "Evento borrado");
                    $("#user-list").append("<p>No hay usuarios apuntados a este evento</p>");
                });
            })

            divDel = $('<div class="col-xs-2"></div>').append(del);
            container.append(divDel);
        } else {
            del = $('<button id="del-my-event" class="glyphicon glyphicon-remove btn btn-danger btn-sm"> </button>');
            del.on("click", function() {
                EVENTS.deleteUserEvent($(this).parent().parent().data("eventid"), function(data) {
                    iris.notify("render", true);
                    iris.notify("alertSuccess", "Te has desapuntado del evento");
                });
            })

            divDel = $('<div class="col-xs-2"></div>').append(del);
            container.append(divDel);
        }
        li.append(container);

        return li;
    }


    if (!root.MYEVENT) {
        root.MYEVENT = {};
    }

    root.MYEVENT.createMyEvent = createMyEvent;


}).call(this);
