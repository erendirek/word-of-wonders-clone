import { Container, Graphics, Point, Text } from "pixi.js";

// Kelime olusturulurken LetterCircle uzerinde olusan suanki yazi objesi.
export default class LetterCreationBox extends Container
{
    text: Text;
    background_graphics: Graphics;

    constructor() 
    {
        super();

        this.text = new Text({
            text: "",
            style: {
                fontFamily: "sniglet-regular",
                fontWeight: "bold",
                fill: 0xffffff,
                fontSize: 32
            }
        });
        this.text.anchor.set(.5, .5);
        this.text.zIndex = 1;

        this.background_graphics = new Graphics();

        this.addChild(this.text);
        this.addChild(this.background_graphics);
    }

    // Verilen text degerine gore kendi icerisindeki yaziyi degistirir ve arka plani ayarlar.
    update_text(text: string)
    {
        this.background_graphics.clear();

        this.renderable = true;
        this.text.text = text;

        const w = this.text.width + 10;
        const h = this.text.height + 6;
        this.background_graphics.roundRect(this.text.x - (w / 2), this.text.y - (h / 2), w, h, 6).fill(0xFF712F);
    }

    // Olusturulan kelimeyi silme ve kendini render'dan kaldirma fonksiyonu.
    clear_text()
    {
        this.renderable = false;
        this.text.text = "";
        this.background_graphics.clear();
    }
}