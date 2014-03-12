iris.ui(function(self) {
    eventsList = [];
    registerEventList = [];
    var event_x;
    var event_y;


    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.panel.html);
        renderMyEvents();
        renderRegisterEvent()



        self.get("date")
                .val(PANEL.getToday())
                .attr("min", PANEL.getToday());


        /*self.on("del-my-event", function(data) {
         EVENTS.deleteEvent(data.event_id, function(data) {
         renderMyEvents();
         MAP.renderMap();
         
         })
         });
         
         //escucha evento de borrado desde registerEventList
         self.on("del-register-event", function(data) {
         EVENTS.deleteregisterEvent(data.event_id, function(data) {
         renderRegisterEvent();
         })
         });
         */
        //on blur de la direccion crea un marcador en el mapa
        self.get("address").blur(function() {
            if (this.value !== "") {
                MAP.findAddress(this.value, function(coord) {
                    if (coord) {
                        panelStatus(true);
                        event_x = coord.lat();
                        event_y = coord.lng();
                    } else {
                        panelStatus(false, "Direccion no encontrada");
                    }
                });
            }
        });

        //crea un evento y rederiza el mapa
        self.get("create-event").click(function() {
            if (validatePanel()) {
                EVENTS.insertEvent(
                        self.get("title").val(),
                        self.get("description").val(),
                        self.get("date").val(),
                        EVENTS.getUserId(),
                        event_x,
                        event_y,
                        function(data) {
                            renderMyEvents();
                            MAP.renderMap();
                        }
                )
                self.get("title").val("");
                self.get("description").val("");
                self.get("address").val("");
                self.get("date").val("");
            } else {
                panelStatus(false, "Campos Obligatorios");
            }

        });

    };

    function renderMyEvents() {
        self.get("my-events-list").html("");
        PANEL.loadEvents(function(data) {
            console.log("Cargando mis eventos");
            var myEvent;
            var users;
            data.forEach(function(event) {
                if (event.event_userid == EVENTS.getUserId()) {
                    myEvent = MYEVENT.createMyEvent(event.event_id, event.event_title, event.event_date, event.users)
                    self.get("my-events-list").append(myEvent);
                }
            })
        })
    }


    function renderRegisterEvent() {
        self.destroyUIs('register-events-list');
        PANEL.loadEvents(function(data) {
            data.forEach(function(event) {
                console.log(event.users);
                for (var i = 0; i < event.users.length; i++) {
                    if (event.users[i].user_id == EVENTS.getUserId()) {
                        myEvent = MYEVENT.createMyEvent(event.event_id, event.event_title, event.event_date, event.users)
                        self.get("register-events-list").append(myEvent);
                    }
                }
            })
        });
    }


    function validatePanel() {
        fields = [self.get("title"), self.get("description"), self.get("address"), self.get("date")]
        for (i = 0; i < fields.length; ++i) {
            if (!fields[i].val()) {
                return false;
            }
        }
        return true;
    }
    function panelStatus(status, message) {
        if (status) {
            self.get("error-panel").addClass("hidden");
        } else {
            self.get("error-panel").removeClass("hidden").text(message);
        }
    }

}, iris.path.ui.panel.js);



