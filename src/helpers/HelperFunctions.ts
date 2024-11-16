
// Verilen listeyi rastgele karistiran fonksiyon.
export function shuffle(list: Array<any>)
{
    for (let i = 0; i < list.length; i++) 
    {
        let j = Math.floor(Math.random() * (list.length));
        [list[i], list[j]] = [list[j], list[i]];
    }
}