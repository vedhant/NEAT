const NO_OF_CHECKPOINTS = 20;

class Track {
    constructor(min_radius, max_radius, points_density, noiseIntensity, trackWidth) {
        this.points = [];
        this.innerPoints = [];
        this.outerPoints = [];
        noiseSeed(Date.now() % 100);
        for(let i=0; i<TWO_PI; i += points_density) {
            let xoff = map(cos(i), -1, 1, 0, noiseIntensity);
            let yoff = map(sin(i), -1, 1, 0, noiseIntensity);
            let rx = map(noise(xoff, yoff), 0, 1, min_radius.x, max_radius.x);
            let ry = map(noise(xoff, yoff), 0, 1, min_radius.y, max_radius.y);
            this.points.push(createVector(rx * cos(i), ry * sin(i)));
            this.innerPoints.push(createVector((rx - trackWidth / 2) * cos(i), (ry - trackWidth / 2) * sin(i)));
            this.outerPoints.push(createVector((rx + trackWidth / 2) * cos(i), (ry + trackWidth / 2) * sin(i)));
        }

        this.trackWidth = trackWidth;

        this.checkpoints = [];
        for(let i=0; i<NO_OF_CHECKPOINTS; ++i) {
            this.checkpoints.push(this.getCheckpointIndex(i));
        }
    }

    getStartingPosition() {
        let rand = map(random(), 0, 1, 0.2, 0.8);
        let startLineVec = p5.Vector.sub(this.outerPoints[0], this.innerPoints[0]);
        let startPos = p5.Vector.add(this.innerPoints[0], p5.Vector.mult(startLineVec, rand));
        return startPos;
    }

    getStartingOrientation() {
        return createVector(1, 0).angleBetween(p5.Vector.sub(this.points[1], this.points[0]));
    }

    getCheckpointIndex(n) {
        let index = floor((this.points.length / NO_OF_CHECKPOINTS) * n);
        return index;
    }

    draw() {
        push();
        noFill();
        beginShape();
        let sx = 0, sy = 0;
        for(let i=0; i<this.innerPoints.length; ++i) {
            stroke('blue');
            strokeWeight(this.trackWidth / 20);
            vertex(this.innerPoints[i].x, this.innerPoints[i].y);
            // let next = (i + 1) % this.innerPoints.length;
            // push();
            // let vec = p5.Vector.sub(this.innerPoints[next], this.innerPoints[i]);
            // let angle = vec.heading();
            // translate(this.innerPoints[i].x, this.innerPoints[i].y);
            // rotate(angle);
            // let sw = vec.mag();
            // let dh = this.trackWidth / 8;
            // image(roadSideImage, 0, 0, vec.mag(), dh, sx, sy, sw);
            // sx = (sx + sw) % roadSideImage.width;
            // // line(0, 0, vec.mag(), 0);
            // pop();
        }
        endShape(CLOSE);
        beginShape();
        for(let i=0; i<this.outerPoints.length; ++i) {
            stroke('blue');
            strokeWeight(this.trackWidth / 20);
            vertex(this.outerPoints[i].x, this.outerPoints[i].y);
        }
        endShape(CLOSE);
        // for(let i=0; i<this.points.length; ++i) {
        //     // TODO: report p5 that point(createVector) is not working
        //     stroke('purple');
        //     strokeWeight(7);
        //     point(this.points[i].x, this.points[i].y);
        // }
        stroke('purple');
        strokeWeight(5);
        line(this.outerPoints[0].x, this.outerPoints[0].y, this.innerPoints[0].x, this.innerPoints[0].y);

        strokeWeight(2);
        for(let i=0; i<NO_OF_CHECKPOINTS; ++i) {
            let index = this.checkpoints[i];
            line(this.outerPoints[index].x, this.outerPoints[index].y, this.innerPoints[index].x, this.innerPoints[index].y);
        }
        pop();
    }
};