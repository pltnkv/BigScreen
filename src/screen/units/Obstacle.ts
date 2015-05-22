import Unit = require('screen/units/Unit')
import UnitName = require('screen/units/types/UnitName')

class Obstacle extends Unit {
    constructor() {
        super(UnitName.OBSTACLE)
    }
}

export = Obstacle