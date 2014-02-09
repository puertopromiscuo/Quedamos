iris.ui(function(self) {   
    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.panel.html); 
        
        self.get("address").blur(function(){            
            self.notify("find-address", {address:this.value});            
        })        
        self.get("create-event").click(function(){            
            self.notify("create-event", {
                title:self.get("title").val(),
                address:self.get("address").val(),
                description:self.get("description").val(),
                date:self.get("date").val()
            });                        
        })
    }    
}, iris.path.ui.panel.js);



