class Player {
    constructor (pos) {
        this.pos = pos;
        this.rays = [];
        for (let a = 0; a < 360; a+= 10) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
        this.radius = 10;
    }

    update(pos) {
        this.pos.set(pos);
    }

    show(walls) {
        fill(255);
        circle(this.pos.x, this.pos.y, this.radius);
        for (let ray of this.rays){
            for (let wall of walls){
                let pt = ray.cast(wall);
                if (pt) {
                    line(this.pos.x, this.pos.y, pt.x, pt.y);
                }
            }
        }
    }
}