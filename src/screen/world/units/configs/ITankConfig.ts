import IPoint = require('screen/commons/types/IPoint')

class ITankConfig {
    width:number
    height:number
    angle:number
    power:number
    maxSpeed:number
    fireRate:number
    damage:number
    crawlersConfig:IPoint
}

export = ITankConfig