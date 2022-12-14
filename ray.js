class Ray {
    constructor(pos, dir){
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(dir);
    }

    setAngle(angle) {
        this.dir = p5.Vector.fromAngle(angle);
    }

    cast(wall) {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denom == 0) {return;}
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
        if (t <= 0 || t >= 1) {return;}
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
        if (u <= 0) {return;}

        let pt = createVector();
        pt.x = x1 + t * (x2 - x1);
        pt.y = y1 + t * (y2 - y1);

        // circle(pt.x, pt.y, 10);
        return pt;
    }
}