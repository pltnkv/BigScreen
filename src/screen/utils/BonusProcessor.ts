import Tank = require('screen/world/units/Tank')
import Bonus = require('screen/world/units/Bonus')
import BonusType = require('screen/world/units/types/BonusType')

var bonusHandlers:Array<(tank:Tank) => void> = []
bonusHandlers[BonusType.ARMOR] = (tank:Tank) => {
    //применяется только 40% урона
    tank.armor = 0.4
    tank.activateBonus()
    setTimeout(() => {
        tank.armor = 1
        tank.deactivateBonus()
    }, 20 * 1000)
}
bonusHandlers[BonusType.DAMAGE] = (tank:Tank) => {
    //увеличенный урон на 100% в течении 20 сек
    var savedDamage = tank.config.damage
    tank.config.damage *= 2
    tank.activateBonus()
    setTimeout(() => {
        tank.config.damage = savedDamage
        tank.deactivateBonus()
    }, 20 * 1000)
}
bonusHandlers[BonusType.FIRERATE] = (tank:Tank) => {
    //увеличенная скороть стрельбы на 100% в течении 20 сек
    var savedFireRate = tank.config.fireRate
    tank.config.fireRate *= 0.5
    tank.activateBonus()
    setTimeout(() => {
        tank.config.fireRate = savedFireRate
        tank.deactivateBonus()
    }, 20 * 1000)
}
bonusHandlers[BonusType.HEALTH] = (tank:Tank) => {
    //восстановить здоровье
    tank.health = 100
}
bonusHandlers[BonusType.SPEED] = (tank:Tank) => {
    //увеличенная скорость на 100% в течении 30 сек
    var savedSpeed = tank.config.power
    tank.config.power *= 2
    tank.activateBonus()
    setTimeout(() => {
        tank.config.power = savedSpeed
        tank.deactivateBonus()
    }, 20 * 1000)
}
export function applyBonusToTank(tank:Tank, bonus:Bonus):void {
    console.log(`apply bonus(${bonus.bonusType}) to player(${tank.player.id})`)
    bonusHandlers[bonus.bonusType](tank)
    bonus.removed = true
}