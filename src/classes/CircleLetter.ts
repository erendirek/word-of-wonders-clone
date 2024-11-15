import { Container, Graphics, Text } from "pixi.js";

export default class CircleLetter extends Container
{
    letter: string;
    w: number;
    h: number;
    
    constructor(letter: string, width: number, height: number) 
    {
        super();

        this.letter = letter;
        
        this.w = width;
        this.h = height;

        this.start();
    }

    start()
    {
        const letter = new Text({
            text: this.letter
        });

        letter.scale.set(1)

        this.addChild(letter);

        const bounds = this.getBounds();
        this.pivot.set(bounds.width / 2, bounds.height / 2);
    }
}