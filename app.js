"use strict";
var express = require('express')
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var fs = require('fs')
var mongoose = require('mongoose')
var privateVariables = require('./privateVariables.json')
var uri = privateVariables.mongoUri
mongoose.Promise = global.Promise
mongoose.connect(uri);
var db = mongoose.connection;
var scoreSchema = mongoose.Schema({
    score: String
    , message: String
});
var Score = mongoose.model('songs', scoreSchema);
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});
app.get('/api/trophies', function (req, res) {
    Score.find(function (err, scores) {
        if (err) return console.error(err);
        res.json({
            score: scores[0]["score"]
            , message: scores[0]["message"]
        })
    })
})
app.post('/', function (req, res) {
        var data = {
            score: "" + req.body.score + ""
            , message: req.body.message
        }
        Score.findById(privateVariables.scoreId, function (err, todo) {
            // Handle any possible database errors
            if (err) {
                res.status(500).send(err);
            }
            else {
                todo["message"] = data.message
                todo["score"] = data.score
                todo.save(function (err, todo) {
                    if (err) {
                        res.status(500).send(err)
                    }
                });
            }
        });
        res.send()
    })

app.post('/reset', function(req, res){
    resetScore();
    res.send()
})


function resetScore(){

    Score.findById(privateVariables.scoreId, function (err, todo) {
        // Handle any possible database errors
        if (err) {; //res.status(500).send(err);
        } else {
            todo["message"] = "reset"
            todo["score"] = 0
            todo.save(function (err, todo) {
                if (err) {; //res.status(500).send(err)
                }
            });
        }
    });
    
    
}