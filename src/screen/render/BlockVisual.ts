import Visual = require('screen/render/Visual')
import Config = require('screen/render/Config')

class BlockVisual implements Visual {

    private visual:PIXI.Graphics

    constructor() {
        this.visual = new PIXI.Graphics()
        this.visual.beginFill(0xFFFF00)
        this.visual.lineStyle(1, 0xFF0000)
        this.visual.drawRect(0, 0, Config.BLOCK_SIZE, Config.BLOCK_SIZE)
    }

    getVisual():PIXI.DisplayObject {
        return this.visual
    }
}
export = BlockVisual