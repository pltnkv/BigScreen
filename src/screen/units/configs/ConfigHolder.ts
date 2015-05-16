import ITankConfig = require('screen/units/configs/ITankConfig')
import TankType = require('screen/units/types/TankType')

var tanksConfigs:ITankConfig[] = []
tanksConfigs[TankType.DEFAULT] = {
    width: 50,
    height: 36,
    angle: 0,
    power: 15,
    maxSpeed: 60,
    crawlersConfig: {width: 12, height: 60, y: 0, x: 18}
}


export function getTankConfig(tankType:TankType):ITankConfig {
    return tanksConfigs[tankType]
}