import TankType = require('screen/units/types/TankType')
import Unit = require('screen/units/Unit')
import UnitsFactory = require('screen/units/UnitsFactory')
import IPoint = require('screen/commons/types/IPoint')
import b2Vec2 = Box2D.Common.Math.b2Vec2
import b2World = Box2D.Dynamics.b2World

export var PX_IN_M = 30
export var b2world:b2World

var objects:Unit[] = []

export function init() {
    createB2World()
    createWalls()
}

function createB2World() {
    b2world = new b2World(new b2Vec2(0, 0), false)
}

function createWalls() {
    //todo
}

export function addTank(tankType:TankType, position:IPoint, angle = 0):void {
    var tank = UnitsFactory.produceTank(tankType)
    tank.setPositionAndAngle(position, angle)
    objects.push(tank)
}

export function addObstacle(position:IPoint, angle = 0):void {
    //todo
}

export function update(deltaTime:number):void {
    for (var i = 0, l = objects.length; i < l; i++) {
        objects[i].update(deltaTime)
    }
}
