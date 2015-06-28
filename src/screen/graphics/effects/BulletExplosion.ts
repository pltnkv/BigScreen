import World = require('screen/world/World')
import IDrawable = require('screen/graphics/IDrawable')
import Tank = require('screen/world/units/Tank')
import Layers = require('screen/graphics/Layers')
import LayerName = require('screen/graphics/LayerName')
import DrawableObjects = require('screen/graphics/DrawableObjects')

import b2Vec2 = Box2D.Common.Math.b2Vec2

var FRAMES_COUNT = 11

class BulletExplosion implements IDrawable {

    private visual:PIXI.extras.MovieClip
    private destroyCounter:number

    constructor(posX:number, posY:number) {
        var explosionTextures = []

        for (var i = 0; i < FRAMES_COUNT; i++) {
            var texture = PIXI.Texture.fromFrame('bullet-exp' + (i + 1) + '.png')
            explosionTextures.push(texture)
        }


        this.visual = new PIXI.extras.MovieClip(explosionTextures)
        this.visual.anchor.x = 0.5
        this.visual.anchor.y = 0.5
        this.visual.loop = false

        this.visual.position.x = posX
        this.visual.position.y = posY
        this.visual.rotation = Math.PI * 2 * Math.random()

        this.visual.play()
        this.destroyCounter = 0

        DrawableObjects.addDrawableObject(this)
        Layers.getLayer(LayerName.EFFECTS).addChild(this.visual)
    }

    private destroy() {
        Layers.getLayer(LayerName.EFFECTS).removeChild(this.visual)
        DrawableObjects.removeDrawableObject(this)
        this.visual.destroy()
        this.visual = null
    }

    draw(dt:number):void {
        if (this.visual) {
            if (this.destroyCounter > FRAMES_COUNT) {
                this.destroy()
            }
            this.destroyCounter++
        }
    }
}

export = BulletExplosion