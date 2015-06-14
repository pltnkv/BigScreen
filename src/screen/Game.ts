import World = require('screen/world/World')
import UI = require('screen/ui/UI')
import Player = require('screen/core/Player')
import TankType = require('screen/world/units/types/TankType')
import MapLoader = require('screen/world/map/MapLoader')
import Layers = require('screen/graphics/Layers')
import DrawableObjects = require('screen/graphics/DrawableObjects')
import utils = require('screen/utils/utils')

import b2World = Box2D.Dynamics.b2World
import b2DebugDraw = Box2D.Dynamics.b2DebugDraw
import b2Vec2 = Box2D.Common.Math.b2Vec2

var renderer:PIXI.PixiRenderer

var DEBUG_BOX2D_RENDER = !!utils.getParameterByName('b2render', false)
export var LOCAL_DEBUG = !!utils.getParameterByName('local', true)
export var stage

export function init():void {
    World.init()
    configureDebugDraw()
    configureRender()
    Layers.init(stage)
    loadMap()
    getDatGUI()
}

function configureDebugDraw() {
    if (DEBUG_BOX2D_RENDER) {
        var debugDraw = new b2DebugDraw()
        debugDraw.SetSprite(UI.getDebugCanvas().getContext("2d"))
        debugDraw.SetDrawScale(World.PX_IN_M)
        debugDraw.SetFillAlpha(0.5)
        debugDraw.SetLineThickness(1.0)
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit)
        World.b2world.SetDebugDraw(debugDraw)
    }
}

function configureRender() {
    renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
        transparent: true,
        view: UI.getMainCanvas()
    })
    document.body.appendChild(renderer.view)
    stage = new PIXI.Container()
}


function loadMap() {
    MapLoader.load()
    World.addBall({x: 500, y: 300})
}

var gui:dat.GUI
export function getDatGUI():dat.GUI {
    if (!gui) {
        gui = new dat.GUI()
    }
    return gui
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
    runUpdateLoop()
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

        if (DEBUG_BOX2D_RENDER) {
            World.b2world.DrawDebugData()
        }

        DrawableObjects.draw(dt)
        renderer.render(stage)
    }
}