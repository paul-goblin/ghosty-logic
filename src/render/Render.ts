import { Application } from 'pixi.js'
import { TweedleScene } from './scenes/TweedleScene';

export class Render {
	app: Application;

	constructor() {
		this.app = new Application();
	}

	async init() {
		await this.app.init()
	}

	loadTweedleScene() {
		const tweedleScene = new TweedleScene(this.app.screen.width, this.app.screen.height);
		this.app.stage.addChild(tweedleScene);
	}
}
