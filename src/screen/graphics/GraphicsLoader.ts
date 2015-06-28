export function load(callback:() => void):void {
    PIXI.loader
        .add('fireExp', 'images/assets/fire-exp.json')
        .add('bulletExp', 'images/assets/bullet-exp.json')
        .add('tankExp', 'images/assets/tank-exp.json')
        .load(callback);
}