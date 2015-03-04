import Block = require('screen/core/Block')
import Level = require('screen/core/Level')
import Stage = require('screen/render/Stage')
import LayerType = require('screen/render/LayerType')

class GameRender {
    private level:Level

    constructor(level:Level) {
        this.level = level
    }

    draw() {
        this.drawBlocks()
        this.drawTanks()
        this.drawBullets()
    }

    private drawBlocks() {
        console.log('drawBlocks');
        //todo продлжаем от сюда.
        //нужно отрендерить блоки, для начала создать их визуалы и добавить на нужный слой
        //позиции у блоков не меняются
        //в этом методе видимо будем удалять блоки, или хз... надо думать

        //var layer = Stage.getLayer(LayerType.BOTTOM_BLOCKS)
    }

    private drawTanks() {

    }

    private drawBullets() {

    }
}
export = GameRender;