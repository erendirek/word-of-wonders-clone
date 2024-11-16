import Question from "../classes/Mechanics/Question";
import Vector2 from "../classes/Mechanics/Vector2";

// Icerisinde bolumleri (sorulari) bulunduran sabit liste.
const QUESTIONS: Array<Question> = [
    new Question({
        episodeTileMapSize: new Vector2(4, 3),
        words: [
            {
                word: "GOLD",
                direction: "horizontal",
                first_letter_location: new Vector2(0, 0)
            },
            {
                word: "GOD",
                direction: "vertical",
                first_letter_location: new Vector2(0,0)
            },
            {
                word: "DOG",
                direction: "horizontal",
                first_letter_location: new Vector2(0,2)
            },
            {
                word: "LOG",
                direction: "vertical",
                first_letter_location: new Vector2(2,0)
            }
        ]
    }),
    new Question({
        episodeTileMapSize: new Vector2(6,4),
        words: [
            {
                word: "YES",
                direction: "horizontal",
                first_letter_location: new Vector2(1,0)
            },
            {
                word: "EASY",
                direction: "vertical",
                first_letter_location: new Vector2(2,0)
            },
            {
                word: "SAY",
                direction: "horizontal",
                first_letter_location: new Vector2(0,3)
            },
            {
                word: "SEA",
                direction: "horizontal",
                first_letter_location: new Vector2(2,2)
            }
        ]
    })
]

export default QUESTIONS;
