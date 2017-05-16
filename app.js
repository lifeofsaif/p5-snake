"use strict";
var express = require('express')
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var fs = require('fs')
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});
app.get('/api/trophies', function (req, res) {
    res.json(require('./trophy.json'))
})
app.post('/', function (req, res) {
    console.log(req.body)
    fs.writeFile("./trophy.json", JSON.stringify({
        score: "" + req.body.score + ""
        , message: req.body.message
    }), function (err) {
        if (err) throw err;
    })
    res.send()
})