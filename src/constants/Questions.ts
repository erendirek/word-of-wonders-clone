import Question from "../classes/Question";
import Vector2 from "../classes/Vector2";

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
    })
]

export default QUESTIONS;
