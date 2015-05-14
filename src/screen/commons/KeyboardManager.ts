import Keyboard = require('screen/commons/Keyboard')

window.document.addEventListener("keydown", onKeyDown)
window.document.addEventListener("keyup", onKeyUp)

var pressedKeys = []

function onKeyDown(e:KeyboardEvent) {
    pressedKeys[e.keyCode] = true
}

function onKeyUp(e:KeyboardEvent) {
    pressedKeys[e.keyCode] = false
}

export function isKeyDown(key:Keyboard):boolean {
    return !!pressedKeys[key]
}
