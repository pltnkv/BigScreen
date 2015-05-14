import ITankConfig = require('screen/units/configs/ITankConfig')
import World = require('screen/World')
import Unit = require('screen/units/Unit')
import Crawler = require('screen/units/Crawler')
import IPoint = require('screen/commons/types/IPoint')

import b2Vec2 = Box2D.Common.Math.b2Vec2
import b2Body = Box2D.Dynamics.b2Body
import b2BodyDef = Box2D.Dynamics.b2BodyDef
import b2FixtureDef = Box2D.Dynamics.b2FixtureDef
import b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape

class Tank extends Unit {

    body:b2Body

    private config:ITankConfig
    private crawlerLeft:Crawler
    private crawlerRight:Crawler

    constructor(config:ITankConfig) {
        super()
        this.config = config
        this.createBody()
    }

    private createBody() {
        //initialize body
        var def = new b2BodyDef()
        def.type = b2Body.b2_dynamicBody
        //def.position = new b2Vec2(100 / World.PX_IN_M, 100 / World.PX_IN_M)//todo temp
        //def.angle = math.radians(pars.angle)//todo temp
        def.linearDamping = 2  //gradually reduces velocity, makes the car reduce speed slowly if neither accelerator nor brake is pressed
        //def.bullet = true //dedicates more time to collision detection - car travelling at high speeds at low framerates otherwise might teleport through obstacles.
        def.angularDamping = 3.3
        this.body = World.b2world.CreateBody(def)

        //initialize shape
        var fixdef = new b2FixtureDef()
        fixdef.density = 1.0
        fixdef.friction = 0.3 //friction when rubbing agaisnt other shapes
        fixdef.restitution = 0.4  //amount of force feedback when hitting something. >0 makes the car bounce off, it's fun!
        var shape = new b2PolygonShape()
        shape.SetAsBox(this.config.height / World.PX_IN_M / 2, this.config.width / World.PX_IN_M / 2)
        fixdef.shape = shape
        this.body.CreateFixture(fixdef)

        //create gun
        shape.SetAsOrientedBox(1 / 6, 1.3, new b2Vec2(0, -1.3))//todo в конфиг
        fixdef.shape = shape//необязательно
        this.body.CreateFixture(fixdef)

        //initialize Crawlers
        this.crawlerLeft = new Crawler(this)//todo
        this.crawlerRight = new Crawler(this)
    }

    private getLocalVelocity():[number, number] {
        /*
         returns car's velocity vector relative to the tank
         */
        var retv = this.body.GetLocalVector(this.body.GetLinearVelocityFromLocalPoint(new b2Vec2(0, 0)))
        return [retv.x, retv.y]
    }

    getSpeedKMH():number {
        //todo
        /*var velocity = this.body.GetLinearVelocity()
         var len = vectors.len([velocity.x, velocity.y])
         return (len / 1000) * 3600*/
        return 0
    }

    setSpeed(speed:number):void {
        /*
         //todo may be
         speed - speed in kilometers per hour
         */
        /* var velocity = this.body.GetLinearVelocity()
         velocity = vectors.unit([velocity.x, velocity.y])
         velocity = new box2d.b2Vec2(velocity[0] * ((speed * 1000.0) / 3600.0),
         velocity[1] * ((speed * 1000.0) / 3600.0))
         this.body.SetLinearVelocity(velocity)*/
    }


    //возможно pos должен содержать уже приведенные размеры
    setPositionAndAngle(pos:IPoint, angle:number) {
        this.body.SetPositionAndAngle(new b2Vec2(pos.x / World.PX_IN_M, pos.y / World.PX_IN_M), angle)
    }

    update() {
        this.crawlerLeft.killSidewaysVelocity()
        this.crawlerRight.killSidewaysVelocity()

        //this.updateCrawler(this.accelerateL, this.wheels[0])
        //this.updateCrawler(this.accelerateR, this.wheels[1])
    }

    private updateCrawler(accelerate, wheel):void {
        /*var base_vect
         if (accelerate == ACC_ACCELERATE) {
         base_vect = [0, -1]
         } else if (accelerate == ACC_BRAKE) {
         if (this.getLocalVelocity()[1] < 0) {
         //braking, but still moving forwards - increased force
         base_vect = [0, 1.3]
         } else {
         //going in reverse - less force
         base_vect = [0, 0.7]
         }
         } else {
         base_vect = [0, 0]
         }

         //multiply by engine power, which gives us a force vector relative to the wheel
         var fvect = [this.config.power * base_vect[0], this.config.power * base_vect[1]]

         //apply force to each wheel
         var position = wheel.body.GetWorldCenter()
         wheel.body.ApplyForce(wheel.body.GetWorldVector(new box2d.b2Vec2(fvect[0], fvect[1])), position)*/
    }
}


export = Tank