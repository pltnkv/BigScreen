import TankType = require('screen/world/units/types/TankType')
import Tank = require('screen/world/units/Tank')
import ContactListener = require('screen/world/ContactListener')
import Contacts = require('screen/world/Contacts')
import Ball = require('screen/world/units/Ball')
import Block = require('screen/world/units/Block')
import Unit = require('screen/world/units/Unit')
import UnitsFactory = require('screen/world/units/UnitsFactory')
import IPoint = require('screen/commons/types/IPoint')
import b2Vec2 = Box2D.Common.Math.b2Vec2
import b2World = Box2D.Dynamics.b2World

export var PX_IN_M = 30
export var b2world:b2World

var units:Unit[] = []

export function addUnit(unit:Unit) {
    units.push(unit)
}

export function init() {
    createB2World()
    createWalls()
}

function createB2World() {
    b2world = new b2World(new b2Vec2(0, 0), false)
    b2world.SetContactListener(ContactListener.get())
}

function createWalls() {
    var w = window.innerWidth
    var h = window.innerHeight
    var wallSize = 10
    addUnit(new Block({x: w / 2, y: 0, width: w, height: wallSize}))
    addUnit(new Block({x: w / 2, y: h, width: w, height: 10}))
    addUnit(new Block({x: 0, y: h / 2, width: wallSize, height: h}))
    addUnit(new Block({x: w, y: h / 2, width: wallSize, height: h}))
}

export function addBall(position:IPoint) {
    addUnit(new Ball(position))
}

export function addTank(tankType:TankType, position:IPoint, angle = 0):Tank {
    var tank = UnitsFactory.produceTank(tankType)
    tank.setPositionAndAngle(position, angle)
    addUnit(tank)
    return tank
}

export function addObstacle(position:IPoint, angle = 0):void {
    //todo
}

export function update(deltaTime:number):void {
    //пробегаемся по всем объектам дважды, можно оптимизировать
    units = units.filter(unit => {
        if (unit.removed) {
            unit.destroyBody()
        }
        return !unit.removed
    })

    for (var i = 0, l = units.length; i < l; i++) {
        units[i].update(deltaTime)
    }

    /*
    for (var b:b2Body=world.GetBodyList(); b; b=b.GetNext())
     {
     if (b.GetUserData()=="remove") {
     world.DestroyBody(b);
     }
     }
     */
}

export function draw():void {
    //todo отрисовываться могут не только объекты физического мира, например фоновые анимации или взрывы
    for (var i = 0, l = units.length; i < l; i++) {
        units[i].draw()
    }
}
