import { Application } from 'pixi.js'
import { TweedleScene } from './scenes/TweedleScene';

export class Render {
	private app: Application;

	constructor() {
		this.app = new Application({
			view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			backgroundColor: 0x6495ed,
			width: 640,
			height: 480
		});
	}

	loadTweedleScene() {
		const tweedleScene = new TweedleScene(this.app.screen.width, this.app.screen.height);
		this.app.stage.addChild(tweedleScene);
	}
}
