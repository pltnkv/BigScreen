import Unit = require('screen/world/units/Unit')
import UnitName = require('screen/world/units/types/UnitName')

class Obstacle extends Unit {
    constructor() {
        super(UnitName.OBSTACLE)
    }
}

export = Obstacle