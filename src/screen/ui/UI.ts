import UIText = require('screen/ui/UIText')

export function addLog(args) {

}

export function showBigMessage(args) {
    //по центру экрана "победил username"
}

var canvasElement:HTMLCanvasElement

export function getCanvas():HTMLCanvasElement {
    if (!canvasElement) {
        canvasElement = document.createElement("canvas");
        canvasElement.setAttribute('width', window.innerWidth.toString())
        canvasElement.setAttribute('height', window.innerHeight.toString())
        document.body.appendChild(canvasElement);
    }
    return canvasElement
}

export function addText():UIText {
    return new UIText()
}