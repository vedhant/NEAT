let connectionInnovation = new InnovationGenerator();
let nodeInnovation = new InnovationGenerator();

let genome = new Genome();
let n1 = nodeInnovation.getInnovation();
let n2 = nodeInnovation.getInnovation();
let n3 = nodeInnovation.getInnovation();
let n4 = nodeInnovation.getInnovation();

genome.addNode(new NodeGene(NodeGene.TYPE.INPUT, n1));
genome.addNode(new NodeGene(NodeGene.TYPE.INPUT, n2));
// bias node
genome.addNode(new NodeGene(NodeGene.TYPE.INPUT, n3));
genome.addNode(new NodeGene(NodeGene.TYPE.OUTPUT, n4));

genome.addConnection(new ConnectionGene(n1, n4, 0.5, true, connectionInnovation.getInnovation()));
genome.addConnection(new ConnectionGene(n2, n4, 0.5, true, connectionInnovation.getInnovation()));
genome.addConnection(new ConnectionGene(n3, n4, 0.5, true, connectionInnovation.getInnovation()));


let inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
let correctOutputs = [0, 1, 1, 0];
class Test extends Evaluator {
    evaluateGenome(genome) {
        let net = new FeedForwardNetwork(genome);
        let fitness = 0;
        let found = true;
        for(let i=0; i<4; ++i) {
            let output = net.feed([...inputs[i], 1]);
            fitness += 1 - Math.pow(output - correctOutputs[i], 2);
            if(Math.abs(output - correctOutputs[i]) >= 0.5)
                found = false;
        }
        if(found) {
            pause = true;
            clearInterval(loop);
            console.log("winner : ", genome);
            let net = new FeedForwardNetwork(genome);
            console.log(net.feed([0, 0, 1]), net.feed([0, 1, 1]), net.feed([1, 0, 1]), net.feed([1, 1, 1]));
        }
        return fitness;
    }
};
let testEval = new Test(genome, connectionInnovation, nodeInnovation);

let i = 0;
let bestFitness = 0;

function runGeneration() {
    testEval.evaluate();
    console.log("Generation " + i, "highest fitness " + testEval.highestScore, "amount of species " + testEval.species.length);
    bestFitness = Math.max(bestFitness, testEval.highestScore);
    if((i+1) % 10 == 0) {
        console.log("fittest genome : ", testEval.fittestGenome);
        console.log("best fitness until now :" + bestFitness);
        let net = new FeedForwardNetwork(testEval.fittestGenome);
        console.log(net.feed([0, 0, 1]), net.feed([0, 1, 1]), net.feed([1, 0, 1]), net.feed([1, 1, 1]));
    }
    ++i;
    console.log("\n");
}

let loop = setInterval(runGeneration, 0);

let pause = false;
document.addEventListener('keypress', function(e) {
    pause = !pause;
    if(pause)
        clearInterval(loop);
    else
        loop = setInterval(runGeneration, 0);
});