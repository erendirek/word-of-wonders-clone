import Vector2 from "../classes/Vector2";

export default interface EpisodeData 
{
    episodeTileMapSize: Vector2;

    words: Array<{
        word: string,
        direction: "horizontal" | "vertical",
        first_letter_location: Vector2
    }>
}