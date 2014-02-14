iris.ui(function(self) {
    
    var markers = [];
    var markerAux = false;//la ultima direccion buscada

    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.map.html);
        MAP.loadMap();        
        MAP.loadAllMarkers();        
        
        self.on("find-address", findAddress);//onblur campo address
        self.on("create-event", createEvent);//onclick crear evento
    }
    
    function findAddress(data){
        MAP.findAddress(data);
    }
    function createEvent(){
        MAP.findAddress('majadahonda');
    }
    
      
  
    


    self.findAddress = findAddress;
    self.createEvent = createEvent;

}, iris.path.ui.map.js);

