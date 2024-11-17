import QuestionData from "../../types/QuestionData";

export default class Question
{
    question_data: QuestionData;
    
    letters: Set<string> = new Set();

    constructor(question_data: QuestionData)
    {
        this.question_data = question_data;

        let len = question_data.words.length;

        for (let i = 0; i < len; i++) 
        {
            question_data.words[i].word.split("").forEach(letter => this.letters.add(letter))
        }
    }
}