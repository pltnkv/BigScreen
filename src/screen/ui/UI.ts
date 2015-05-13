export function addLog(args) {

}

export function showBigMessage(args) {
    //по центру экрана "победил username"
}

var canvasElement:HTMLCanvasElement

export function getCanvas():HTMLCanvasElement {
    if(!canvasElement) {
        canvasElement = document.createElement("canvas");
        document.body.appendChild(canvasElement);
    }
    return canvasElement
}