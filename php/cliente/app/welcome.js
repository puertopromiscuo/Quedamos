iris.screen(function(self) {

    var settings = {
        type: 'POST',
        url: 'servidor/services/loginService/checkSession',
        dataType: 'json'
    };

    self.create = function() {
        self.tmpl(iris.path.screen.welcome.html);
        console.log("Welcome Screen Created");
        self.screens("screenMain", [["loged", iris.path.screen.loged.js], ["unloged", iris.path.screen.unloged.js]]);
    };
    self.awake = function() {
        console.log("Welcome Screen Awakened");
        check_session(function(data) {
            console.log(data);
            if (data.status === "ok") {
                iris.navigate("#/loged");
            } else {
                iris.navigate("#/unloged");
            }
        });
    };

    self.sleep = function() {
        console.log("Welcome Screen Asleep"); //Never called
    };

    self.destroy = function() {
        console.log("Welcome Screen Destroyed");//Never called
    };


    function check_session(callback) {
        iris.ajax(settings)
                .done(function(data)
                {
                    console.log(data.status);
                    callback(data);
                })
                .fail(function() {
                    console.log("Error 101", arguments);
                    callback(promise);
                })
    }
    ;

    /*
     $.ajax(
     settings
     ).done(function(data) {
     console.log(data.status);
     callback(data);
     }).fail(function() {
     console.log("Error 101", arguments);
     });
     
     */

}, iris.path.screen.welcome.js);
