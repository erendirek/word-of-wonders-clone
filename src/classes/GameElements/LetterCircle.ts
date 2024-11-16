import { Container, FederatedPointerEvent, Graphics, Point, Sprite, Ticker } from "pixi.js";
import { app, GAME_HEIGHT, GAME_WIDTH } from "../../main";
import Vector2 from "../Mechanics/Vector2";
import LetterButton from "./LetterButton";
import { shuffle } from "../../helpers/HelperFunctions";
import { gsap } from "gsap";
import Question from "../Mechanics/Question";
import GameManager from "../Managers/GameManager";

// Kelime olusturmak icin kullanilan icerisinde harflerin bulundugu daire.
export default class LetterCircle extends Container
{
    letters: Set<string>; // Daire icerisindeki harfler.
    letter_buttons: Array<LetterButton> = []; // Daire icerisindeki harflerin etkilesimi icin olusturulan butonlar.
    letter_positions: Array<Vector2> = []; // Daire icerisindeki butonlarin konumlari.

    line_between_word_creation_letters: Graphics = new Graphics({renderable: false}); // Kelime olustururken butonlar ve isaretci arasinda olusan cizgiyi olusturan obje.

    constructor(question: Question) 
    {
        super();
        
        this.letters = question.letters;

        this.start();
    }

    // Daire icerisindeki butonlari karistirir.
    shuffle_letters()
    {
        if (GameManager.Instance.in_shuffle) return;

        GameManager.Instance.in_shuffle = true;

        shuffle(this.letter_positions);
        for (let i = 0; i < this.letter_positions.length; i++) 
        {
            gsap.to(
                this.letter_buttons[i],
                {
                    pixi: {
                        x: this.letter_positions[i].x,
                        y: this.letter_positions[i].y
                    },
                    duration: 0.3,
                    onComplete: (() => {
                        if (i >= this.letter_positions.length - 1)
                        {
                            GameManager.Instance.in_shuffle = false;
                        }
                    }).bind(this)
                }
            );
        }
    }

    // Daire icerisine, letters objesinin icerisindeki harfleri butonlara donusturup ekleyen fonksiyon.
    // Vector2 sinifinin rotate fonksiyonu burda kullaniliyor.
    place_letters_to_circle()
    {
        const step_angle = 2 * Math.PI / this.letters.size;
        const up = new Vector2(0, 1);
        this.letters.forEach((letter) => {
            let vec = up.mul(85);
            this.letter_positions.push(vec);
            const letter_button = new LetterButton(letter, 40);

            letter_button.x = vec.x;
            letter_button.y = vec.y;
            letter_button.zIndex = 0;

            up.rotate(step_angle);

            this.letter_buttons.push(letter_button);
        });

        this.letter_buttons.forEach((letter_button) => {
            this.addChild(letter_button);
        });
    }

    // Beyaz daireyi olusturan ve ayarlayan fonksiyon.
    create_white_circle()
    {
        const letter_circle_sprite = Sprite.from("white-circle");
        const shuffle_sprite = Sprite.from("shuffle-logo");

        // Configure White Circle
        letter_circle_sprite.anchor.set(0.5);
        shuffle_sprite.anchor.set(0.5);

        letter_circle_sprite.width = 250;
        letter_circle_sprite.height = 250;

        shuffle_sprite.width = 50;
        shuffle_sprite.height = 50;

        letter_circle_sprite.alpha = 0.6;
        shuffle_sprite.alpha = 0.6;

        letter_circle_sprite.zIndex = -3;
        shuffle_sprite.zIndex = -2;

        shuffle_sprite.interactive = true;
        shuffle_sprite.onpointerdown = this.shuffle_letters.bind(this);

        this.addChild(letter_circle_sprite);
        this.addChild(shuffle_sprite);
    }

    // Kelime olustururken butonlar ve isaretci arasinda olusan cizgiyi konfigure eden fonksiyon.
    configure_line_between_word_creation_letters()
    {
        this.line_between_word_creation_letters.zIndex = -1;

        this.addChild(this.line_between_word_creation_letters);
    }

    start()
    {
        this.configure_line_between_word_creation_letters();
        this.create_white_circle();
        this.place_letters_to_circle();

        app.ticker.add(this.update.bind(this));
    }

    //#region UPDATE

    update(ticker: Ticker)
    {
        this.update_line_between_word_creation_letters();
    }

    // Kelime olustururken butonlar ve isaretci arasinda olusan cizgiyi her karede guncelleyen fonksiyon.
    update_line_between_word_creation_letters()
    {
        if (GameManager.Instance.word_creation_letters.length <= 0) 
        {
            this.line_between_word_creation_letters.clear();
            return;
        }

        this.line_between_word_creation_letters.clear();
        this.line_between_word_creation_letters.renderable = true;
        
        this.line_between_word_creation_letters.strokeStyle.width = 15;
        this.line_between_word_creation_letters.strokeStyle.color = 0xFF712F;

        const current_global_pos = this.toGlobal(new Point(0, 0));

        const global_pos = GameManager.Instance.word_creation_letters[0].toGlobal(new Point(0, 0));
        global_pos.x -= current_global_pos.x;
        global_pos.y -= current_global_pos.y;
        this.line_between_word_creation_letters.moveTo(global_pos.x, global_pos.y);

        for (let i = 1; i < GameManager.Instance.word_creation_letters.length; i++)
        {
            const global_pos = GameManager.Instance.word_creation_letters[i].toGlobal(new Point(0, 0));
            global_pos.x -= current_global_pos.x;
            global_pos.y -= current_global_pos.y;
            this.line_between_word_creation_letters.lineTo(global_pos.x, global_pos.y).stroke();
        }

        const local_poiner_loc = new Point(0, 0);
        local_poiner_loc.x = GameManager.Instance.pointer_location.x - current_global_pos.x;
        local_poiner_loc.y = GameManager.Instance.pointer_location.y - current_global_pos.y;

        this.line_between_word_creation_letters.lineTo(local_poiner_loc.x, local_poiner_loc.y).stroke();
    }

    //#endregion
}