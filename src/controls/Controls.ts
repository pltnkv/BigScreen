import ActionType = require('controls/ActionType')
import Channel = require('controls/Channel')

export function attachEvents() {
    registerControl('f_l', ActionType.FORWARD_LEFT)
    registerControl('f_r', ActionType.FORWARD_RIGHT)
    registerControl('b_l', ActionType.BACKWARD_LEFT)
    registerControl('b_r', ActionType.BACKWARD_RIGHT)
    registerControl('fire', ActionType.FIRE)
}

function registerControl(elementId:string, actionType:ActionType) {
    var el = document.getElementById(elementId)

    var isTouchSupported = 'ontouchstart' in document

    if (isTouchSupported) {
        el.addEventListener("touchstart", onStart)
        el.addEventListener("touchend", onEnd)
        el.addEventListener("touchcancel", onEnd)
        el.addEventListener("touchleave", onEnd)
    } else {
        el.addEventListener("mousedown", onStart)
        el.addEventListener("mouseup", onEnd)
    }


    function onStart() {
        Channel.sendCommand({id: actionType, down: true})
    }

    function onEnd() {
        Channel.sendCommand({id: actionType, down: false})
    }
}

