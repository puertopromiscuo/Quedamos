(function() {
    var root = this;
    
    function createMyEvent(event_title,event_date,event_id){        
        container = $('<div data-eventid ="'+event_id+'">');
            del = $('<button id="del-my-event"  class="glyphicon glyphicon-remove btn btn-danger"> </button>');
            del.on("click",function(){
                console.log($(this).parent().parent().data("eventid"));
            })
            divDel = $(' <div class="col-sm-2">').append(del);
            container.append(divDel);
            
            title = $('<div class="col-sm-10"><span>'+event_title+'</span></div>');              
            container.append(title);
            
            date = $('<div class="col-sm-10"><span>'+event_date+'</span></div>');
            container.append(date);           
            
            
        return container;
    }   
    

    if (!root.MYEVENT) {
        root.MYEVENT = {};
    }

    root.MYEVENT.createMyEvent = createMyEvent;    
    

}).call(this);
