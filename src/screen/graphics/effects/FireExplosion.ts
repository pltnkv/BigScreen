import World = require('screen/world/World')
import IDrawable = require('screen/graphics/IDrawable')
import Tank = require('screen/world/units/Tank')
import Layers = require('screen/graphics/Layers')
import LayerName = require('screen/graphics/LayerName')
import DrawableObjects = require('screen/graphics/DrawableObjects')

import b2Vec2 = Box2D.Common.Math.b2Vec2

var FRAMES_COUNT = 15

class FireExplosion implements IDrawable {

    private tank:Tank
    private visual:PIXI.extras.MovieClip
    private destroyCounter:number

    constructor(tank:Tank) {
        this.tank = tank
    }

    private createVisual() {
        var explosionTextures = []

        for (var i = 0; i < FRAMES_COUNT; i++) {
            var texture = PIXI.Texture.fromFrame('explode' + (i + 1) + '.png')
            explosionTextures.push(texture)
        }

        this.visual = new PIXI.extras.MovieClip(explosionTextures)
        this.visual.anchor.x = 0.43
        this.visual.anchor.y = 1
        this.visual.loop = false

        DrawableObjects.addDrawableObject(this)
        Layers.getLayer(LayerName.EFFECTS).addChild(this.visual)
    }

    play():void {
        this.createVisual()
        this.visual.play()
        this.destroyCounter = 0
    }

    private destroy() {
        Layers.getLayer(LayerName.EFFECTS).removeChild(this.visual)
        DrawableObjects.removeDrawableObject(this)
        this.visual.destroy()
        this.visual = null
    }

    draw(dt:number):void {
        if (this.visual) {
            if (this.tank.body) {
                var pos:b2Vec2 = this.tank.getStartBulletPosition()

                this.visual.position.x = pos.x * World.PX_IN_M
                this.visual.position.y = pos.y * World.PX_IN_M
                this.visual.rotation = this.tank.body.GetAngle()
            }

            if(this.destroyCounter > FRAMES_COUNT) {
                this.destroy()
            }
            this.destroyCounter++
        }
    }
}

export = FireExplosion