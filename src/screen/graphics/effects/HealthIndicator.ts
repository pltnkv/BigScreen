import IDrawable = require('screen/graphics/IDrawable')
import Tank = require('screen/world/units/Tank')

class HealthIndicator implements IDrawable {

    private tank:Tank

    constructor(tank:Tank) {
        this.tank = tank
    }

    draw(dt:number):void {
    }
}

export = HealthIndicator