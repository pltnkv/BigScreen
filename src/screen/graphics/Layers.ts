import LayerName = require('screen/graphics/LayerName')

var layers:PIXI.Container[] = []

export function init(stage:PIXI.Container) {
    function addLayer(name:LayerName) {
        layers[name] = new PIXI.Container()
        stage.addChild(layers[name])
    }

    addLayer(LayerName.BACKGROUND)
    addLayer(LayerName.BONUSES)
    addLayer(LayerName.BULLETS)
    addLayer(LayerName.TANKS)
    addLayer(LayerName.OBSTACLES)
    addLayer(LayerName.EFFECTS)
}


export function getLayer(name:LayerName):PIXI.Container {
    return layers[name]
}
