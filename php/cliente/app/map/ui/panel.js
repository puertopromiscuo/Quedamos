iris.ui(function(self) {
    eventsList = [];
    registerEventList = [];
    var point_x;
    var point_y;


    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.panel.html);
        renderMyEvents();
        //renderRegisterEvent()



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
                    alert(coord);
                    if (coord) {
                        panelStatus(true);
                        point_x = coord.d;
                        point_y = coord.e;
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
                        point_x,
                        point_y,
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
        PANEL.loadMyEvents(function(data) {
            console.log("Cargando mis eventos");
            var myEvent;
            var users;
            data.forEach(function(event) {
                myEvent = MYEVENT.createMyEvent(event.event_id, event.event_title, event.event_date, event.users)
                self.get("my-events-list").append(myEvent);
            })
        })
    }


    function renderRegisterEvent() {
        self.destroyUIs('register-events-list');
        PANEL.loadRegisterEvent(function(eventos) {
            registerEventList = eventos.slice();
            var i;
            for (i = 0; i < registerEventList.length; i++) {
                self.ui("register-events-list", iris.path.ui.registerEventUI.js, {event: registerEventList[i]});
            }
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



