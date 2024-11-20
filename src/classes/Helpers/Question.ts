import QuestionData from "../../types/QuestionData";

export default class Question
{
    question_data: QuestionData;
    
    letters: Array<string> = [];

    constructor(question_data: QuestionData)
    {
        this.question_data = question_data;

        let len = question_data.words.length;

        let letters_map: Map<string, number> = new Map();

        for (let i = 0; i < len; i++) 
        {
            const len = question_data.words[i].word.length;
            for (let j = 0; j < len; j++)
            {
                let letter = question_data.words[i].word[j];
                if (!letters_map.has(letter))
                {
                    letters_map.set(letter, 1);
                    continue;
                }

                if (letters_map.get(letter)! < this.count_of(question_data.words[i].word, letter))
                {
                    letters_map.set(letter, letters_map.get(letter)! + 1);
                }
            }
        }

        letters_map.forEach((value, key) => {
            for (const _ of Array(value)) this.letters.push(key);
        });
    }

    count_of(word: string, letter: string) : number
    {
        let count = 0;
        for (const lett of word.split(""))
        {
            if (letter == lett) count++;
        }
        return count;
    }
}