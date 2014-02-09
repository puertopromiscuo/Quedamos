iris.ui(function(self) {   
    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.panel.html); 
        
        self.get("address").blur(function(){            
            self.notify("find-address", {address:this.value});            
        })
    }    
}, iris.path.ui.panel.js);



