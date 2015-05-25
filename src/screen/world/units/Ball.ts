import World = require('screen/world/World')
import IPoint = require('screen/commons/types/IPoint')
import UnitName = require('screen/world/units/types/UnitName')
import Unit = require('screen/world/units/Unit')

import b2Vec2 = Box2D.Common.Math.b2Vec2
import b2Body = Box2D.Dynamics.b2Body
import b2BodyDef = Box2D.Dynamics.b2BodyDef
import b2FixtureDef = Box2D.Dynamics.b2FixtureDef
import b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
import b2CircleShape = Box2D.Collision.Shapes.b2CircleShape

var RADIUS_IN_PX = 20

class Ball extends Unit {

    constructor(position:IPoint) {
        super(UnitName.BALL)
        this.createBody(position)
    }

    private createBody(position:IPoint) {
        //initialize body
        var def = new b2BodyDef()
        def.userData = this
        def.linearDamping = 1
        def.angularDamping = 1
        def.type = b2Body.b2_dynamicBody
        def.position = new b2Vec2(position.x / World.PX_IN_M, position.y / World.PX_IN_M)
        this.body = World.b2world.CreateBody(def)

        //initialize shape
        var fixDef = new b2FixtureDef()
        fixDef.density = 1
        fixDef.shape = new b2CircleShape(RADIUS_IN_PX / World.PX_IN_M)

        this.body.CreateFixture(fixDef)
    }
}

export = Ball