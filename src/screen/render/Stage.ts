import GameRender = require('screen/GameRender')
import LayerType = require('screen/render/LayerType')

var stage = new PIXI.Stage(0xEEEEEE)
var gameContainer:PIXI.DisplayObjectContainer
var layers = []

export function createAndPlay(gameRender:GameRender) {
    var renderer = new PIXI.CanvasRenderer(window.innerWidth - 5, window.innerHeight - 5)
    gameContainer = new PIXI.DisplayObjectContainer()
    stage.addChild(gameContainer)
    document.body.appendChild(renderer.view)

    createLayers()

    requestAnimFrame(animate)
    function animate() {
        requestAnimFrame(animate)
        gameRender.draw()
        renderer.render(stage)
    }
}

function createLayers() {
    layers[LayerType.LEVEL_BACKGROUND] = new PIXI.DisplayObjectContainer()
    layers[LayerType.BOTTOM_BLOCKS] = new PIXI.DisplayObjectContainer()
    layers[LayerType.BULLETS] = new PIXI.DisplayObjectContainer()
    layers[LayerType.TANKS] = new PIXI.DisplayObjectContainer()
    layers[LayerType.TOP_BLOCKS] = new PIXI.DisplayObjectContainer()

    layers.forEach(layer => gameContainer.addChild(layer))
}

export function getLayer(type:LayerType) {
    return layers[type]
}
