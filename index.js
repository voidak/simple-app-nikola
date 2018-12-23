var express = require("express");
var path = require("path");
var bodyPareser = require("body-parser");
var cons = require("consolidate");
var dust = require("dustjs-helpers");
var pg = require("pg");
var app = express();
var port = process.env.PORT || 3000;

var connect = 'postgresql://wnpkrllbbgzzez:95f4417c07e6fdedf6a7cd02eeef4369c7fff40d784fa2730bb7164f97ab385d@ec2-107-20-237-78.compute-1.amazonaws.com:5432/dfqa8aicni4ffd';
app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyPareser.json());
app.use(bodyPareser.urlencoded({extended: false}));

app.get("/", function(req, res){
    //res.send("Welcome visitor hey I want more");
    pg.connect(connect, function(err, client, done){
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.queru('SELECT * FROM public.test_data', function(err, result){
            if (err){
                return console.error('error running qury', err);
            }
            //res.render({recipes: result.rows});
            res.send({recipes: result.rows});
            done();
        });
    });
});

app.listen(port);
