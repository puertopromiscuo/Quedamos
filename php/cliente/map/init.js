iris.path = {
    screen: {
        welcome: {html: "screen/welcome.html", js: "screen/welcome.js"}
    },
    ui: {
        map: {html: "ui/map.html", js: "ui/map.js"},
        panel: {html: "ui/panel.html", js: "ui/panel.js"}
    }
};

$(document).ready(function() {
    iris.baseUri('./cliente/map/');
    iris.welcome(iris.path.screen.welcome.js);
});