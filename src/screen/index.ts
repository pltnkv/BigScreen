import cls = require('screen/testClass')
import SubClass2 = require('screen/sub/SubClass2')

var stage = createStage()
createTestBlock()

var s = new SubClass2()

function createStage() {
    console.log('createStage');
    var stage = new PIXI.Stage(0xEEEEEE)
    var renderer = new PIXI.CanvasRenderer(window.innerWidth - 5, window.innerHeight - 5)
    var gameContainer = new PIXI.DisplayObjectContainer()
    stage.addChild(gameContainer)
    document.body.appendChild(renderer.view)

    requestAnimFrame(animate);
    function animate() {
        requestAnimFrame(animate);
        renderer.render(stage);
    }

    return stage
}

function createTestBlock() {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFF00);
    graphics.lineStyle(5, 0xFF0000);
    graphics.drawRect(0, 0, 100, 100);
    stage.addChild(graphics);
}
