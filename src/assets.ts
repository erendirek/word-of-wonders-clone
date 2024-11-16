import { Assets } from "pixi.js";

export default async function load_assets() 
{
    await Assets.init({manifest: "json/manifest.json"});

    await Assets.loadBundle(["load-screen", "in-game", "font"]);
}