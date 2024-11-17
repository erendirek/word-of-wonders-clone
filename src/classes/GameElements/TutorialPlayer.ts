import { Container, Sprite } from "pixi.js";
import LetterButton from "./LetterButton";
import GameManager from "../Managers/GameManager";
import { WordData } from "../../types/QuestionData";
import { gsap } from "gsap";
import { app } from "../../main";

export default class TutorialPlayer extends Container
{
    letter_buttons: Array<LetterButton>; // LetterCircle icerisindeki butonlarin listesi.
    hand_sprite: Sprite = Sprite.from("tutorial-hand"); // Ipucu gosteren elin objesi.

    constructor(letter_buttons: Array<LetterButton>) 
    {
        super();

        this.letter_buttons = letter_buttons;

        this.start();
    }

    // Ipucu gosteren el objesinin konfigurasyonu
    configure_hand_sprite()
    {
        this.hand_sprite.renderable = false;
        this.addChild(this.hand_sprite);
    }   

    start()
    {
        this.configure_hand_sprite();

        app.ticker.add(() => this.update());
    }

    //#region UPDATE

    // GameManager icererisindeki no_interaction_timer degiskeninin degerine gore Ipucunu etkinlestirir.
    no_interact_timer_check()
    {
        if (GameManager.Instance.no_interact_timer >= 1 && Math.floor(GameManager.Instance.no_interact_timer) % 7 == 0)
        {
            this.enable_tutorial_player();
        }
    }

    update()
    {
        this.no_interact_timer_check()
    }
    
    //#endregion

    // Ipucu gosteren eli ani olarak devre disi birakir.
    force_disable_tutorial_player()
    {
        this.hand_sprite.renderable = false;
    }

    // Ipucu gosteren eli animasyon ile devre disi birakir.
    disable_tutorial_player()
    {
        gsap.to(
            this.hand_sprite,
            {
                pixi: {
                    alpha: 0,
                    scale: 0.2
                },
                duration: .7,
                onComplete: (()=>{
                    this.hand_sprite.renderable = false;
                }).bind(this)
            }
        );
    }

    // Ipucu gosteren eli aktif eder.
    enable_tutorial_player()
    {
        this.hand_sprite.renderable = true;
        this.hand_sprite.alpha = 0;
        this.hand_sprite.scale = 0.2;

        for (let i = 0; i < GameManager.Instance.current_question.question_data.words.length; i++) 
        {
            const word_data = GameManager.Instance.current_question.question_data.words[i];
            if (GameManager.Instance.words_found.indexOf(word_data.word) == -1)
            {
                const letter_button = this.letter_buttons.find(letter_button => letter_button.letter == word_data.word[0]);
                if (!letter_button) return;

                this.hand_sprite.x = letter_button.x
                this.hand_sprite.y = letter_button.y;

                gsap.to(
                    this.hand_sprite,
                    {
                        pixi: {
                            alpha: 0.9,
                            scale: 0.3
                        },
                        duration: 1,
                        onComplete: (() => {
                            this.move_hand_to_location(word_data.word.slice(1));
                        }).bind(this)
                    }
                );
                
                break;
            }
        }
    }

    // Fonksiyona girilen kelimenin ilk harfini LetterCircle icerisinde bularak Ipucu gosteren eli oraya yonlendirir ve recursive olarak islem bitene kadar gerceklestirir.
    move_hand_to_location(word: string)
    {
        if (word.length <= 0) 
        {   
            this.disable_tutorial_player();
            return;
        }

        const letter_button = this.letter_buttons.find(letter_button => letter_button.letter == word[0]);
        if (!letter_button) return;

        gsap.to(
            this.hand_sprite,
            {
                pixi: {
                    x: letter_button.x,
                    y: letter_button.y,
                },
                duration: 1,

                onUpdate: (() => {
                    if (GameManager.Instance.in_word_creation)
                    {
                        this.force_disable_tutorial_player();
                    }
                }).bind(this),

                onComplete: (() => {
                    this.move_hand_to_location(word.slice(1));
                }).bind(this)
            }
        );
    }
}