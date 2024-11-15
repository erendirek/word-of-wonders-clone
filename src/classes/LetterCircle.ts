import { Container, FederatedPointerEvent, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../main";
import Vector2 from "./Vector2";
import LetterButton from "./LetterButton";
import { shuffle } from "../helpers/HelperFunctions";

export default class LetterCircle extends Container
{
    letters: Set<string>;
    letter_buttons: Array<LetterButton> = [];
    letter_positions: Array<Vector2> = [];

    constructor(letters: Set<string>) 
    {
        super();

        this.letters = letters;

        this.place_letters_to_circle();
        this.start();
    }

    shuffle_letters(event: FederatedPointerEvent)
    {
        shuffle(this.letter_positions);
        for (let i = 0; i < this.letter_positions.length; i++) 
        {
            this.letter_buttons[i].x = this.letter_positions[i].x;
            this.letter_buttons[i].y = this.letter_positions[i].y;
        }
    }

    place_letters_to_circle()
    {
        const angle = 2 * Math.PI / this.letters.size;
        const up = new Vector2(0, 1);
        this.letters.forEach((letter) => 
            {
            const vec = up.mul(85);
            this.letter_positions.push(vec);
        
            const letter_button = new LetterButton(letter, 1.4);

            letter_button.x = vec.x;
            letter_button.y = vec.y;

            up.rotate(angle);

            this.letter_buttons.push(letter_button);
            }
        );
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

        letter_circle_sprite.zIndex = -1;
        shuffle_sprite.zIndex = 0;

        shuffle_sprite.interactive = true;
        shuffle_sprite.onpointerdown = this.shuffle_letters;

        this.addChild(letter_circle_sprite);
        this.addChild(shuffle_sprite);
        this.letter_buttons.forEach((letter_button) => {
            this.addChild(letter_button);
        });
    }
}