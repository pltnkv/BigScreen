import Game = require('screen/Game')
import Player = require('screen/core/Player')

var players:Player[] = []

export function connect():void {
    //todo
    setTimeout(() => {
        onPlayerJoin(1)
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

function onStartGame() {
    players.forEach(player => Game.addPlayer(player))
    Game.start()
}