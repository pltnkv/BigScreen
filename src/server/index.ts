import path = require('path')

var express = require('express')
var app = express()
var bodyParser:any = require('body-parser')
var swig = require('swig')
var http = require('http').Server(app)
var io = require('socket.io')(http)

//--------express

// development only
if (app.get('env') == 'development') {
    console.log('development')
}

// production only
if (app.get('env') == 'production') {
    console.log('production')
}

app.set('view cache', false);
swig.setDefaults({cache: false});

app.engine('html', swig.renderFile)

app.set('view engine', 'html')
app.set('views', __dirname + '/../static/views')
app.set('io', io)

app.use(express.static(__dirname + '/../static'))
app.use(bodyParser.text({type: 'text/html'}))
/*
 app.get('/', function (req, res) {
 console.log('get')
 res.sendFile(path.resolve(__dirname + staticViewsPath + '/index.html'))
 })*/

app.get('/', function (req, res) {
    res.render('index')
})

app.get('/client', function (req, res) {
    res.render('client', {msg: 'val'})
})

app.get('/controls', function (req, res) {
    res.render('controls')
})

app.get('/screen', function (req, res) {
    res.render('screen')
})


//-------sockets
io.on('connection', function (socket:SocketIO.Socket) {
    console.log('Player connected')
    socket.emit('game_started')

    socket.on('cmd', function (msg) {
//        io.emit('chat message', msg)
        console.log('cmd', msg)
    })
})

http.listen(3000, function () {
    console.log('listening on *:3000')
})
