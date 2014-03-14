(function() {
    var root = this;

    function createUserList(event_id, event_title, event_date, user_id_del) {
        li = $('<li data-userid ="' + user_id_del.user_id + '" ><br></li>');
        container = $('<div class="row"><br></div>');

        console.log(user_id_del);
        
        
        user = $('<div class="col-xs-5 col-xs-offset-1">' + user_id_del.user_name + '</div>');
        container.append(user);
        
        date = $('<div class="col-xs-2"><small>' + event_date.substr(5, 9).trim().replace("-", "/") + '</small></div>');
        container.append(date);
        
        del = $('<button id="del-user" class="glyphicon glyphicon-remove btn btn-danger btn-sm"> </button>');
        del.on("click", function() {
            EVENTS.deleteUserMyEvent(event_id,user_id_del.user_id, function(data) {
                
                $("#ok-form-profile").html("El usuario, " + user_id_del.user_name  + " ha sido eliminado del evento.");
                li.html("");
                iris.notify("render", true);
            });
        });

        divDel = $('<div class="col-xs-2"></div>').append(del);
        container.append(divDel);

        li.append(container);

        return li;
    }


    if (!root.USERLIST) {
        root.USERLIST = {};
    }

    root.USERLIST.createUserList = createUserList;


}).call(this);