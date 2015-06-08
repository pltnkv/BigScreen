import Player = require('screen/core/Player')
import ITankConfig = require('screen/world/units/configs/ITankConfig')
import World = require('screen/world/World')
import Bullet = require('screen/world/units/Bullet')
import Unit = require('screen/world/units/Unit')
import UnitName = require('screen/world/units/types/UnitName')
import Crawler = require('screen/world/units/Crawler')
import IPoint = require('screen/commons/types/IPoint')
import IRect = require('screen/commons/types/IRect')
import AccelerateType = require('screen/commons/types/AccelerateType')
import HealthIndicator = require('screen/graphics/HealthIndicator')

import b2Vec2 = Box2D.Common.Math.b2Vec2
import b2Body = Box2D.Dynamics.b2Body
import b2BodyDef = Box2D.Dynamics.b2BodyDef
import b2FixtureDef = Box2D.Dynamics.b2FixtureDef
import b2Fixture = Box2D.Dynamics.b2Fixture
import b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape

var FIRE_RATE = 1000

class Tank extends Unit {

    player:Player
    leftCrawlerAccelerate = AccelerateType.NONE
    rightCrawlerAccelerate = AccelerateType.NONE
    fire = false
    health = 100

    private config:ITankConfig
    private leftCrawler:Crawler
    private rightCrawler:Crawler
    private canFire = true

    private healthIndicator:HealthIndicator

    constructor(config:ITankConfig) {
        super(UnitName.TANK)
        this.config = config
        this.createBody()
        this.healthIndicator = new HealthIndicator(this)
        this.createVisual()
    }

    private createBody() {
        //initialize body
        var def = new b2BodyDef()
        def.userData = this
        def.type = b2Body.b2_dynamicBody
        def.position = new b2Vec2(200 / World.PX_IN_M, 200 / World.PX_IN_M)//todo temp
        //def.angle = math.radians(pars.angle)//todo temp
        def.linearDamping = 3  //gradually reduces velocity, makes the car reduce speed slowly if neither accelerator nor brake is pressed
        def.angularDamping = 7
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
        var velocity = this.body.GetLinearVelocity()
        return (velocity.Length() / 1000) * 3600
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
        this.updateCrawler(this.leftCrawler, this.leftCrawlerAccelerate)
        this.updateCrawler(this.rightCrawler, this.rightCrawlerAccelerate)
        this.updateGun()
    }

    addDamage(damage:number, fixture:b2Fixture):void {
        var bodyDamage:number
        if (this.leftCrawler.fixture == fixture) {
            bodyDamage = this.applyDamageToCrawler(this.leftCrawler, damage)
        } else if (this.rightCrawler.fixture == fixture) {
            bodyDamage = this.applyDamageToCrawler(this.rightCrawler, damage)
        } else {
            this.rightCrawler.applyDamage(damage * 0.2)
            this.rightCrawler.applyDamage(damage * 0.2)
            bodyDamage = damage * 0.6
        }
        this.applyDamageToBody(bodyDamage)
    }

    private applyDamageToBody(damage:number):void {
        this.health -= damage
        console.log('TANK.health', this.health)
        if (this.health <= 0) {
            this.removed = true
            console.log(this.player.id, 'TANK DESTROYED')
        }
    }

    private applyDamageToCrawler(crawler:Crawler, damage:number):number {
        if (crawler.destroyed) {
            return damage * 0.6
        } else {
            crawler.applyDamage(damage * 0.8)
            return damage * 0.2
        }
    }

    private updateGun() {
        if (this.fire && this.canFire) {
            this.canFire = false
            setTimeout(() => {
                this.canFire = true
            }, FIRE_RATE)

            var bulletPos = this.body.GetWorldPoint(new b2Vec2(0, -1.4))
            var direction = this.body.GetWorldVector(new b2Vec2(0, -1))
            World.addUnit(new Bullet(bulletPos, this.body.GetAngle(), direction, this))
            direction = direction.Copy()
            direction.Multiply(0.2)
            direction.NegativeSelf()
            this.body.ApplyImpulse(direction, this.body.GetWorldCenter())
        }
    }

    private updateCrawler(crawler:Crawler, accelerate:AccelerateType):void {
        if(crawler.destroyed) {
            //todo снижать мощность в зависимости от поврежденности
            return
        }

        var baseVector
        if (accelerate == AccelerateType.FORWARD) {
            baseVector = [0, -1]
        } else if (accelerate == AccelerateType.BACKWARD) {
            if (this.getLocalVelocity()[1] < 0) {
                baseVector = [0, 1.3]
            } else {
                baseVector = [0, 0.7]
            }
        } else {
            baseVector = [0, 0]
        }

        //multiply by engine power, which gives us a force vector relative to the wheel
        var forceVector = new b2Vec2(baseVector[0], baseVector[1])
        forceVector.Multiply(this.config.power)
        var position = this.body.GetWorldPoint(new b2Vec2(crawler.config.x / World.PX_IN_M, crawler.config.y / World.PX_IN_M))
        this.body.ApplyForce(this.body.GetWorldVector(forceVector), position)
    }

    private createVisual() {

    }

    private updateVisual() {

    }
}


export = Tank