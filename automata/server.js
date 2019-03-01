var express = require("express");
var app = express();
var path = require("path");

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public'));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/views/index.html"));
});

app.use(function(req, res) {
    res.status(404).send("Page Not Found.");
});

app.listen(HTTP_PORT, onHttpStart);