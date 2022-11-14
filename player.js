class Player {
    constructor (pos) {
        this.pos = pos;
        this.rays = [];
        for (let a = 0; a < 360; a+= 1) {
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
            let minPt = null;
            let min = Infinity;
            for (let wall of walls){
                let pt = ray.cast(wall);
                if (!pt){
                    continue;
                }
                const d = pt.dist(this.pos);
                if (d < min) {
                    min = d;
                    minPt = pt;
                }
            }
            if (minPt) {
                stroke(255, 50);
                line(this.pos.x, this.pos.y, minPt.x, minPt.y);
            }
        }
    }
}