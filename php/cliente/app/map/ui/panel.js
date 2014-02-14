iris.ui(function(self) {
    var point_x;
    var point_y;

    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.panel.html);


        self.get("address").blur(function() {
            if (this.value != "") {
                MAP.findAddress(this.value, function(coord) {
                    if(coord){
                        panelStatus(true);
                        point_x = coord.d;
                        point_y = coord.e;
                    }else{
                       panelStatus(false,"Direccion no encontrada")
                    }
                })
            }
        });

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
                            //console.log(data);
                            MAP.renderMap();                            
                        }
                )                
                self.get("title").val("");
                self.get("description").val("");
                self.get("address").val("");
                self.get("date").val("");                                
            }else{
                panelStatus(false,"Campos Obligatorios");
            }

        });

    };
    function validatePanel() {
        fields = [self.get("title"), self.get("description"), self.get("address"), self.get("date")]
        for (i = 0; i < fields.length; ++i) {
            if (!fields[i].val()) {
                return false;
            }
        }
        return true;
    }
    function panelStatus(status,message){
        if(status){
            self.get("error-panel").addClass("hidden");
        }else{
            self.get("error-panel").removeClass("hidden").text(message);
        }
    }
}, iris.path.ui.panel.js);



