import Vector2 from "../classes/Mechanics/Vector2";

export default interface QuestionData 
{
    episodeTileMapSize: Vector2;
    words: Array<WordData>
}

export interface WordData
{
    word: string;
    direction: "horizontal" | "vertical";
    first_letter_location: Vector2;
}