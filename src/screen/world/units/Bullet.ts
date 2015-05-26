import World = require('screen/world/World')
import IRect = require('screen/commons/types/IRect')
import Unit = require('screen/world/units/Unit')
import UnitName = require('screen/world/units/types/UnitName')
import Tank = require('screen/world/units/Tank')

import b2Vec2 = Box2D.Common.Math.b2Vec2
import b2Body = Box2D.Dynamics.b2Body
import b2BodyDef = Box2D.Dynamics.b2BodyDef
import b2FixtureDef = Box2D.Dynamics.b2FixtureDef
import b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape

var BULLET_WIDTH = 5
var BULLET_HEIGHT = 10
var SPEED = 15

class Bullet extends Unit {

    parentTank:Tank
    damage = 40

    constructor(pos:b2Vec2, angle:number, direction:b2Vec2, parentTank:Tank) {
        super(UnitName.BULLET)
        this.parentTank = parentTank
        //initialize body
        var def = new b2BodyDef()
        def.userData = this
        def.type = b2Body.b2_dynamicBody
        def.bullet = true
        def.angle = angle
        def.position = pos
        this.body = World.b2world.CreateBody(def)

        //initialize shape
        var fixDef = new b2FixtureDef()
        fixDef.density = 4
        //fixDef.isSensor = true
        var shape = new b2PolygonShape()
        shape.SetAsBox(BULLET_WIDTH / World.PX_IN_M / 2, BULLET_HEIGHT / World.PX_IN_M / 2)
        fixDef.shape = shape

        this.body.CreateFixture(fixDef)

        direction.Multiply(SPEED)
        this.body.SetLinearVelocity(direction)
    }
}

export = Bullet