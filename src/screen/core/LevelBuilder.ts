import LevelProvider = require('screen/core/LevelProvider')
import Level = require('screen/core/Level')
import BlockType = require('screen/core/BlockType')
import Block = require('screen/core/Block')

export function build():Level {
    var data = LevelProvider.getData()
    var blocks = []

    for (var i = 0; i < data.length; i++) {
        blocks[i] = []
        for (var j = 0; j < data.length; j++) {
            var blockType = data[i][j]
            if (blockType != 0) {
                blocks[i][j] = createBlockFromType(blockType)
            }
        }
    }

    var level = new Level()
    level.init(blocks)
    return level
}

function createBlockFromType(type:BlockType):Block {
    var block = new Block()
    block.type = type
    return block
}