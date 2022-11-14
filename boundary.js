class Boundary {
    constructor(a, b, color){
        this.a = a;
        this.b = b;
        this.color = color;
        this.brightness = 1;
        this.hits = 0;
    }

    show(darkens2D, renderDistance) {
        strokeWeight(3);
        let b;
        if (darkens2D){
            b = this.brightness == 0 ? 0 : map(this.brightness, 0, renderDistance, 1, 0);
        }
        this.color.setAlpha(darkens2D ? b : this.brightness);
        stroke(this.color);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}