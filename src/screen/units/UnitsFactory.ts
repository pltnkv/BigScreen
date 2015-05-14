import Tank = require('screen/units/Tank')
import TankType = require('screen/units/types/TankType')
import ConfigHolder = require('screen/units/configs/ConfigHolder')

export function produceTank(tankType:TankType):Tank {
    return new Tank(ConfigHolder.getTankConfig(tankType))
}