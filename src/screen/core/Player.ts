import Tank = require('screen/units/Tank')
import Keyboard = require('screen/commons/Keyboard')
import AccelerateType = require('screen/commons/types/AccelerateType')

class Player {

    id:number
    private tank:Tank

    constructor(id:number) {
        this.id = id
        this.enableDebugControls()
    }

    setTank(tank:Tank) {
        this.tank = tank
        tank.player = this
    }

    enableDebugControls() {
        document.addEventListener('keydown', (e:KeyboardEvent) => {
            if (e.keyCode == Keyboard.NUMPAD_7) {
                this.tank.leftCrawlerAccelerate = AccelerateType.FORWARD
            }
            if (e.keyCode == Keyboard.NUMPAD_4) {
                this.tank.leftCrawlerAccelerate = AccelerateType.BACKWARD
            }
            if (e.keyCode == Keyboard.NUMPAD_9) {
                this.tank.rightCrawlerAccelerate = AccelerateType.FORWARD
            }
            if (e.keyCode == Keyboard.NUMPAD_6) {
                this.tank.rightCrawlerAccelerate = AccelerateType.BACKWARD
            }
            if (e.keyCode == Keyboard.NUMPAD_8) {
                this.tank.fire = true
            }
        })

        document.addEventListener('keyup', (e:KeyboardEvent) => {
            if (e.keyCode == Keyboard.NUMPAD_7) {
                this.tank.leftCrawlerAccelerate = AccelerateType.NONE
            }
            if (e.keyCode == Keyboard.NUMPAD_4) {
                this.tank.leftCrawlerAccelerate = AccelerateType.NONE
            }
            if (e.keyCode == Keyboard.NUMPAD_9) {
                this.tank.rightCrawlerAccelerate = AccelerateType.NONE
            }
            if (e.keyCode == Keyboard.NUMPAD_6) {
                this.tank.rightCrawlerAccelerate = AccelerateType.NONE
            }
            if (e.keyCode == Keyboard.NUMPAD_8) {
                this.tank.fire = false
            }
        })
    }
}

export = Player