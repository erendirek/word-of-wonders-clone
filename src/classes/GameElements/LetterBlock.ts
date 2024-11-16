import { Container, Graphics, Sprite, Text } from "pixi.js";

// Kelimeyi dogru olusturunca ortaya cikan ve LetterGrid'de yerlerine yerlesen harflerin sinifi.
export default class LetterBlock extends Container
{
    text: Text; // harfi icinde bulunduran Text objesi.
    background: Sprite; // Harfin arka plan objesi.

    constructor(letter: string, font: number, inner_tile_size: number)
    {
        super();
        
        this.text = new Text({
            text: letter,
            style: {
                fontFamily: "sniglet-regular",
                fontWeight: "bold",
                fontSize: font,
                fill: 0xFF712F
            }
        });
        this.text.anchor.set(0.5);
        this.text.pivot.set(inner_tile_size / -2);
        this.text.zIndex = 1;

        this.background = Sprite.from("white-tile");
        this.background.width = inner_tile_size;
        this.background.height = inner_tile_size;
        this.background.tint = 0xFF712F;
        this.background.renderable = false;

        this.addChild(this.text);
        this.addChild(this.background);
    }

    // Obje LetterGrid'de tam olarak yerine yerlesince cagirilan fonksiyon.
    on_mount()
    {
        this.background.renderable = true;
        this.text.style.fill = 0xffffff;
    }
}