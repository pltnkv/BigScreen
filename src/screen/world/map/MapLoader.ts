import Layers = require('screen/graphics/Layers')
import LayerName = require('screen/graphics/LayerName')

import b2World = Box2D.Dynamics.b2World

export function load() {
    var texture = PIXI.Texture.fromImage('images/asserts/map.png')

    // create a new Sprite using the texture
    var bg = new PIXI.Sprite(texture)//todo создать отдельный объект Background

    // move the sprite to the center of the screen
    bg.position.x = 0
    bg.position.y = 0

    Layers.getLayer(LayerName.BACKGROUND).addChild(bg)
}