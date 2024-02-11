import { Application } from 'pixi.js'
import { TweedleScene } from './scenes/TweedleScene';

const app = new Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x6495ed,
    width: 640,
    height: 480
});

const tweedleScene = new TweedleScene(app.screen.width, app.screen.height);
app.stage.addChild(tweedleScene);