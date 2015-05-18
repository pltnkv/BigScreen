import World = require('screen/World')
import UI = require('screen/ui/UI')
import Player = require('screen/core/Player')
import TankType = require('screen/units/types/TankType')
import b2World = Box2D.Dynamics.b2World
import b2DebugDraw = Box2D.Dynamics.b2DebugDraw
import b2Vec2 = Box2D.Common.Math.b2Vec2

export var LOCAL_DEBUG = true

export function init():void {
    World.init()
    World.addBall({x: 500, y: 300})
    //world.addObstacle()
}

export function addPlayers(players:Player[]):void {
    var posX = 100
    players.forEach(player => {
        player.setTank(World.addTank(TankType.DEFAULT, {x: posX, y: 200}, 0))//позиции должны браться из карты в зависимости от кол-ва игроков
        posX += 200
    })

}

export function start() {
    console.log('Game started')
    configureDebugDraw()
    runUpdateLoop()
}

function configureDebugDraw() {
    var debugDraw = new b2DebugDraw()
    debugDraw.SetSprite(UI.getCanvas().getContext("2d"))
    debugDraw.SetDrawScale(World.PX_IN_M)
    debugDraw.SetFillAlpha(0.5)
    debugDraw.SetLineThickness(1.0)
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit)
    World.b2world.SetDebugDraw(debugDraw)
}

function runUpdateLoop() {
    window.requestAnimationFrame(onRequestAnimationFrame)

    var prevTime = Date.now()

    function onRequestAnimationFrame() {
        window.requestAnimationFrame(onRequestAnimationFrame)

        var curTime = Date.now()
        var dt = curTime - prevTime
        prevTime = curTime
        World.update(dt)

        //update physics world
        World.b2world.Step(dt / 1000, 10, 8)
        World.b2world.ClearForces()

        //let box2d draw it's bodies
        World.b2world.DrawDebugData()
    }
}