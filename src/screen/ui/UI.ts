import UIText = require('screen/ui/UIText')

export function addLog(args) {

}

export function showBigMessage(args) {
    //по центру экрана "победил username"
}

var debugCanvasElement:HTMLCanvasElement
var mainCanvasElement:HTMLCanvasElement

export function getDebugCanvas():HTMLCanvasElement {
    if (!debugCanvasElement) {
        debugCanvasElement = document.createElement("canvas")
        debugCanvasElement.setAttribute('class', 'debugLayer')
        debugCanvasElement.setAttribute('width', window.innerWidth.toString())
        debugCanvasElement.setAttribute('height', window.innerHeight.toString())
        document.body.appendChild(debugCanvasElement)
    }
    return debugCanvasElement
}

export function getMainCanvas():HTMLCanvasElement {
    if (!mainCanvasElement) {
        mainCanvasElement = document.createElement("canvas")
        mainCanvasElement.setAttribute('class', 'mainLayer')
        mainCanvasElement.setAttribute('width', window.innerWidth.toString())
        mainCanvasElement.setAttribute('height', window.innerHeight.toString())
        document.body.appendChild(mainCanvasElement)
    }
    return mainCanvasElement
}


export function addText():UIText {
    return new UIText()
}