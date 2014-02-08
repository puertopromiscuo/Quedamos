iris.path = {
    screen: {
        welcome: {html: "screen/welcome.html", js: "screen/welcome.js"}
    },
    ui: {
        todo: {html: "ui/map.html", js: "ui/map.js"}
    }
};

$(document).ready(function() {
    iris.baseUri('./cliente/map/');
    iris.welcome(iris.path.screen.welcome.js);
});