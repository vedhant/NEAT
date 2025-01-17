import ConnectionGene from './connection_gene';
import { randInt, rand, randGaussian } from './helpers';
import NodeGene from './node_gene';
import PARAMETERS from './parameters';
import FeedForwardNetwork from './feed_forward_network';

export default class Genome {
    constructor() {
        this.id = null;
        this.species = null;
        this.connections = [];
        this.nodes = [];
        this.fitness = 0;
    }

    getInitialTopology(inputs, outputs, connectionInnovation, nodeInnovation) {
        let n = [];
        for(let i=0; i < (inputs + outputs); ++i)
            n.push(nodeInnovation.getInnovation());
        
        for(let i=0; i < inputs; ++i)
            this.addNode(new NodeGene(NodeGene.TYPE.INPUT, n[i]));
        
        for(let i=0; i < outputs; ++i)
            this.addNode(new NodeGene(NodeGene.TYPE.OUTPUT, n[i + inputs]));
        
        for(let i=0; i<inputs; ++i) {
            for(let j=0; j<outputs; ++j) {
                genome.addConnection(new ConnectionGene(n[i], n[inputs + j], 0.5, true, connectionInnovation.getInnovation()));
            }
        }
    }

    // TODO: add tries
    addConnectionMutation(connectionCounter) {
        let node1 = this.nodes[randInt(0, this.nodes.length - 1)];
        let node2 = this.nodes[randInt(0, this.nodes.length - 1)];
        let weight = rand(-PARAMETERS.RandomWeightRange / 2, PARAMETERS.RandomWeightRange / 2);

        let reversed = false;
        if(node1.type === NodeGene.TYPE.HIDDEN && node2.type === NodeGene.TYPE.INPUT)
            reversed = true;
        else if(node1.type === NodeGene.TYPE.OUTPUT && node2.type === NodeGene.TYPE.HIDDEN)
            reversed = true;
        else if(node1.type === NodeGene.TYPE.OUTPUT && node2.type === NodeGene.TYPE.INPUT)
            reversed = true;

        let connectionImpossible = false;
        if(node1.type === NodeGene.TYPE.INPUT && node2.type === NodeGene.TYPE.INPUT)
            connectionImpossible = true;
        else if(node1.type === NodeGene.TYPE.OUTPUT && node2.type === NodeGene.TYPE.OUTPUT)
            connectionImpossible = true;
        else if(node1.id === node2.id)
            connectionImpossible = true;
        
        let connectionExists = false;
        for(let i=0; i<this.connections.length; ++i) {
            if(this.connections[i].inNode === node1.id && this.connections[i].outNode === node2.id) {
                connectionExists = true;
                break;
            }
            if(this.connections[i].inNode === node2.id && this.connections[i].outNode === node1.id) {
                connectionExists = true;
                break;
            }
        }

        if(connectionExists || connectionImpossible)
        return;
        
        let newConnection = new ConnectionGene(reversed ? node2.id : node1.id, reversed ? node1.id : node2.id, weight, true, connectionCounter.getInnovation());
        this.addConnection(newConnection);
    }

    addNodeMutation(nodeCounter, connectionCounter) {
        let connection = this.connections[randInt(0, this.connections.length - 1)];
        let inNode = this.getNodeById(connection.inNode);
        let outNode = this.getNodeById(connection.outNode);

        connection.enabled = false;

        let newNode = new NodeGene(NodeGene.TYPE.HIDDEN, nodeCounter.getInnovation());
        let inToNew = new ConnectionGene(inNode.id, newNode.id, 1, true, connectionCounter.getInnovation());
        let newToOut = new ConnectionGene(newNode.id, outNode.id, connection.weight, true, connectionCounter.getInnovation());
        
        this.addNode(newNode);
        this.addConnection(inToNew);
        this.addConnection(newToOut);
    }

    mutateConnectionWeights() {
        for(let i=0; i<this.connections.length; ++i) {
            if(rand(0, 1) < PARAMETERS.probEachWeightUniformPerturb) {
                this.connections[i].weight += randGaussian();
            }
            else {
                this.connections[i].weight = rand(-PARAMETERS.RandomWeightRange / 2, PARAMETERS.RandomWeightRange / 2);
            }
        }
    }

    getNodeById(id) {
        let node =  this.nodes.find(node => node.id === id);
        if(node === undefined)
            return null;
        return node;
    }

    getConnection(innovation) {
        let connection = this.connections.find(connection => connection.innovation === innovation);
        if(connection === undefined)
            return null;
        return connection;
    }

    // TODO: use GenesisGenome
    randomizeAllWeights() {
        for(let i=0; i<this.connections.length; ++i) {
            this.connections[i].weight = rand(-PARAMETERS.RandomWeightRange / 2, PARAMETERS.RandomWeightRange / 2);
        }
    }

    copy() {
        let newConnections = [];
        let newNodes = [];
        for(let i=0; i<this.connections.length; ++i)
            newConnections.push(this.connections[i].copy());
        for(let i=0; i<this.nodes.length; ++i)
            newNodes.push(this.nodes[i].copy());
        
        let newGenome = new Genome();
        newGenome.connections = newConnections;
        newGenome.nodes = newNodes;
        newGenome.fitness = this.fitness;
        return newGenome;
    }

