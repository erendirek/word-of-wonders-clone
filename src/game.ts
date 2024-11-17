import { Container, Sprite, Ticker } from "pixi.js";
import { app, GAME_HEIGHT, GAME_WIDTH } from "./main";
import { TweenMax } from "gsap";
import LetterCircle from "./classes/GameElements/LetterCircle";
import LetterGrid from "./classes/GameElements/LetterGrid";
import GameManager from "./classes/Managers/GameManager";
import LetterCreationBox from "./classes/GameElements/LetterCreationBox";
import GameEndPanel from "./classes/GameElements/GameEndPanel";

export default class Game extends Container
{
    // Kelime olusturulurken LetterCircle uzerinde olusan suanki yazi objesi.
    letter_box = new LetterCreationBox();

    // Kelime olusturmak icin kullanilan icerisinde harflerin bulundugu daire.
    letter_circle = new LetterCircle(GameManager.Instance.current_question);

    // Kelimelerin icerisine yerlestigi izgara yapisi.
    letter_grid = new LetterGrid(GameManager.Instance.current_question);

    constructor() 
    {
        super();

        this.start();
    }

    // Arkaplan icin bir sprite olusturur.
    set_background()
    {
        let bg = Sprite.from("background");
        bg.width = GAME_WIDTH;
        bg.height = GAME_HEIGHT;
        bg.zIndex = -100;
        this.addChild(bg);
    }

    // GameManager'daki OnPointerUp ve OnPointerMove eventlerini ayarlar.
    set_game_manager_event_listeners()
    {
        this.interactive = true;
        this.onpointerup = GameManager.Instance.onpointerup_event_listener.bind(GameManager.Instance);
        this.onpointermove = GameManager.Instance.onpointermove_event_listener.bind(GameManager.Instance);
    }

    // Olusturulan kelime yanlis ise oynatilan animasyon icin GameManager icerisindeki OnWordWrong eventine abone olur.
    subscribe_to_on_word_wrong_event()
    {
        GameManager.Instance.on_word_wrong.subscribe((() => {
            GameManager.Instance.in_word_creation = false;

            TweenMax.to(
                this.letter_box, 
                0.03,
                {
                    x: "+=5",
                    repeat: 6,
                    yoyo: true,
                }
            )
            TweenMax.to(
                this.letter_box, 
                0.03,
                {
                    x: "-=5",
                    repeat: 6,
                    yoyo: true,
                    onComplete: () => {
                        GameManager.Instance.clear_word_creation_letters();
                        this.letter_box.x = GAME_WIDTH / 2;
                    }
                }
            )

        }).bind(this))
    }

    // Oyun sonunda bitiris animasyonunun calismasi icin GameManager icerisindeki OnLevelEnd eventine abone olur.
    subscribe_to_game_end_event()
    {
        GameManager.Instance.on_level_end.subscribe((() => {
            this.play_game_end_animation(.2);
        }).bind(this));
    }

    // LetterCircle ve LetterGrid objelerininin konfigirasyonu
    configure_childrens()
    {
        this.letter_circle.x = GAME_WIDTH / 2;
        this.letter_circle.y = (GAME_HEIGHT * 3) / 4;
        this.letter_circle.zIndex = 1;

        this.letter_grid.x = GAME_WIDTH / 2;
        this.letter_grid.y = GAME_HEIGHT / 3.5;

        this.letter_box.x = GAME_WIDTH / 2;
        this.letter_box.y = (GAME_HEIGHT / 1.8);
        this.letter_box.zIndex = 2;

        this.addChild(this.letter_circle);
        this.addChild(this.letter_grid);
        this.addChild(this.letter_box);
    }

    start()
    {
        this.set_game_manager_event_listeners();
        this.subscribe_to_on_word_wrong_event();
        this.subscribe_to_game_end_event();
        this.set_background();
        this.configure_childrens();
        
        // Update fonksiyonunu uygulamanin genel update mekanizmasina ekler.
        app.ticker.add(this.update.bind(this));
    }

    //#region UPDATE

    // Olusturulan kelimenin LetterBox objesini olusturmak icin her karede kontrol yapar.
    check_word_creation_letters()
    {
        if (GameManager.Instance.word_creation_letters.length <= 0)
        {
            this.letter_box.clear_text();
            return;
        }

        let str = "";
        GameManager.Instance.word_creation_letters.forEach(v => str += v.letter);
        this.letter_box.update_text(str);
    }

    update(ticker: Ticker)
    {
        this.check_word_creation_letters();
    }

    //#endregion

    // Bolumun sonunda oynatilan animasyon.
    play_game_end_animation(duration: number)
    {
        this.letter_circle.scale_animation(duration);
        this.letter_grid.scale_animation(duration);
        setTimeout((() => {
            this.addChild(new GameEndPanel());
        }).bind(this), duration * 1050);
    }
}