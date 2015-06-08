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
        debugCanvasElement = document.createElement("canvas");
        debugCanvasElement.setAttribute('width', window.innerWidth.toString())
        debugCanvasElement.setAttribute('height', window.innerHeight.toString())
        document.body.appendChild(debugCanvasElement);
    }
    return debugCanvasElement
}

export function addText():UIText {
    return new UIText()
}