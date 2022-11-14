class Boundary {
    constructor(a, b, color){
        this.a = a;
        this.b = b;
        this.color = color;
    }

    show() {
        strokeWeight(3);
        this.color.setAlpha(1);
        stroke(this.color);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}