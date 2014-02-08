iris.screen(function(self) {
    var todoList = [
        {text:"prueba1",status:true,todoId:0},
        {text:"prueba2",status:false,todoId:1},
        {text:"prueba3",status:true,todoId:2}
    ];
    var todoId = 3;
    self.create = function() {
        self.tmpl(iris.path.screen.welcome.html);
        render();
        
        /*añadir todo*/
        self.get("add").click(function() {
            var todo = {
                text: self.get("todoText").val(),
                status: false,
                todoId: todoId
            };
            todoList.push(todo);
            todoId++;
            render();
        })
        
        /*chequeado*/
        self.on("change-status", updateStatus);
    };
    
    
    updateStatus = function(todo) {
        todoList[todo.todoId].status=todo.status;        
        render();
    }
    
    render = function() {
        self.destroyUIs('todoList');
        var pendientes = 0;
        var i;
        for (i = 0; i < todoList.length; i++) {
            self.ui("todoList", iris.path.ui.todo.js, {todo: todoList[i]});
            pendientes += todoList[i].status ? 0 : 1;
        }
        self.inflate({count: pendientes})
    }

}, iris.path.screen.welcome.js);

