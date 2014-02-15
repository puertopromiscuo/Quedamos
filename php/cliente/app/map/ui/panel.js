iris.ui(function(self) {
    var point_x;
    var point_y;
    eventsList = [];


    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.panel.html);
        renderMyEvents();
        
        


        //escucha evento de borrado desde myEventList
        self.on("del-proyect", function(data){            
            EVENTS.deleteEvent(data.event_id,function(data){
                renderMyEvents();
                MAP.renderMap();

            })
        });
        
        //on blur de la direccion crea un marcador en el mapa
        self.get("address").blur(function() {
            if (this.value !== "") {
                MAP.findAddress(this.value, function(coord) {
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
                        "1",
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

    function renderMyEvents(){
        self.destroyUIs('my-events-list');
        PANEL.loadMyEvents(function(eventos) {
            eventsList = eventos.slice();            
            var i;
            for (i = 0; i < eventsList.length; i++) {                
                self.ui("my-events-list", iris.path.ui.myEventUI.js, {event: eventsList[i]});                    
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



