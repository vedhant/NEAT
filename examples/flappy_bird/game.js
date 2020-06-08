let canvasWidth = window.innerWidth * 0.99;
let canvasHeight = window.innerHeight * 0.9;
let gravity = 0.7;
let distanceBetweenPipes = canvasWidth / 2.5;

let pipes = [];
let birds = [];
let deadBirds = [];

let fastForward;

let highestFitness = 0;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    rectMode(CENTER);
    nextGeneration();
    fastForward = createSlider(1, 50, 1);
}

function draw() {
    for(let i=0; i<fastForward.value(); ++i) {
        if(birds.length == 0) {
            eval.evaluate();
            nextGeneration();
        }
        
        if(canvasWidth - pipes[pipes.length - 1].x - pipes[pipes.length - 1].width / 2 >= distanceBetweenPipes)
            pipes.push(new Pipe(canvasWidth));
        for(let i=pipes.length - 1; i>=0; --i) {
            if(pipes[i].x + pipes[i].width < 0) {
                pipes.splice(i, 1);
                continue;
            }
            pipes[i].update();
        }
        for(let i=birds.length - 1; i>=0; --i) {
            if(birds[i].checkDeath()) {
                deadBirds.push(birds[i]);
                birds.splice(i, 1);
            }
        }
    
        for(let i=0; i<birds.length; ++i) {
            birds[i].update();
        }
    }
    
    // drawing part
    background(220);
    for(let i=0; i<birds.length; ++i) {
        birds[i].show();
    }
    for(let i=pipes.length - 1; i>=0; --i) {
        pipes[i].show();
    }
    showStats();

}

class Bird {
    constructor(id, y, net, species) {
        this.id = id;
        this.y = y;
        this.velocity = 0;
        this.x = canvasWidth * 0.1;
        this.jumpVelocity = -9;
        this.radius = canvasWidth / 40;
        this.net = net;
        this.species = species;
        this.score = 0;
    }
    
    update() {
        let closestPipe;
        for(let i=0; i<pipes.length; ++i) {
            if(pipes[i].x > this.x) {
                closestPipe = pipes[i];
                break;
            }
        }
        let inputs = [this.y / canvasHeight, this.velocity / sqrt(2 * gravity * canvasHeight), (closestPipe.x - this.x) / canvasWidth, closestPipe.gapTop / canvasHeight, closestPipe.gapBottom / canvasHeight];
        let output = this.net.feed(inputs);
        if(output[0] > 0.5) {
            this.jump();
        }
        this.y += this.velocity;
        this.velocity += gravity;
        ++this.score;
    }

    show() {
        fill(colorArray[this.species]);
        circle(this.x, this.y, this.radius);
    }

    jump() {
        if(this.velocity >= 0)
            this.velocity = this.jumpVelocity;
    }

    checkDeath() {
        if(this.y > canvasHeight || this.y < 0)
            return true;
        for(let i=0; i<pipes.length; ++i) {
            if(this.x + this.radius >= pipes[i].x - pipes[i].width / 2 && this.x - this.radius <= pipes[i].x + pipes[i].width / 2) {
                if(this.y - this.radius <= pipes[i].gapTop || this.y + this.radius >= pipes[i].gapBottom)
                    return true;
            }
        }
        return false;
    }
};

class Pipe {
    constructor(x) {
        this.x = x;
        this.velocity = -11;
        this.gapHeight = canvasHeight / 2.5;
        this.width = canvasWidth / 11;
        this.gapTop = floor(random(0, canvasHeight - this.gapHeight));
        this.gapBottom = this.gapTop + this.gapHeight;
    }

    update() {
        this.x += this.velocity;
    }

    show() {
        fill(255);
        rect(this.x, this.gapTop / 2, this.width, this.gapTop);
        rect(this.x, (canvasHeight + this.gapBottom) / 2, this.width, canvasHeight - this.gapBottom);
    }
};

let connectionInnovation = new InnovationGenerator();
let nodeInnovation = new InnovationGenerator();

let genome = new Genome();
let n1 = nodeInnovation.getInnovation();
let n2 = nodeInnovation.getInnovation();
let n3 = nodeInnovation.getInnovation();
let n4 = nodeInnovation.getInnovation();
let n5 = nodeInnovation.getInnovation();
let n6 = nodeInnovation.getInnovation();

genome.addNode(new NodeGene(NodeGene.TYPE.INPUT, n1));
genome.addNode(new NodeGene(NodeGene.TYPE.INPUT, n2));
genome.addNode(new NodeGene(NodeGene.TYPE.INPUT, n3));
genome.addNode(new NodeGene(NodeGene.TYPE.INPUT, n4));
genome.addNode(new NodeGene(NodeGene.TYPE.INPUT, n5));
genome.addNode(new NodeGene(NodeGene.TYPE.OUTPUT, n6));

genome.addConnection(new ConnectionGene(n1, n6, 0.5, true, connectionInnovation.getInnovation()));
genome.addConnection(new ConnectionGene(n2, n6, 0.5, true, connectionInnovation.getInnovation()));
genome.addConnection(new ConnectionGene(n3, n6, 0.5, true, connectionInnovation.getInnovation()));
genome.addConnection(new ConnectionGene(n4, n6, 0.5, true, connectionInnovation.getInnovation()));
genome.addConnection(new ConnectionGene(n5, n6, 0.5, true, connectionInnovation.getInnovation()));

class Test extends Evaluator {
    evaluateGenome(genome) {
        let bird = deadBirds.find(d => d.id === genome.id);
        return bird.score;
    }
};

function nextGeneration() {
    deadBirds.splice(0, deadBirds.length);
    birds.splice(0, birds.length);
    for(let i=0; i<eval.populationSize; ++i) {
        let genome = eval.genomes.find(g => g.id === i);
        let net = new FeedForwardNetwork(genome);
        birds.push(new Bird(i, random(0, canvasHeight), net, genome.species));
    }

    pipes.splice(0, pipes.length);
    pipes.push(new Pipe(canvasWidth));
    console.log(eval.fittestGenome);
}

let eval = new Test(genome, connectionInnovation, nodeInnovation);

function showStats() {
    let fitness = Math.max(...birds.map(b => b.score));
    highestFitness = Math.max(fitness, highestFitness, eval.highestScore);
    fill(50);
    textSize(16);
    text('Generation : ' + eval.generation, canvasWidth * 0.9, canvasHeight * 0.05);
    text('fitness : ' + fitness, canvasWidth * 0.9, canvasHeight * 0.07);
    text('previous fitness : ' + eval.highestScore, canvasWidth * 0.9, canvasHeight * 0.09);
    text('highest fitness : ' + highestFitness, canvasWidth * 0.9, canvasHeight * 0.11);
    text('no of species : ' + eval.species.length, canvasWidth * 0.9, canvasHeight * 0.13);
    text('birds alive : ' + birds.length, canvasWidth * 0.9, canvasHeight * 0.15);
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

var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];