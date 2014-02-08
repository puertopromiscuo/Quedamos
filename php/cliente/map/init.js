iris.path = {
    screen: {
        welcome: {html: "screen/welcome.html", js: "screen/welcome.js"}
    },
    ui: {
        todo: {html: "ui/todo.html", js: "ui/todo.js"}
    }
};

$(document).ready(function() {
    iris.baseUri('./');
    iris.welcome(iris.path.screen.welcome.js);
});