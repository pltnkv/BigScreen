import IDrawable = require('screen/graphics/IDrawable')

var objects:IDrawable[] = []

export function addDrawableObject(obj:IDrawable):void {
    objects.push(obj)
}

export function removeDrawableObject(obj:IDrawable):void {
    var index = objects.indexOf(obj)
    if (index != -1) {
        objects.splice(index, 1)
    }
}

export function draw(dt:number) {
    objects.forEach(obj => obj.draw(dt))
}