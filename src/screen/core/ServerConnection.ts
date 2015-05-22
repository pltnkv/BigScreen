import ActionType = require('screen/commons/types/ActionType')
import Game = require('screen/Game')
import Player = require('screen/core/Player')

var socket:SocketIOClient.Socket
var players:Player[] = []

export function connect():void {
    socket = io('', {query: 'type=screen'})
    socket.on('start_game', function () {
        onStartGame()
    })

    socket.on('join', function (playerId) {
        console.log('join', playerId)
        onPlayerJoin(playerId)
    })
    socket.on('leave', function (playerId) {
        console.log('join', playerId)
        onPlayerLeave(playerId)
    })
    socket.on('cmd', function (data:{pid:number; id: ActionType; down:boolean}) {
        console.log('cmd', data)
        var player = getPlayerById(data.pid)
        if (player) {
            player.applyCommand(data)
        }
    })
    if(Game.LOCAL_DEBUG) {
        enableLocalDebug()
    }
}

function enableLocalDebug() {
    setTimeout(() => {
        onPlayerJoin(1)
        onPlayerJoin(2)
        onPlayerJoin(3)
        onPlayerJoin(4)
        onStartGame()
    })
}

function onPlayerJoin(id:number) {
    var player = new Player(id)
    players.push(player)
    console.log('Player connected:', id, 'count = ', players.length)
}

function onPlayerLeave(id:number) {
    var playerIndex = -1
    for (var i = 0; i < players.length; i++) {
        if (id == players[i].id) {
            playerIndex = i
            break
        }
    }
    if (playerIndex == -1) {
        console.log('Player disconnected, but not found', id)
    } else {
        players.splice(playerIndex, 1)
        console.log('Player disconnected:', id, 'count = ', players.length)
    }
}

function getPlayerById(id:number):Player {
    for (var i = 0; i < players.length; i++) {
        if (id == players[i].id) {
            return players[i]
        }
    }
    return null
}

function onStartGame() {
    Game.addPlayers(players)
    Game.start()
}