    addNode(node) {
        this.nodes.push(node);
    }

    addConnection(connection) {
        this.connections.push(connection);
        let net = new FeedForwardNetwork(this);
        if(!net.checkCycles()) {
            return true;
        }
        else {
            this.connections.pop();
            return false;
        } 
    }
};

// parent1 should be fitter than parent2
Genome.crossover = function(parent1, parent2) {
    let child = new Genome();

    for(let i=0; i<parent1.nodes.length; ++i) {
        let matchingNode = parent2.getNodeById(parent1.nodes[i].id);
        if(matchingNode !== null) {
            let childNodeGene = Math.random() >= 0.5 ? parent1.nodes[i].copy() : matchingNode.copy();
            child.addNode(childNodeGene);
        }
        else {
            let childNodeGene = parent1.nodes[i].copy();
            child.addNode(childNodeGene);
        }
    }
    for(let i=0; i<parent1.connections.length; ++i) {
        let matchingConnection = parent2.getConnection(parent1.connections[i].innovation);
        let childConnectionGene;
        if(matchingConnection !== null) {
            childConnectionGene = Math.random() >= 0.5 ? parent1.connections[i].copy() : matchingConnection.copy();
            let disabled = !parent1.connections[i].enabled || !matchingConnection.enabled;
            if(disabled && Math.random() < PARAMETERS.disableGeneInheritingChance)
                childConnectionGene.enabled = false;
            child.addConnection(childConnectionGene);
        }
        else {
            childConnectionGene = parent1.connections[i].copy();
            child.addConnection(childConnectionGene);
        }
    }
    return child;
}

Genome.compatibilityDistance = function(genome1, genome2) {
    let N = Math.max(genome1.nodes.length + genome1.connections.length, genome2.nodes.length + genome2.connections.length);
    let compatibilities = Genome.getGenesCompatibility(genome1, genome2);
    // TODO: check value of N
    // N = 1;
    return (PARAMETERS.c1 * compatibilities.excess / N) + (PARAMETERS.c2 * compatibilities.disjoint / N) + (PARAMETERS.c3 * compatibilities.avgWeightDiff);
};

Genome.getGenesCompatibility = function(genome1, genome2) {
    let nodesMatching = 0, connectionMatching = 0, disjoint = 0, excess = 0;
    // count matching node genes
    let nodegenes1 = genome1.nodes.map(node => node.id).sort((id1, id2) => id1 < id2 ? -1: 1);
    let nodegenes2 = genome2.nodes.map(node => node.id).sort((id1, id2) => id1 < id2 ? -1: 1);

    let i = nodegenes1.length - 1;
    let j = nodegenes2.length - 1;
    while(i >= 0 && j >= 0) {
        if(nodegenes1[i] === nodegenes2[j]) {
            ++nodesMatching;
            --i;
            --j;
        }
        else {
            if(nodegenes1[i] < nodegenes2[j]) {
                if(nodegenes2[j] > nodegenes1[nodegenes1.length - 1])
                    ++excess;
                else
                    ++disjoint;
                --j;
            }
            else {
                if(nodegenes1[i] > nodegenes2[nodegenes2.length - 1])
                    ++excess;
                else
                    ++disjoint;
                --i;
            }
        }
    }

    // count matching connection genes
    let weightDiff = 0;
    let connectiongenes1 = genome1.connections.map(connection => { return { innovation : connection.innovation, weight: connection.weight } })
                                              .sort((conn1, conn2) => conn1.innovation < conn2.innovation ? -1: 1);
    let connectiongenes2 = genome2.connections.map(connection => { return { innovation : connection.innovation, weight: connection.weight } })
                                              .sort((conn1, conn2) => conn1.innovation < conn2.innovation ? -1: 1);

    i = connectiongenes1.length - 1;
    j = connectiongenes2.length - 1;
    while(i >= 0 && j >= 0) {
        if(connectiongenes1[i].innovation === connectiongenes2[j].innovation) {
            ++connectionMatching;
            weightDiff += Math.abs(connectiongenes1[i].weight - connectiongenes2[j].weight);
            --i;
            --j;
        }
        else {
            if(connectiongenes1[i].innovation < connectiongenes2[j].innovation) {
                if(connectiongenes2[j].innovation > connectiongenes1[connectiongenes1.length - 1].innovation)
                    ++excess;
                else
                    ++disjoint;
                --j;
            }
            else {
                if(connectiongenes1[i].innovation > connectiongenes2[connectiongenes2.length - 1].innovation)
                    ++excess;
                else
                    ++disjoint;
                --i;
            }
        }
    }
    let avgWeightDiff = connectionMatching > 0 ? weightDiff / connectionMatching : 0;
    return {
        matching: nodesMatching + connectionMatching,
        disjoint: disjoint,
        excess: excess,
        avgWeightDiff: avgWeightDiff
    };
}
