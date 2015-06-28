import World = require('screen/world/World')
import Bullet = require('screen/world/units/Bullet')
import IDrawable = require('screen/graphics/IDrawable')
import DrawableObjects = require('screen/graphics/DrawableObjects')
import Layers = require('screen/graphics/Layers')
import LayerName = require('screen/graphics/LayerName')
import BulletExplosion = require('screen/graphics/effects/BulletExplosion')

import b2Vec2 = Box2D.Common.Math.b2Vec2

class BulletVisual implements IDrawable {

    private bullet:Bullet
    private visual:PIXI.Sprite

    constructor(bullet:Bullet) {
        this.bullet = bullet
        this.createVisual()
        DrawableObjects.addDrawableObject(this)
    }

    private createVisual() {
        var texture = PIXI.Texture.fromImage('images/assets/bullet.png')
        this.visual = new PIXI.Sprite(texture)
        this.visual.anchor = new PIXI.Point(0.5, 0.55)

        Layers.getLayer(LayerName.BULLETS).addChild(this.visual)
    }

    runDestroyAnimation():void {
        Layers.getLayer(LayerName.BULLETS).removeChild(this.visual)

        var pos:b2Vec2 = this.bullet.body.GetWorldCenter()
        new BulletExplosion(pos.x * World.PX_IN_M, pos.y * World.PX_IN_M)
    }

    draw(dt:number):void {
        if (this.bullet.body) {
            var pos:b2Vec2 = this.bullet.body.GetWorldCenter()

            this.visual.position.x = pos.x * World.PX_IN_M
            this.visual.position.y = pos.y * World.PX_IN_M
            this.visual.rotation = this.bullet.body.GetAngle()
        }
    }
}

export = BulletVisual