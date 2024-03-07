import { Container, Sprite, Ticker } from "pixi.js";

export class TutorialScene extends Container {
    private readonly screenWidth: number;
    private readonly screenHeight: number;

    private clampy: Sprite;
    private clampyVelocity: number = 5;
    constructor(screenWidth: number, screenHeight: number) {
        super();

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.clampy = Sprite.from("tutorial/clampy.png");

        this.clampy.anchor.set(0.5);
        this.clampy.x = 0; // we start it at 0
        this.clampy.y = this.screenHeight / 2;
        this.addChild(this.clampy);

        // See the `, this` thingy there? That is another way of binding the context!
        Ticker.shared.add(this.update, this);

        // If you want, you can do it the bind way
        // Ticker.shared.add(this.update.bind(this)); 
    }

    private update(deltaTime: number): void {
        this.clampy.x = this.clampy.x + this.clampyVelocity * deltaTime;

        if (this.clampy.x > this.screenWidth) {
            // Woah there clampy, come back inside the screen!
            this.clampy.x = 0;
        }
    }
}