import Tank = require('screen/units/Tank')
import Keyboard = require('screen/commons/Keyboard')
import AccelerateType = require('screen/commons/types/AccelerateType')
import ActionType = require('screen/commons/types/ActionType')
import Game = require('screen/Game')

class Player {

    id:number
    private tank:Tank

    constructor(id:number) {
        this.id = id
        if (Game.LOCAL_DEBUG) {
            this.enableDebugControls()
        }
    }

    setTank(tank:Tank) {
        this.tank = tank
        tank.player = this
    }

    applyCommand(command:{id: ActionType; down:boolean}):void {
        switch (command.id) {
            case ActionType.FORWARD_RIGHT:
                this.tank.leftCrawlerAccelerate = command.down ? AccelerateType.FORWARD : AccelerateType.NONE
                break
            case ActionType.FORWARD_LEFT:
                this.tank.rightCrawlerAccelerate = command.down ? AccelerateType.FORWARD : AccelerateType.NONE
                break
            case ActionType.BACKWARD_RIGHT:
                this.tank.leftCrawlerAccelerate = command.down ? AccelerateType.BACKWARD : AccelerateType.NONE
                break
            case ActionType.BACKWARD_LEFT:
                this.tank.rightCrawlerAccelerate = command.down ? AccelerateType.BACKWARD : AccelerateType.NONE
                break
            case ActionType.FIRE:
                this.tank.fire = command.down
                break
        }
    }

    enableDebugControls() {
        document.addEventListener('keydown', (e:KeyboardEvent) => {
            if (e.keyCode == Keyboard.NUMPAD_9) {
                this.tank.leftCrawlerAccelerate = AccelerateType.FORWARD
            }
            if (e.keyCode == Keyboard.NUMPAD_6) {
                this.tank.leftCrawlerAccelerate = AccelerateType.BACKWARD
            }
            if (e.keyCode == Keyboard.NUMPAD_7) {
                this.tank.rightCrawlerAccelerate = AccelerateType.FORWARD
            }
            if (e.keyCode == Keyboard.NUMPAD_4) {
                this.tank.rightCrawlerAccelerate = AccelerateType.BACKWARD
            }
            if (e.keyCode == Keyboard.NUMPAD_8) {
                this.tank.fire = true
            }
        })

        document.addEventListener('keyup', (e:KeyboardEvent) => {
            if (e.keyCode == Keyboard.NUMPAD_9) {
                this.tank.leftCrawlerAccelerate = AccelerateType.NONE
            }
            if (e.keyCode == Keyboard.NUMPAD_6) {
                this.tank.leftCrawlerAccelerate = AccelerateType.NONE
            }
            if (e.keyCode == Keyboard.NUMPAD_7) {
                this.tank.rightCrawlerAccelerate = AccelerateType.NONE
            }
            if (e.keyCode == Keyboard.NUMPAD_4) {
                this.tank.rightCrawlerAccelerate = AccelerateType.NONE
            }
            if (e.keyCode == Keyboard.NUMPAD_8) {
                this.tank.fire = false
            }
        })
    }
}

export = Player