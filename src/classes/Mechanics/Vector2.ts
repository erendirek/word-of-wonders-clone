// 2 boyutlu bir vektor. Icerisindeki rotate fonksiyonu kullaniliyor.
export default class Vector2
{
    x: number;
    y: number;

    constructor(x: number, y: number) 
    {
        this.x = x;
        this.y = y;    
    }

    // verilen aciya gore (radyan) vektoru donduren fonksiyon.
    rotate(angle: number)
    {
        const temp_x = this.x;
        const temp_y = this.y;

        this.x = (temp_x * Math.cos(angle)) - (temp_y * Math.sin(angle));
        this.y = (temp_x * Math.sin(angle)) + (temp_y * Math.cos(angle));
    }

    // verilen degerle vektoru scalar carpan fonksiyon.
    mul(other: number) : Vector2
    {
        return new Vector2(this.x * other, this.y * other);
    }

    // verilen degerle vektoru toplayan fonksiyon.
    add(other: Vector2) : Vector2
    {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    // vektoru yazdiran fonksiyon.
    print()
    {
        console.log("X : " + this.x + "\nY : " + this.y);
    }
}