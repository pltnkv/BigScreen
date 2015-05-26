import GraphicsObject = require('screen/graphics/GraphicsObject')
import Tank = require('screen/world/units/Tank')

class HealthIndicator extends GraphicsObject {

    private tank:Tank

    constructor(tank:Tank) {
        super()
        this.tank = tank
    }

    render() {

    }
}

export = HealthIndicator