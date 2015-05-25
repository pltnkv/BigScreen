import Tank = require('screen/world/units/Tank')
import TankType = require('screen/world/units/types/TankType')
import ConfigHolder = require('screen/world/units/configs/ConfigHolder')

export function produceTank(tankType:TankType):Tank {
    return new Tank(ConfigHolder.getTankConfig(tankType))
}