iris.ui(function(self) {
    eventsList = [];
    registerEventList = [];
    var event_x;
    var event_y;


    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.panel.html);        

        iris.on("render", function(map) {
            render(map);
            console.log("event render panel")
        });

        self.get("date")
                .val(PANEL.getToday())
                .attr("min", PANEL.getToday());
        
        
        /*SET ZOOM*/
        self.get("set-zoom").click(function(){
            MAP.setZoomMap(3);
        })
        //BUSCAR
        self.get("search").on("keyup", function(e) {
            if (e.keyCode === 13 && this.value.trim() !== "") {
                var name = this.value;
                var count = 0;
                //Vaciar panel de busqueda
                self.get("search-event-list").html("");
                EVENTS.getAllEvents(function(data) {                    
                    var myEvent;
                    data.forEach(function(event) {
                        if (event.event_title == name) {
                            myEvent = MYEVENT.createMyEvent(event.event_id, event.event_title, event.event_date, event.users)
                            self.get("search-event-list").append(myEvent);
                            count++;
                        }
                    })
                    if (!count) {
                        self.get("search-event-list").html("No se han encontrado coincidencias");
                        iris.notify("alertError", "No se han encontrado coincidencias");
                    }
                })
                this.value = "";
            }
        });
        
        
            //iris.notify("alertSuccess","Eventos filtrados por "+$(this)[0].id);
            self.get("filter-markers").click(function(){                
                var type = self.get("event-type").val();
                var date = self.get("event-date").val();
                MAP.filterMarkers(type,date); 
            })
    
        //on blur de la direccion crea un marcador en el mapa
        self.get("address").blur(function() {                        
            if (this.value == "") {
                iris.notify("alertError", "La direccion es obligatoria");
            }else{
                MAP.findAddress(this.value, function(coord) {
                    if (coord) {
                        event_x = coord.lat();
                        event_y = coord.lng();
                    } else {
                        iris.notify("alertError", "Direccion no encontrada");
                    }
                });
            }
        });

        //crea un evento y rederiza el mapa
        self.get("create-event").click(function() {
            var title  = self.get("title").val().trim();
            var description = self.get("description").val();
            var date = self.get("date").val();
            
            if (validatePanel(title,description,date)) {
                EVENTS.insertEvent(
                        title,
                        description,
                        date,
                        EVENTS.getUserId(),
                        event_x,
                        event_y,
                        self.get("type").val(),
                        function(data) {                            
                            renderMyEvents();                             
                            iris.notify("alertSuccess", "Evento creado");
                        }
                )
                self.get("title").val("");
                self.get("description").val("");
                self.get("address").val("");                
                self.get("date")
                        .val(PANEL.getToday())
                        .attr("min", PANEL.getToday());
            } 
                
            


        });

    };

    function renderMyEvents() {
        self.get("my-events-list").html("");
        PANEL.loadMyEvents(function(data) {
            var myEvent;
            data.forEach(function(event) {
                myEvent = MYEVENT.createMyEvent(event.event_id, event.event_title, event.event_date, event.users,true)
                self.get("my-events-list").append(myEvent);
            })
        })
    }


    function renderRegisterEvent() {
        self.get("register-events-list").html("");
        PANEL.loadMyRegisterEvents(function(data) {
            data.forEach(function(event) {
                myEvent = MYEVENT.createMyEvent(event.event_id, event.event_title, event.event_date, event.users)
                self.get("register-events-list").append(myEvent);
            })
        });
    }
    function rederHeadPanel() {
        EVENTS.countEvents(function(data) {
            self.get("count-my-events-come").text("+" + data.eventsCome);
            self.get("count-my-events").text("+" + data.eventsMy);
            self.get("menu-top").text(iris.userName);        
            self.get("user-image").attr("src","img/userImage/"+iris.userImage+".png"); 
        });                       
    }

    function render(map) {
        renderMyEvents();
        renderRegisterEvent();
        rederHeadPanel();
        if (map) {
            MAP.renderMap();
        }
    }


    function validatePanel(title,description,date) {
        var regExpTitle = /^[a-zA-Z0-9]{5,}$/;        
        var today = new Date();
        today.setHours(0,0,0,0);
        if(!title || !description || !date){
            iris.notify("alertError", "Todos los campos son obligatorios");
            return false;
        }        
        if (new Date(date) < today) {
              iris.notify("alertError", "Fecha invalida (min fecha de hoy)");
              return false;
        }        
        return true;
    }    
     
    
    


}, iris.path.ui.panel.js);



