class Sensor {
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
        this.limit = SENSOR_LIMIT;
        this.length = this.limit;
    }

    see(wall) {
        let x1 = wall.a.x;
        let y1 = wall.a.y;
        let x2 = wall.b.x;
        let y2 = wall.b.y;

        let x3 = this.origin.x;
        let y3 = this.origin.y;
        let x4 = this.origin.x + this.direction.x;
        let y4 = this.origin.y + this.direction.y;

        let denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        length = this.limit;
        if(denom === 0) {
            return length;
        }

        let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
        let u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
        if(t > 0 && t < 1 && u > 0) {
            let intersection = createVector(0, 0);
            intersection.x = x1 + t * (x2 - x1);
            intersection.y = y1 + t * (y2 - y1);
            length = p5.Vector.sub(intersection, this.origin).mag();
        }

        return length;
    }

    setLength(length) {
        this.length = length < this.limit ? length : this.limit;
    }

    draw() {
        stroke(255);
        push();
        translate(this.origin.x, this.origin.y);
        line(0, 0, this.direction.x * this.length, this.direction.y * this.length);
        pop();
    }
};