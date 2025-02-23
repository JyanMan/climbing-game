export class Ground {
    constructor(x, y, width, height) {
        this.pos = new Vector2D(x, y);
        this.width = width;
        this.height = height;
        this.type = "ground";
    }
}