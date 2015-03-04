import Stage = require('screen/render/Stage')
import LevelBuilder = require('screen/core/LevelBuilder')
import GameRender = require('screen/GameRender')

var level = LevelBuilder.build()
var game = new GameRender(level)
Stage.createAndPlay(game)



