import Tank = require('screen/units/Tank')
import World = require('screen/World')
import IRect = require('screen/commons/types/IRect')

import b2Vec2 = Box2D.Common.Math.b2Vec2
import b2Body = Box2D.Dynamics.b2Body
import b2BodyDef = Box2D.Dynamics.b2BodyDef
import b2FixtureDef = Box2D.Dynamics.b2FixtureDef
import b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
import b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef

class Crawler {

    //body:b2Body

    private tank:Tank
    config:IRect

    constructor(parentTank:Tank, config:IRect) {
        this.tank = parentTank
        this.config = config
        this.createShape()
    }

    createShape() {
        var fixDef = new b2FixtureDef()
        fixDef.density = 1.0
        fixDef.friction = 0.5
        fixDef.restitution = 0.4

        var shape = new b2PolygonShape()
        shape.SetAsOrientedBox(this.config.width / World.PX_IN_M / 2, this.config.height / World.PX_IN_M / 2, new b2Vec2(this.config.x / World.PX_IN_M, this.config.y / World.PX_IN_M), this.tank.body.GetAngle())
        fixDef.shape = shape
        this.tank.body.CreateFixture(fixDef)
    }
}

export = Crawler