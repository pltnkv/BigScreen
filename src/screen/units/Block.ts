import World = require('screen/World')
import IRect = require('screen/commons/types/IRect')
import Unit = require('screen/units/Unit')
import UnitName = require('screen/units/types/UnitName')

import b2Vec2 = Box2D.Common.Math.b2Vec2
import b2Body = Box2D.Dynamics.b2Body
import b2BodyDef = Box2D.Dynamics.b2BodyDef
import b2FixtureDef = Box2D.Dynamics.b2FixtureDef
import b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape

class Block extends Unit {

    constructor(config:IRect) {
        super(UnitName.WALL)
        this.createBody(config)
    }

    private createBody(config:IRect) {
        //initialize body
        var def = new b2BodyDef()
        def.userData = this
        def.type = b2Body.b2_staticBody
        def.position = new b2Vec2(config.x / World.PX_IN_M, config.y / World.PX_IN_M)
        this.body = World.b2world.CreateBody(def)

        //initialize shape
        var shape = new b2PolygonShape()
        shape.SetAsBox(config.width / World.PX_IN_M / 2, config.height/ World.PX_IN_M / 2)

        this.body.CreateFixture2(shape)
    }
}

export = Block