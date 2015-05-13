import World = require('screen/World')
import UI = require('screen/ui/UI')
import b2World = Box2D.Dynamics.b2World
import b2DebugDraw = Box2D.Dynamics.b2DebugDraw
import b2Vec2 = Box2D.Common.Math.b2Vec2

var world:World

export var PX_IN_M = 30 

export function init() {
    world = new World()
    world.addObstacle()
    world.addObstacle()
    world.addObstacle()
    world.addTank()
    world.addTank()

    createPhysics()
    runUpdateLoop()
}

function createPhysics() {
    var b2world = new b2World(new b2Vec2(0, 0), false)

    var debugDraw = new b2DebugDraw()
    debugDraw.SetSprite(UI.getCanvas().getContext("2d"))
    debugDraw.SetDrawScale(PX_IN_M)
    debugDraw.SetFillAlpha(0.5)
    debugDraw.SetLineThickness(1.0)
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit)
    b2world.SetDebugDraw(debugDraw)
}


function runUpdateLoop() {
    window.requestAnimationFrame(onRequestAnimationFrame)

    var prevTime = Date.now()

    function onRequestAnimationFrame() {
        var curTime = Date.now()
        var dt = curTime - prevTime
        prevTime = curTime
        window.requestAnimationFrame(onRequestAnimationFrame)
        world.update(dt)
    }
}

