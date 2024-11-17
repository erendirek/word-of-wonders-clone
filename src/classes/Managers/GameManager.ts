import { FederatedPointerEvent, Graphics, Point, Ticker } from "pixi.js";
import { app } from "../../main";
import LetterButton from "../GameElements/LetterButton";
import Question from "../Helpers/Question";
import QUESTIONS from "../../constants/Questions";
import {Event, EventT} from "../Helpers/Event";
import { WordData } from "../../types/QuestionData";

// Oyunun genel durumunu yonetmek icin olusturulmus sinif.
export default class GameManager
{
    static Instance: GameManager;
    
    current_question: Question = QUESTIONS[0]; // Halihazirda oynanan soruyu barindiran Question objesi.

    // Oyun durumunu kontrol eden degiskenler
    in_shuffle: boolean = false; // LetterCircle harfleri karistirma islemi yaparken harfleri kullanmayi engeller.
    in_word_creation = false; // LetterCircle icerisinde bir kelime olustururken true degerine esitlenir.

    word_creation_letters: Array<LetterButton> = []; // Kelime olustururken harfleri sirasiyla tutan liste.

    words_found: Array<string> = []; // Bolum icerisinde bulunan kelimeleri bulunduran liste.

    pointer_location: Point = new Point(0, 0); // Isaretcinin oldugu konum.

    // Event'ler
    on_word_wrong: Event = new Event(); // Olusturulan kelime yanlis olunca cagirilan event.
    on_word_correct: EventT<WordData> = new EventT(); // Olusturulan kelime dogru olunca cagirilan event.
    on_level_end: Event = new Event(); // Bolum sona erdiginde cagirilan event.

    no_interact_timer: number = 0; // Oyuncu bos durdugu zaman artan sayac.

    constructor() 
    {
        GameManager.Instance = this;

        this.create_no_interact_timer();
    }

    static start_game_manager()
    {
        if (!GameManager.Instance)
            new GameManager();
    }

    // Oyuncu bos durdugu zamanlar artan bir sayac olusturur.
    create_no_interact_timer()
    {
        app.ticker.add(((ticker: Ticker) => {

            if (this.in_word_creation)
            {
                this.no_interact_timer = 0;
                return;
            }

            this.no_interact_timer += ticker.deltaMS / 1000;
            
        }).bind(this));
    }

    // Game objesi icerisinde olusturulan event listener'a atanan fonksiyon. Tiklama isleminin sonunda cagirilir.
    onpointerup_event_listener()
    {
        if (!this.in_word_creation) return;

        let created_text = "";
        this.word_creation_letters.forEach(letter => created_text += letter.letter)

        const word = this.current_question.question_data.words.find(word => word.word == created_text);
        if (word && this.words_found.indexOf(created_text) == -1)
        {
            this.words_found.push(word.word);
            this.on_word_correct.emit(word);
            this.clear_word_creation_letters();   
            this.check_game_end();
        }
        else
        {
            this.on_word_wrong.emit();
        }
    }

    // Oyunun bitme durumunu kontrol eder.
    check_game_end()
    {
        if (this.words_found.length >= this.current_question.question_data.words.length)
        {
            setTimeout(() => {
                this.on_level_end.emit();
            }, 1000);
        }
    }
    
    // Olusturulan kelimeyi temizler.
    clear_word_creation_letters()
    {
        this.word_creation_letters.forEach(letter => {
            letter.set_in_word_creation_mode(false);
        });

        this.word_creation_letters = [];
        this.in_word_creation = false;
    }

    // Game objesi icerisinde olusturulan event listener'a atanan fonksiyon. Isaretcinin harekeri islemi sirasinda surekli cagirilir.
    onpointermove_event_listener(event: FederatedPointerEvent)
    {
        this.pointer_location.copyFrom(event.global);
    }
}