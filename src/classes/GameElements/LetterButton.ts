import { Container, Graphics, Text } from "pixi.js";
import GameManager from "../Managers/GameManager";

// LetterCircle icerisindeki harflerin bulundugu butonlar.
export default class LetterButton extends Container
{
    letter: string; // Temsil ettigi harf.
    
    letter_text_element: Text; // Harfi ui'da gostermek icin olusturulan text objesi.
    letter_text_circle: Graphics; // Buton ile etkilesime girince arkasinda olusan yuvarlar arkaplan objesi.
    in_word_creation_mode = false; // Buton ile etkilesime girince deger true'ya esitlenir.

    constructor(letter: string, font: number) 
    {
        super();

        this.letter = letter;

        this.letter_text_element = new Text({
            text: this.letter,
            style: {
                fontFamily: "sniglet-regular",
                fontWeight: "bold",
                fill: 0xFF712F,
                fontSize: font
            }
        });

        this.letter_text_circle = new Graphics()
        .circle(0, 0, 30)
        .fill(0xFF712F);

        this.start();
    }

    // Isaretci eventlerini ayarlar.
    set_event_listeners()
    {
        this.interactive = true;
        this.onpointerdown = this.onpointerdown_event_listener.bind(this);
        this.onpointerenter = this.onpointerenter_event_listener.bind(this);
    }

    // letter_text_element ve letter_text_circle objelerini konfigure eder.
    configure_elements()
    {
        this.letter_text_circle.renderable = false;
        this.letter_text_circle.zIndex = -10;

        this.letter_text_element.anchor.set(.5);

        this.addChild(this.letter_text_element);
        this.addChild(this.letter_text_circle);
    }

    start()
    {
        this.configure_elements();
        this.set_event_listeners();
    }

    // Butona tiklama eventini kontrol eder.
    onpointerdown_event_listener()
    {
        if (GameManager.Instance.in_shuffle) return;
        if (this.in_word_creation_mode) return;
        
        GameManager.Instance.in_word_creation = true;
        GameManager.Instance.word_creation_letters.push(this);

        this.set_in_word_creation_mode(true);
    }

    // Isaretcinin butonun uzerinden gecme eventini kontrol eder.
    onpointerenter_event_listener()
    {
        if (GameManager.Instance.in_shuffle) return;
        if (!GameManager.Instance.in_word_creation) return;
        if (this.in_word_creation_mode) return;

        GameManager.Instance.in_word_creation = true;
        GameManager.Instance.word_creation_letters.push(this);

        this.set_in_word_creation_mode(true);
    }

    // Butonu kelime olusturma moduna sokar veya kelime olusturma modundan cikartir.
    set_in_word_creation_mode(mode: boolean)
    {
        if (mode)
        {
            this.letter_text_element.style.fill = 0xffffff;
            this.letter_text_circle.renderable = true;
            this.in_word_creation_mode = true;
        }
        else
        {
            this.letter_text_element.style.fill = 0xFF712F;
            this.letter_text_circle.renderable = false;
            this.in_word_creation_mode = false;
        }
    }
}