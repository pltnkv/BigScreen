import Tank = require('screen/world/units/Tank')
import Bonus = require('screen/world/units/Bonus')
import BonusType = require('screen/world/units/types/BonusType')

var bonusHandlers:Array<(tank:Tank) => void> = []
bonusHandlers[BonusType.ARMOR] = (tank:Tank) => {
    //применяется только 40% урона
    //todo требуется визуалы (для начала можно изменить тип тени)
}
bonusHandlers[BonusType.DAMAGE] = (tank:Tank) => {
    //увеличенный урон на 100% в течении 20 сек
    //todo требуется визуалы
}
bonusHandlers[BonusType.FIRERATE] = (tank:Tank) => {
    //увеличенная скороть стрельбы на 100% в течении 20 сек
    //todo требуется визуалы
}
bonusHandlers[BonusType.HEALTH] = (tank:Tank) => {
    //восстановить здоровье
}
bonusHandlers[BonusType.SPEED] = (tank:Tank) => {
    //увеличенная скорость на 100% в течении 30 сек
    //todo требуется визуалы

}
export function applyBonusToTank(tank:Tank, bonus:Bonus):void {
    console.log(`apply bonus(${bonus.bonusType}) to player(${tank.player.id})`)
    bonusHandlers[bonus.bonusType](tank)
}