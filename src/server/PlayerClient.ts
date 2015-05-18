import ScreenClient = require('./ScreenClient')

var prevId = 0
function generateId():number {
    return ++prevId
}

class PlayerClient {

    id = generateId()

    private socket:SocketIO.Socket

    constructor(screen:ScreenClient, socket:SocketIO.Socket) {
        console.log(this.id)
        this.socket = socket
        screen.addPlayer(this)

        socket.on('cmd', msg => {
            console.log('Player cmd', msg)
            screen.sendCommand(this, msg)
        })

        socket.on('disconnect', () => {
            console.log('Player disconnected');
            screen.removePlayer(this)
        })
    }

    gameStarted():void {
        this.socket.emit('game_started')
    }

    disconnect():void {
        this.socket.disconnect(true)
    }
}

export = PlayerClient

