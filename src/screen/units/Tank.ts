import Player = require('screen/core/Player')
import ITankConfig = require('screen/units/configs/ITankConfig')
import World = require('screen/World')
import Unit = require('screen/units/Unit')
import Crawler = require('screen/units/Crawler')
import IPoint = require('screen/commons/types/IPoint')
import IRect = require('screen/commons/types/IRect')
import AccelerateType = require('screen/commons/types/AccelerateType')

import b2Vec2 = Box2D.Common.Math.b2Vec2
import b2Body = Box2D.Dynamics.b2Body
import b2BodyDef = Box2D.Dynamics.b2BodyDef
import b2FixtureDef = Box2D.Dynamics.b2FixtureDef
import b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape

class Tank extends Unit {

    body:b2Body
    player:Player

    leftCrawlerAccelerate = AccelerateType.NONE
    rightCrawlerAccelerate = AccelerateType.NONE
    fire = false

    private config:ITankConfig
    private leftCrawler:Crawler
    private rightCrawler:Crawler

    constructor(config:ITankConfig) {
        super()
        this.config = config
        this.createBody()
    }

    private createBody() {
        //initialize body
        var def = new b2BodyDef()
        def.type = b2Body.b2_dynamicBody
        //def.position = new b2Vec2(200 / World.PX_IN_M, 200 / World.PX_IN_M)//todo temp
        //def.angle = math.radians(pars.angle)//todo temp
        def.linearDamping = 5  //gradually reduces velocity, makes the car reduce speed slowly if neither accelerator nor brake is pressed
        //def.bullet = true //dedicates more time to collision detection - car travelling at high speeds at low framerates otherwise might teleport through obstacles.
        def.angularDamping = 8
        this.body = World.b2world.CreateBody(def)

        //initialize shape
        var fixDef = new b2FixtureDef()
        fixDef.density = 1.0
        fixDef.friction = 0.3 //friction when rubbing agaisnt other shapes
        fixDef.restitution = 0.4  //amount of force feedback when hitting something. >0 makes the car bounce off, it's fun!
        var shape = new b2PolygonShape()
        shape.SetAsBox(this.config.height / World.PX_IN_M / 2, this.config.width / World.PX_IN_M / 2)
        fixDef.shape = shape
        this.body.CreateFixture(fixDef)

        //create gun
        shape.SetAsOrientedBox(1 / 8, 0.8, new b2Vec2(0, -0.6))//todo в конфиг, и может с отдельный объект
        fixDef.shape = shape//необязательно
        this.body.CreateFixture(fixDef)

        //initialize Crawlers
        this.leftCrawler = new Crawler(this, this.prepareCrawlerConfig(this.config.crawlersConfig, true))
        this.rightCrawler = new Crawler(this, this.prepareCrawlerConfig(this.config.crawlersConfig, false))
    }

    private prepareCrawlerConfig(config:IRect, forLeft:boolean):IRect {
        var resConfig:IRect = jQuery.extend({}, config)
        if (forLeft) {
            resConfig.x = -resConfig.x
        }
        return resConfig
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
        this.leftCrawler.killSidewaysVelocity()
        this.rightCrawler.killSidewaysVelocity()

        this.updateCrawler(this.leftCrawler, this.leftCrawlerAccelerate)
        this.updateCrawler(this.rightCrawler, this.rightCrawlerAccelerate)
    }

    private updateCrawler(crawler:Crawler, accelerate:AccelerateType):void {
        var baseVector
        if (accelerate == AccelerateType.FORWARD) {
            baseVector = [0, -1]
        } else if (accelerate == AccelerateType.BACKWARD) {
            if (this.getLocalVelocity()[1] < 0) {
                //braking, but still moving forwards - increased force
                baseVector = [0, 1.3]
            } else {
                //going in reverse - less force
                baseVector = [0, 0.7]
            }
        } else {
            baseVector = [0, 0]
        }

        //multiply by engine power, which gives us a force vector relative to the wheel
        var forceVector = [this.config.power * baseVector[0], this.config.power * baseVector[1]]

        //apply force to each wheel
        var position = crawler.body.GetWorldCenter()
        crawler.body.ApplyForce(crawler.body.GetWorldVector(new b2Vec2(forceVector[0], forceVector[1])), position)
    }
}


export = Tank