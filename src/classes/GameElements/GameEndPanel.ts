import { Container, Graphics } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../../main";
import { gsap } from "gsap";

// Oyun bitince cikan reklam sayfasi.
export default class GameEndPanel extends Container
{
    constructor() 
    {
        super();

        this.start();
    }

    // Saydam siyah bir arkaplan objesi olusturur.
    set_background()
    {
        const graphic = new Graphics().rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        graphic.fillStyle.color = 0x000000;
        graphic.fillStyle.alpha = 0.7;
        graphic.fill();
        graphic.alpha = 0;

        gsap.to(
            graphic,
            {
                pixi: {
                    alpha: 1
                },
                duration: 0.2
            }
        );

        this.addChild(graphic);
    }

    start()
    {
        this.set_background();
    }
}