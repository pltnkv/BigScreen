import ScreenClient = require('./ScreenClient')

var sockets:SocketIO.Socket[] = []

export function init() {
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    var util = require('util')

    process.stdin.on('data', function (text) {
        if (text === 'quit\n') {
            process.exit()
        }
        if (text === 'd\n') {
            sockets.forEach(s => s.disconnect())
            console.log('All sockets disconnected:', sockets.length)
        }
    })
}

export function addSocket(value:SocketIO.Socket) {
    sockets.push(value)
}


