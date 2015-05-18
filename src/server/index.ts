import path = require('path')
import PlayerClient = require('./PlayerClient')
import ScreenClient = require('./ScreenClient')
import stdinProcessor = require('./stdinProcessor')

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
    res.render('controls')
})

app.get('/controls', function (req, res) {
    res.render('controls')
})

app.get('/client', function (req, res) {
    res.render('client', {msg: 'val'})
})

app.get('/screen', function (req, res) {
    res.render('screen')
})

stdinProcessor.init()

//-------sockets
var screen
io.on('connection', function (socket:SocketIO.Socket) {
    var clientType = socket.handshake.query.type
    if (clientType == 'screen') {
        console.log('Screen connected')
        screen = new ScreenClient(socket)
    } else if (clientType == 'player') {
        if (!screen) {
            console.error('ERROR: Screen should be connected before player')
        } else {
            console.log('Player connected')
            new PlayerClient(screen, socket)
        }
    } else {
        console.error('ERROR: Unknown client type')
    }
    stdinProcessor.addSocket(socket)
})

//http.listen(3000, '192.168.0.104', function () {
http.listen(3000, function () {
    console.log('listening on *:3000')
})
