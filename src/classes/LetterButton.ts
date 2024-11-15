import { Container, Graphics, Text } from "pixi.js";

export default class LetterButton extends Container
{
    letter: string;
    m_scale: number;
    
    constructor(letter: string, scale: number) 
    {
        super();

        this.letter = letter;
        this.m_scale = scale;

        this.start();
    }

    start()
    {
        const letter = new Text({
            text: this.letter
        });

        letter.scale.set(this.m_scale);

        this.addChild(letter);

        const bounds = this.getBounds();
        this.pivot.set(bounds.width / 2, bounds.height / 2);
    }
}