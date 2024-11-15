import { Container, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./main";
import { gsap } from "gsap";
import QUESTIONS from "./constants/Questions";
import LetterCircle from "./classes/LetterCircle";

export default class Game extends Container
{
    constructor() 
    {
        super();

        this.set_background();
        this.start();
    }

    set_background()
    {
        let bg = Sprite.from("background");
        bg.width = GAME_WIDTH;
        bg.height = GAME_HEIGHT;
        bg.zIndex = -100;
        this.addChild(bg);
    }

    set_question()
    {
        const question = QUESTIONS[0];
        question.letters.size
    }

    start()
    {
        const letter_circle = new LetterCircle(QUESTIONS[0].letters);
        
        letter_circle.x = GAME_WIDTH / 2;
        letter_circle.y = (GAME_HEIGHT * 3) / 4
        
        this.addChild(letter_circle);
    }
}