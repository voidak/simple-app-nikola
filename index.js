var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.get("/", function(req,res){
    res.send("Welcome visitor hey");
});

app.listen(port);