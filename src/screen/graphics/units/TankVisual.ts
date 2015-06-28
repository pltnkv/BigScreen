import World = require('screen/world/World')
import Tank = require('screen/world/units/Tank')
import IDrawable = require('screen/graphics/IDrawable')
import DrawableObjects = require('screen/graphics/DrawableObjects')
import Layers = require('screen/graphics/Layers')
import LayerName = require('screen/graphics/LayerName')
import TankExplosion = require('screen/graphics/effects/TankExplosion')

import b2Vec2 = Box2D.Common.Math.b2Vec2

class TankVisual implements IDrawable {

    private tank:Tank
    private visual:PIXI.Sprite

    constructor(tank:Tank) {
        this.tank = tank
        this.createVisual()
        DrawableObjects.addDrawableObject(this)
    }

    private createVisual() {
        var texture = PIXI.Texture.fromImage('images/assets/tank-blue.png')
        this.visual = new PIXI.Sprite(texture)
        this.visual.anchor = new PIXI.Point(0.5, 0.55)

        var shadowFilter = new PIXI.filters.DropShadowFilter()
        shadowFilter.distance = 3
        shadowFilter.alpha = 0.3
        this.visual.filters = [shadowFilter]

        Layers.getLayer(LayerName.TANKS).addChild(this.visual)
    }

    runDestroyAnimation():void {
        Layers.getLayer(LayerName.TANKS).removeChild(this.visual)

        var pos:b2Vec2 = this.tank.body.GetWorldCenter()
        new TankExplosion(pos.x * World.PX_IN_M, pos.y * World.PX_IN_M)
    }

    draw(dt:number):void {
        if (this.tank.body) {
            var pos:b2Vec2 = this.tank.body.GetWorldCenter()

            this.visual.position.x = pos.x * World.PX_IN_M
            this.visual.position.y = pos.y * World.PX_IN_M
            this.visual.rotation = this.tank.body.GetAngle()
        }
    }
}

export = TankVisual