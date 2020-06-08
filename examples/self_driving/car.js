const SLIP_SPEED = 5;
const TRACTION_FAST = 0.1;
const TRACTION_SLOW = 0.7;
const FRICTION = -0.01;
const DRAG = -0.001;
const TTL = 200;

class Car {
    constructor(id, startPosition, width, height, heading, maxSteeringAngle, net, species) {
        this.id = id;

        this.position = startPosition.copy();
        this.width = width;
        this.height = height;
        this.heading = heading;
        this.wheelBase = width * 0.8;
        this.maxSteeringAngle = maxSteeringAngle;
        this.steerAngle = 0;
        this.speed = 0;
        this.enginePower = 0.1;
        this.acceleration = 0;
        this.brakingPower = -0.05;
        this.maxReverseSpeed = this.brakingPower * 30;

        this.sensors = [];
        this.no_of_sensors = 5;
        for(let i=0; i<this.no_of_sensors; ++i) {
            let offset = map(i, 0, this.no_of_sensors - 1, -HALF_PI, HALF_PI);
            this.sensors.push(new Sensor(this.position.copy(), p5.Vector.fromAngle(this.heading + offset)));
        }

        this.lastCheckpoint = 0;
        this.checkpointsCrossed = 0;
        this.timeFromLastCheck = 0;
        this.timeAlive = 0;

        this.net = net;

        this.species = species;
    }

    move() {
        this.acceleration = 0;
        this.getInputs();
        this.applyFriction();
        this.speed += this.acceleration;
        if(this.speed < 0)
            this.speed = max(this.speed, this.maxReverseSpeed);
        this.calculateSteering();
        this.goForward();
        ++this.timeFromLastCheck;
        ++this.timeAlive;
    }

    getInputs() {
        let inputs = [this.speed / SLIP_SPEED];
        for(let i=0; i<this.no_of_sensors; ++i) {
            inputs.push(this.sensors[i].length / SENSOR_LIMIT);
        }
        let outputs = this.net.feed(inputs);
        let turn = 0;
        if(outputs[0] > 0.5)
            turn -= 1;
        if(outputs[1] > 0.5)
            turn += 1;
        this.steerAngle = turn * this.maxSteeringAngle;
        if(outputs[2] > 0.5)
            this.acceleration = this.enginePower;
        if(outputs[3] > 0.5)
            this.acceleration = this.brakingPower;
    }

    calculateSteering() {
        let offset = createVector(cos(this.heading), sin(this.heading));
        offset.mult(this.wheelBase / 2);
        let frontWheel = p5.Vector.add(this.position, offset);
        let backWheel = p5.Vector.sub(this.position, offset);
        backWheel = p5.Vector.add(backWheel, createVector(cos(this.heading), sin(this.heading)).mult(this.speed));
        frontWheel = p5.Vector.add(frontWheel, createVector(cos(this.heading + this.steerAngle), sin(this.heading + this.steerAngle)).mult(this.speed));
        let newHeading = atan2(frontWheel.y - backWheel.y, frontWheel.x - backWheel.x);
        let traction = TRACTION_SLOW;
        if(this.speed > SLIP_SPEED)
            traction = TRACTION_FAST;
        if(this.speed > 0) {
            let shortestAngle = (newHeading - this.heading) % TWO_PI;
            shortestAngle = 2 * shortestAngle % TWO_PI - shortestAngle;
            newHeading = this.heading + shortestAngle * traction;
        }
        this.heading = newHeading;
    }
    
    goForward() {
        this.position = p5.Vector.add(this.position, createVector(cos(this.heading), sin(this.heading)).mult(this.speed));
    }

    applyFriction() {
        let frictionForce = this.speed * FRICTION;
        let dragForce = this.speed * this.speed * DRAG;
        this.acceleration += frictionForce + dragForce;
    }

    updateSensors(track) {
        for(let i=0; i<this.no_of_sensors; ++i) {
            this.sensors[i].origin = this.position.copy();
            let offset = map(i, 0, this.no_of_sensors - 1, -HALF_PI, HALF_PI);
            this.sensors[i].direction = p5.Vector.fromAngle(this.heading + offset);
            let minDist = Infinity;
            for(let j=0; j<track.outerPoints.length; ++j) {
                let wall = {
                    a: track.outerPoints[j].copy(),
                    b: track.outerPoints[(j + 1) % track.outerPoints.length].copy()
                };
                let dist = this.sensors[i].see(wall);
                if(dist < minDist) {
                    minDist = dist;
                }
            }
            for(let j=0; j<track.innerPoints.length; ++j) {
                let wall = {
                    a: track.innerPoints[j].copy(),
                    b: track.innerPoints[(j + 1) % track.innerPoints.length].copy()
                };
                let dist = this.sensors[i].see(wall);
                if(dist < minDist) {
                    minDist = dist;
                }
            }            
            this.sensors[i].setLength(minDist);
        }
    }

    getCorners() {
        let headDir = p5.Vector.fromAngle(this.heading);
        let a = sqrt(1 / (1 + pow(headDir.x / headDir.y, 2)));
        let b = - a * headDir.x / headDir.y;
        let forward = p5.Vector.mult(headDir, this.height / 2);
        let left = p5.Vector.mult(createVector(a, b), -this.width / 2);
        let fl = p5.Vector.add(this.position, forward).add(left);
        let fr = p5.Vector.add(this.position, forward).sub(left);
        let bl = p5.Vector.sub(this.position, forward).add(left);
        let br = p5.Vector.sub(this.position, forward).sub(left);
        return [fl, fr, bl, br];
    }

    detectCollision(track) {
        let rectangle = this.getCorners();
        for(let i=0; i<track.outerPoints.length; ++i) {
            let wall = {
                a: track.outerPoints[i].copy(),
                b: track.outerPoints[(i + 1) % track.outerPoints.length].copy()
            };
            if(collideLinePoly(wall.a.x, wall.a.y, wall.b.x, wall.b.y, rectangle)) {
                return true;
            }
        }
        for(let i=0; i<track.innerPoints.length; ++i) {
            let wall = {
                a: track.innerPoints[i].copy(),
                b: track.innerPoints[(i + 1) % track.innerPoints.length].copy()
            };
            if(collideLinePoly(wall.a.x, wall.a.y, wall.b.x, wall.b.y, rectangle)) {
                return true;
            }
        }

        return false;
    }

    detectCheckpoints(track) {
        let rectangle = this.getCorners();
        let i = (this.lastCheckpoint + 1) % track.checkpoints.length;
        let wall = {
            a: track.innerPoints[track.checkpoints[i]].copy(),
            b: track.outerPoints[track.checkpoints[i]].copy()
        };
        if(collideLinePoly(wall.a.x, wall.a.y, wall.b.x, wall.b.y, rectangle)) {
            this.lastCheckpoint = i;
            this.checkpointsCrossed++;
            this.timeFromLastCheck = 0;
        }
    }

    getFitness() {
        let fitness = this.checkpointsCrossed + pow(this.checkpointsCrossed * TTL / this.timeAlive, 2);
        return fitness;
    }

    draw() {
        for(let i=0; i<this.no_of_sensors; ++i) {
            this.sensors[i].draw();
        }
        push();
        fill(colorArray[this.species]);
        noStroke();
        translate(this.position.x, this.position.y);
        rotate(this.heading);
        rect(0, 0, this.height, this.width);
        pop();
    }
};

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];