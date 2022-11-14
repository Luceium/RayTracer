class Player {

    constructor (pos, fov, detail, size) {
        this.pos = pos;
        this.radius = size;

        this.heading = 0; // under 360
        this.fov = fov;
        this.detail = detail;
        this.remakeRays();
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

    show(walls, darkens2D) {
        fill(255);
        circle(this.pos.x, this.pos.y, this.radius);

        let scene = {distances: [], colors: []};
        for (let wall of walls) {
            wall.brightness = darkens2D ? 0 : 1;
            wall.hits = 0;
        }
        for (let ray of this.rays){
            let minPt = null;
            let mWall = null;
            let min = Infinity;
            for (let wall of walls){
                let pt = ray.cast(wall);
                if (!pt){
                    continue;
                }
                let d = pt.dist(this.pos);
                if (d < min) {
                    min = d;
                    minPt = pt;
                    mWall = wall;
                }
            }
            if (mWall) {
                strokeWeight(1);
                stroke(255, 0.2);
                line(this.pos.x, this.pos.y, minPt.x, minPt.y);
                mWall.brightness += darkens2D? min : 0;
                mWall.hits++;
            }
            scene.distances.push(min - this.radius);
            scene.colors.push(mWall ? mWall.color : color(0,0,0));
        }
        if (darkens2D) {
            for (let wall of walls) {
                wall.brightness = wall.hits == 0 ? 0 : wall.brightness / wall.hits;
            }
        }

        return scene;
    }
}