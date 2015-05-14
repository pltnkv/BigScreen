var socket:SocketIOClient.Socket

export function init(readyCallback) {
    socket = io()

    socket.on('game_started', function (msg) {
        readyCallback()
    });
}

export function sendCommand(command:Object):void {
    console.log('command', command)
    socket.emit('cmd', command);
}