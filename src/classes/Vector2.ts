export default class Vector2
{
    x: number;
    y: number;

    constructor(x: number, y: number) 
    {
        this.x = x;
        this.y = y;    
    }

    rotate(angle: number)
    {
        const temp_x = this.x;
        const temp_y = this.y;

        this.x = (temp_x * Math.cos(angle)) - (temp_y * Math.sin(angle));
        this.y = (temp_x * Math.sin(angle)) + (temp_y * Math.cos(angle));
    }

    mul(other: number) : Vector2
    {
        return new Vector2(this.x * other, this.y * other);
    }

    print()
    {
        console.log("X : " + this.x + "\nY : " + this.y);
    }
}