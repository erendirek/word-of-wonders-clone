import { Container, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../../main";
import Question from "../Mechanics/Question";
import Vector2 from "../Mechanics/Vector2";
import GameManager from "../Managers/GameManager";
import LetterBlock from "./LetterBlock";
import { WordData } from "../../types/QuestionData";
import { gsap } from "gsap";

// Kelimelerin icerisine yerlestigi izgara yapisi.
export default class LetterGrid extends Container
{
    question: Question; // Soru objesi

    grid_width: number; // Yapinin genel genisligi
    tile_size: number; // Yapidaki her bir blogun dis boyutu
    inner_tile_size: number; // Yapidaki her bir blogun ic boyutu

    constructor(question: Question) 
    {
        super();
        
        this.question = question;

        this.grid_width = GAME_WIDTH * 0.8;
        this.tile_size = this.grid_width / this.question.question_data.episodeTileMapSize.x;
        this.inner_tile_size = this.tile_size * 0.9;

        this.start();
    }

    // Olusturulan kelime dogruysa olusan animasyonu oynatmak icin GameManager uzerindeki OnWordCorrent eventine abone olur.
    subscribe_to_on_word_correct_event()
    {
        GameManager.Instance.on_word_correct.subscribe(((word: WordData) => {
            let letter_location = word.first_letter_location;
            for (let i = 0; i < word.word.length; i++)
            {
                const letter_block = new LetterBlock(word.word[i], this.inner_tile_size / 2, this.inner_tile_size);

                letter_block.x = (this.grid_width / 2) - (letter_block.width / 2)
                letter_block.y = (GAME_HEIGHT / 2.5)
                letter_block.zIndex = 10;

                gsap.to(
                    letter_block,
                    {
                        pixi: {
                            x: letter_location.x * this.tile_size,
                            y: letter_location.y * this.tile_size
                        },
                        duration: .8,
                        onComplete: () => {
                            letter_block.on_mount();
                        }
                    }
                );

                letter_location = letter_location.add(word.direction == "horizontal" ? new Vector2(1, 0) : new Vector2(0, 1));
                this.addChild(letter_block);
            }
        }).bind(this));
    }

    // Obje ilk olusturuldugunda harflerin oturacagi beyaz kutulari yerlerine koymak icin birtakim matematiksel islem yapar.
    place_tiles()
    {
        for (let i = 0; i < this.question.question_data.words.length; i++)
        {
            const word_data = this.question.question_data.words[i];
            let loc = word_data.first_letter_location.mul(this.tile_size);

            for (let j = 0; j < word_data.word.length; j++)
            {
                const tile = Sprite.from("white-tile");

                tile.x = loc.x;
                tile.y = loc.y;
                tile.width = this.inner_tile_size;
                tile.height = this.inner_tile_size;

                if (word_data.direction == "horizontal")
                    loc = loc.add(new Vector2(this.tile_size, 0));
                else
                    loc = loc.add(new Vector2(0, this.tile_size));

                this.addChild(tile);
            }
        }
    }

    // Objenin pivot noktasini ortasina alir.
    set_pivot()
    {
        const bounds = this.getBounds();
        this.pivot.set(bounds.width / 2, bounds.height / 2);
    }

    start()
    {
        this.subscribe_to_on_word_correct_event();
        this.place_tiles();
        this.set_pivot();
    }
}