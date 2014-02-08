iris.ui(function(self) {
    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.todo.html);
        var todo = self.setting("todo");
        self.inflate(todo);
        
        /*notificar al padre del chequeo*/
        self.get("check").click(function() {
            var status = !todo.status
            self.notify("change-status", {todoId:todo.todoId,status:status});
        })
        
    }
    
}, iris.path.ui.todo.js);

