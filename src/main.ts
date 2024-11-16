import * as PIXI from "pixi.js";
import { Application } from "pixi.js";
import Game from "./game";
import load_assets from "./assets";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import GameManager from "./classes/Managers/GameManager";

export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 800;

// Creates pixi Application
export const app = new Application();

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

async function main() 
{
    await app.init({
        background: 0x000000,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
    });

    app.ticker.stop();
    gsap.ticker.add(()=>{
        app.ticker.update();
    });

    // Assetleri yukler.
    await load_assets();

    // GameManager sinifindan singleton objesi olusturur.
    GameManager.start_game_manager();

    app.stage.addChild(new Game());

    document.body.appendChild(app.canvas);
}

main();