let connectionInnovation = new InnovationGenerator();
let nodeInnovation = new InnovationGenerator();

let genome = new Genome();

let n1 = nodeInnovation.getInnovation();
let n2 = nodeInnovation.getInnovation();
let n3 = nodeInnovation.getInnovation();

genome.nodes.push(new NodeGene(NodeGene.TYPE.INPUT, n1));
genome.nodes.push(new NodeGene(NodeGene.TYPE.INPUT, n2));
genome.nodes.push(new NodeGene(NodeGene.TYPE.OUTPUT, n3));

genome.connections.push(new ConnectionGene(n1, n3, 0.5, true, connectionInnovation.getInnovation()));
genome.connections.push(new ConnectionGene(n2, n3, 0.5, true, connectionInnovation.getInnovation()));

class Test extends Evaluator {
    evaluateGenome(genome) {
        return genome.nodes.length;
    }
};
let testEval = new Test(genome, 100, connectionInnovation, nodeInnovation);

for(let i=0; i<100; ++i) {
    testEval.evaluate();
    console.log("Generation " + i, "highest fitness " + testEval.highestScore, "amount of species " + testEval.species.length);
    if((i+1) % 10 == 0)
        console.log("fittest genome : ", testEval.fittestGenome);
    console.log("\n");
}