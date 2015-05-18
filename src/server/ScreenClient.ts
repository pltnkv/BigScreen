import PlayerClient = require('./PlayerClient')

var PLAYERS_LIMIT = 2

class ScreenClient {

    private socket
    private players:PlayerClient[] = []

    constructor(socket:SocketIO.Socket) {
        this.socket = socket
    }

    addPlayer(player:PlayerClient):void {
        this.players.push(player)
        this.socket.emit('join', player.id)
        //todo обработать граничные условия
        if (this.players.length == PLAYERS_LIMIT) {
            this.startGame()
        }
    }

    removePlayer(player:PlayerClient):void {
        this.players.splice(this.players.indexOf(player), 1)
        this.socket.emit('leave', player.id)
    }

    sendCommand(player:PlayerClient, cmd):void {
        console.log('sendCommand', cmd, player.id)
        cmd.pid = player.id
        this.socket.emit('cmd', cmd)
    }

    private startGame() {
        this.socket.emit('start_game')
        this.players.forEach(player => player.gameStarted())
    }

    disconnectAll() {
        console.log('disconnectAll')
        this.socket.disconnect()
        this.players.forEach(player => player.disconnect())
    }
}

export = ScreenClient