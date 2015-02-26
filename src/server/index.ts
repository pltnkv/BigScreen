import refs = require('refs')

import path = require('path')

var express = require('express')
var app = express()
var bodyParser:any = require('body-parser')
var swig = require('swig')
var http = require('http').Server(app)
var io = require('socket.io')(http)

//--------express

var staticViewsPath = '/../static/views'

app.engine('html', swig.renderFile)

app.set('view engine', 'html')
app.set('views', __dirname + '/../../static/views')
app.set('io', io)

app.use(express.static(__dirname + '/../../static'))
app.use(bodyParser.text({type: 'text/html'}))
/*
 app.get('/', function (req, res) {
 console.log('get')
 res.sendFile(path.resolve(__dirname + staticViewsPath + '/index.html'))
 })*/

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/client', function (req, res) {
    res.render('client', {msg: 'val'});
});


//-------sockets
io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg)
    })
})

http.listen(3000, function () {
    console.log('listening on *:3000')
})
