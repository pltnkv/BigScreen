import World = require('screen/world/World')
import Bonus = require('screen/world/units/Bonus')
import BonusType = require('screen/world/units/types/BonusType')
import IDrawable = require('screen/graphics/IDrawable')
import DrawableObjects = require('screen/graphics/DrawableObjects')
import Layers = require('screen/graphics/Layers')
import LayerName = require('screen/graphics/LayerName')
import BulletExplosion = require('screen/graphics/effects/BulletExplosion')

import b2Vec2 = Box2D.Common.Math.b2Vec2

var textureByBonusType:string[] = []
textureByBonusType[BonusType.ARMOR] = 'bonus-armor.png'
textureByBonusType[BonusType.DAMAGE] = 'bonus-damage.png'
textureByBonusType[BonusType.FIRERATE] = 'bonus-firerate.png'
textureByBonusType[BonusType.HEALTH] = 'bonus-health.png'
textureByBonusType[BonusType.SPEED] = 'bonus-speed.png'

var MAX_SCALE = 1.05
var MIN_SCALE = 0.95
var SCALE_DELTA = 0.004

class BulletVisual implements IDrawable {

    private bonus:Bonus
    private visual:PIXI.Sprite
    private currentScale = 1
    private currentScaleDelta = SCALE_DELTA

    constructor(bonus:Bonus) {
        this.bonus = bonus
        this.createVisual()
        DrawableObjects.addDrawableObject(this)
    }

    private createVisual() {
        var texture = PIXI.Texture.fromImage('images/assets/' + textureByBonusType[this.bonus.bonusType])
        this.visual = new PIXI.Sprite(texture)
        this.visual.anchor = new PIXI.Point(0.5, 0.5)

        var pos:b2Vec2 = this.bonus.body.GetWorldCenter()
        this.visual.position.x = pos.x * World.PX_IN_M
        this.visual.position.y = pos.y * World.PX_IN_M

        var shadowFilter = new PIXI.filters.DropShadowFilter()
        shadowFilter.distance = 2
        shadowFilter.alpha = 0.2
        this.visual.filters = [shadowFilter]

        Layers.getLayer(LayerName.BONUSES).addChild(this.visual)
    }

    runDestroyAnimation():void {
        Layers.getLayer(LayerName.BONUSES).removeChild(this.visual)
    }

    draw(dt:number):void {
        this.visual.scale = new PIXI.Point(this.currentScale, this.currentScale)
        this.currentScale += this.currentScaleDelta
        if (this.currentScale >= MAX_SCALE || this.currentScale <= MIN_SCALE) {
            this.currentScaleDelta = -this.currentScaleDelta
        }
    }
}

export = BulletVisual