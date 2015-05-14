import ITankConfig = require('screen/units/configs/ITankConfig')
import TankType = require('screen/units/types/TankType')

var tanksConfigs:ITankConfig[] = []
tanksConfigs[TankType.DEFAULT] = {
    width: 60,
    height: 40,
    angle: 0,
    power: 60,
    maxSpeed: 60,
    crawlersConfig: {width: 20, length: 50, y: 5, x: 20}
}


export function getTankConfig(tankType:TankType):ITankConfig {
    return tanksConfigs[tankType]
}