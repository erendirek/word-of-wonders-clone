import { Container, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./main";
import { gsap } from "gsap";
import QUESTIONS from "./constants/Questions";
import CircleLetter from "./classes/CircleLetter";

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
        let letter_circle_sprite = Sprite.from("white-circle");
        let shuffle_sprite = Sprite.from("shuffle-logo");

        // Configure White Circle
        letter_circle_sprite.anchor.set(0.5);
        shuffle_sprite.anchor.set(0.5);

        letter_circle_sprite.width = 250;
        letter_circle_sprite.height = 250;

        shuffle_sprite.width = 50;
        shuffle_sprite.height = 50;

        letter_circle_sprite.alpha = 0.6;
        shuffle_sprite.alpha = 0.6;

        letter_circle_sprite.x = GAME_WIDTH / 2;
        letter_circle_sprite.y = (GAME_HEIGHT / 4) * 3;
        letter_circle_sprite.zIndex = -1;

        shuffle_sprite.x = GAME_WIDTH / 2;
        shuffle_sprite.y = (GAME_HEIGHT / 4) * 3;
        shuffle_sprite.zIndex = 0;

        let obj = new CircleLetter("S", 40, 40);
        
        obj.zIndex = 0;
        obj.x = GAME_WIDTH / 2;
        obj.y = (GAME_HEIGHT / 4) * 3;

        this.addChild(letter_circle_sprite);
        this.addChild(shuffle_sprite);
        this.addChild(obj);
    }
}