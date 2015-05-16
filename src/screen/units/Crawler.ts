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

    body:b2Body

    private tank:Tank

    constructor(parentTank:Tank, config:IRect) {
        this.tank = parentTank
        this.createBody(config)
    }

    private createBody(config:IRect) {
        //initialize body
        var def = new b2BodyDef()
        def.type = b2Body.b2_dynamicBody
        def.position = this.tank.body.GetWorldPoint(new b2Vec2(config.x / World.PX_IN_M, config.y / World.PX_IN_M))
        def.angle = this.tank.body.GetAngle()
        this.body = World.b2world.CreateBody(def)

        //initialize shape
        var fixdef = new b2FixtureDef()
        fixdef.density = 1
        var shape = new b2PolygonShape()
        shape.SetAsBox(config.width / World.PX_IN_M / 2, config.height / World.PX_IN_M / 2)
        fixdef.shape = shape

        this.body.CreateFixture(fixdef)

        //create joint to connect wheel to body
        var jointDef = new b2PrismaticJointDef()
        jointDef.Initialize(this.tank.body, this.body, this.body.GetWorldCenter(), new b2Vec2(1, 0))
        jointDef.enableLimit = true
        jointDef.lowerTranslation = jointDef.upperTranslation = 0
        World.b2world.CreateJoint(jointDef)
    }

    killSidewaysVelocity():void {

    }
}

export = Crawler