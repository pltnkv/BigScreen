import UnitName = require('screen/units/types/UnitName')
import World = require('screen/World')

import b2Body = Box2D.Dynamics.b2Body

class Unit {
    body:b2Body
    removed = false

    private _name:UnitName

    get name():UnitName {
        return this._name
    }

    constructor(name:UnitName) {
        this._name = name
    }

    destroyBody():void {
        console.log('destroyBody', this)
        World.b2world.DestroyBody(this.body)
    }

    update(deltaTime:number):void {
    }
}
export = Unit