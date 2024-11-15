import * as PIXI from "pixi.js";
import { Application, Assets, Sprite } from "pixi.js";
import Game from "./game";
import load_assets from "./assets";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 800;

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

    await load_assets();

    app.stage.addChild(new Game());

    document.body.appendChild(app.canvas);
}

main();