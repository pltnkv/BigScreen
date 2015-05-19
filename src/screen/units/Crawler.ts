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
        //this.createBody(config)
        this.createShape(config)
    }

    private createBody(config:IRect) {
        /*//initialize body
        var def = new b2BodyDef()
        def.type = b2Body.b2_dynamicBody
        def.position = this.tank.body.GetWorldPoint(new b2Vec2(config.x / World.PX_IN_M, config.y / World.PX_IN_M))
        def.angle = this.tank.body.GetAngle()
        this.body = World.b2world.CreateBody(def)

        //initialize shape
        var fixDef = new b2FixtureDef()
        fixDef.density = 1
        var shape = new b2PolygonShape()
        shape.SetAsBox(config.width / World.PX_IN_M / 2, config.height / World.PX_IN_M / 2)
        fixDef.shape = shape

        this.body.CreateFixture(fixDef)

        //create joint to connect wheel to body
        var jointDef = new b2PrismaticJointDef()
        jointDef.Initialize(this.tank.body, this.body, this.body.GetWorldCenter(), new b2Vec2(1, 0))
        jointDef.enableLimit = true
        jointDef.lowerTranslation = jointDef.upperTranslation = 0
        World.b2world.CreateJoint(jointDef)*/
    }


    createShape(config:IRect) {
        //initialize shape
        var fixDef = new b2FixtureDef()
        fixDef.density = 1.0
        fixDef.friction = 0.3 //friction when rubbing agaisnt other shapes
        fixDef.restitution = 0.4  //amount of force feedback when hitting something. >0 makes the car bounce off, it's fun!

        var shape = new b2PolygonShape()
        shape.SetAsOrientedBox(config.width / World.PX_IN_M / 2, config.height / World.PX_IN_M / 2, new b2Vec2(config.x / World.PX_IN_M, config.y / World.PX_IN_M), this.tank.body.GetAngle())
        fixDef.shape = shape
        this.tank.body.CreateFixture(fixDef)
    }

    killSidewaysVelocity():void {

    }
}

export = Crawler