import World = require('screen/World')
import IRect = require('screen/commons/types/IRect')

import b2Vec2 = Box2D.Common.Math.b2Vec2
import b2Body = Box2D.Dynamics.b2Body
import b2BodyDef = Box2D.Dynamics.b2BodyDef
import b2FixtureDef = Box2D.Dynamics.b2FixtureDef
import b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape

var BULLET_WIDTH = 5
var BULLET_HEIGHT = 10

class Bullet {

    body:b2Body

    constructor(pos:b2Vec2, direction:b2Vec2) {
        //initialize body
        var def = new b2BodyDef()
        def.type = b2Body.b2_dynamicBody
        def.bullet = true
        def.position = pos.Copy()//new b2Vec2(10, 10) //pos.Copy()
        this.body = World.b2world.CreateBody(def)

        //initialize shape
        var fixDef = new b2FixtureDef()
        fixDef.isSensor = true
        var shape = new b2PolygonShape()
        shape.SetAsBox(BULLET_WIDTH / World.PX_IN_M / 2, BULLET_HEIGHT / World.PX_IN_M / 2)
        fixDef.shape = shape

        this.body.CreateFixture(fixDef)
        this.body.SetLinearVelocity(new b2Vec2(10, 10))
    }
}

export = Bullet