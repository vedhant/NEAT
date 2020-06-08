let canvasWidth = window.innerWidth * 0.99;
let canvasHeight = window.innerHeight * 0.96;

let track;
let cars = [];
let deadCars = [];

let highestFitness = 0;

let fastForward;

let grassImage;
let roadSideImage;

// TODO: normalize inputs
const SENSOR_LIMIT = canvasWidth / 10;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    rectMode(CENTER);
    nextGeneration();
    fastForward = createSlider(1, 50, 1);
}

function preload() {
    grassImage = loadImage('./images/grass.png');
    roadSideImage = loadImage('./images/road_side.png');
}

function draw() {
    for(let i=0; i<fastForward.value(); ++i) {
        if(cars.length == 0) {
            eval.evaluate();
            nextGeneration();
        }
        for(let i=0; i<cars.length; ++i) {
            cars[i].move();
            cars[i].updateSensors(track);
            cars[i].detectCheckpoints(track);
        }
        for(let i=cars.length - 1; i>=0; --i) {
            if(cars[i].detectCollision(track) || cars[i].timeFromLastCheck > TTL || cars[i].checkpointsCrossed >= 10 * NO_OF_CHECKPOINTS) {
                deadCars.push(cars[i]);
                cars.splice(i, 1);
            }
        }
    }
    
    // drawing part
    background(220);
    // let backgroundShrink = 3;
    // for(let i=0; i<(canvasWidth / grassImage.width) * backgroundShrink; ++i) {
    //     for(let j=0; j<(canvasHeight / grassImage.height) * backgroundShrink; ++j) {
    //         image(grassImage, i * grassImage.width / backgroundShrink, j * grassImage.height / backgroundShrink, grassImage.width / backgroundShrink, grassImage.height / backgroundShrink);
    //     }
    // }
    push();
    translate(canvasWidth / 2, canvasHeight / 2);
    track.draw();
    for(let i=0; i<cars.length; ++i)
        cars[i].draw();
    pop();
    showStats();
}

let connectionInnovation = new InnovationGenerator();
let nodeInnovation = new InnovationGenerator();

let genome = new Genome();
genome.getInitialTopology(6, 4, connectionInnovation, nodeInnovation);

class Test extends Evaluator {
    evaluateGenome(genome) {
        let cars = deadCars.find(d => d.id === genome.id);
        return cars.getFitness();
    }
};

let eval = new Test(genome, connectionInnovation, nodeInnovation);

function nextGeneration() {
    deadCars.splice(0, deadCars.length);
    cars.splice(0, cars.length);
    track = new Track(createVector(canvasWidth * 0.2, canvasHeight * 0.2), createVector(canvasWidth * 0.5, canvasHeight * 0.5), 0.01, 2, 120);

    for(let i=0; i<eval.populationSize; ++i) {
        let genome = eval.genomes.find(g => g.id === i);
        let net = new FeedForwardNetwork(genome);
        cars.push(new Car(i, track.getStartingPosition(), 10, 20, track.getStartingOrientation(), PI / 16, net, genome.species));
    }

    console.log(eval.fittestGenome);
}

function showStats() {
    let fitness = Math.max(...cars.map(b => b.getFitness()));
    highestFitness = Math.max(fitness, highestFitness, eval.highestScore);
    fill(50);
    textSize(16);
    text('Generation : ' + eval.generation, canvasWidth * 0.9, canvasHeight * 0.05);
    text('fitness : ' + fitness, canvasWidth * 0.9, canvasHeight * 0.07);
    text('previous fitness : ' + eval.highestScore, canvasWidth * 0.9, canvasHeight * 0.09);
    text('highest fitness : ' + highestFitness, canvasWidth * 0.9, canvasHeight * 0.11);
    text('no of species : ' + eval.species.length, canvasWidth * 0.9, canvasHeight * 0.13);
    text('cars alive : ' + cars.length, canvasWidth * 0.9, canvasHeight * 0.15);
}

let pause = false;
function keyPressed() {
    if(key != ' ')
        return;
    if(pause)
        noLoop();
    else
        loop();
    pause = !pause;
}

