import Block = require('screen/core/Block')

class Level {
    private blocks:Block[][]

    init(blocks:Block[][]) {
        this.blocks = blocks
    }

    getAffectedBlocks(x:number, y:number):Block[] {
        return null
    }

    getBlocks() {
        return this.blocks
    }

}
export = Level;