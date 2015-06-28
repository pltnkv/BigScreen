export function load(callback:() => void):void {
    PIXI.loader
        .add('fireExp', 'images/assets/fire-exp.json')
        .load(callback);
}