import { Tween, Group } from "tweedle.js";
import { Container, Sprite, Ticker } from "pixi.js";

export class TweedleScene extends Container {
    private clampy: Sprite;
    constructor(screenWidth: number, screenHeight: number) {
        super();

        this.clampy = Sprite.from("tutorial/clampy.png");

        this.clampy.anchor.set(0.5);
        this.clampy.x = screenWidth / 2;
        this.clampy.y = screenHeight / 2;
        this.addChild(this.clampy);

        Ticker.shared.add(this.update, this);

        // See how these chains all together
        new Tween(this.clampy.scale).to({ x: 0.5, y: 0.5 }, 1000).repeat(Infinity).yoyo(true).start();

        // This is the same code, but unchained
        // const tweeny = new Tween(this.clampy.scale);
        // tweeny.to({ x: 0.5, y: 0.5 }, 1000);
        // tweeny.repeat(Infinity);
        // tweeny.yoyo(true);
        // tweeny.start();
    }

    private update(): void {
        //You need to update a group for the tweens to do something!
        Group.shared.update()
    }
}