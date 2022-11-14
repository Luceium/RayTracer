class Player {

    constructor (pos, fov, detail, size) {
        this.pos = pos;
        this.radius = size;

        this.heading = 0; // under 360
        this.fov = fov;
        this.detail = detail;
        this.remakeRays();
        console.log(this.rays.length);
    }

    remakeRays(){
        this.rays = [];
        for (let a = this.heading - this.fov/2; a < this.heading + this.fov/2; a += this.fov/this.detail) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    update(pos) {
        this.pos.set(pos);
    }

    updateDetails(detail){
        this.detail = detail;

        this.remakeRays();
    }

    updateFov(fov){
        this.fov = fov;

        this.remakeRays();
    }

    updateSize(size) {
        this.radius = size;
    }

    rotate(angle) {
        this.heading += angle;
        // this.heading %= 360;

        this.remakeRays();
    }

    move(mag){
        const vel = p5.Vector.fromAngle(radians(this.heading));
        vel.setMag(mag);
        this.pos.add(vel);
    }

    show(walls) {
        fill(255);
        circle(this.pos.x, this.pos.y, this.radius);

        let scene = {distances: [], colors: []};
        for (let ray of this.rays){
            let minPt = null;
            let col = color(0,0,0);
            let min = Infinity;
            for (let wall of walls){
                let pt = ray.cast(wall);
                if (!pt){
                    continue;
                }
                let d = pt.dist(this.pos);
                const a = ray.dir.heading() - radians(this.heading);
                d *= cos(a);
                if (d < min) {
                    min = d;
                    minPt = pt;
                    col = wall.color;
                }
            }
            if (minPt) {
                strokeWeight(1);
                stroke(255, 0.2);
                line(this.pos.x, this.pos.y, minPt.x, minPt.y);
            }
            scene.distances.push(min - this.radius);
            scene.colors.push(col);
        }

        return scene;
    }
}