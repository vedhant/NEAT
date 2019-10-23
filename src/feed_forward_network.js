import NodeGene from "./node_gene";

// TODO: implement RNN too!
export default class FeedForwardNetwork {
    constructor(genome) {
        this.network = [];
        for(let i=0; i<genome.nodes.length; ++i) {
            this.network.push({
                neuron: new Neuron(genome.nodes[i].id, genome.nodes[i].type),
                incoming: [],
                weights: []
            });
        }
        this.network.sort((n1, n2) => n1.neuron.id < n2.neuron.id ? -1 : 1);
        for(let i=0; i < genome.connections.length; ++i) {
            if(genome.connections[i].enabled) {
                let inId = genome.connections[i].inNode;
                let outId = genome.connections[i].outNode;
                this.network[this.getNeuronIndex(outId)].incoming.push(inId);
                this.network[this.getNeuronIndex(outId)].weights.push(genome.connections[i].weight);
            }
        }
    }

    // search neuron index in network using binary search
    getNeuronIndex(id) {
        let l = 0, r = this.network.length - 1;
        while(l <= r) {
            let m = Math.floor((l + r) / 2);
            if(this.network[m].neuron.id === id) {
                return m;
            }
            else if(this.network[m].neuron.id < id) {
                l = m + 1;
            }
            else {
                r = m - 1;
            }
        }
    }

    calculateNeuronOutput(id) {
        let idx = this.getNeuronIndex(id);
        if(this.network[idx].neuron.activated) {
            return;
        }

        for(let i=0; i<this.network[idx].incoming.length; ++i) {
            this.calculateNeuronOutput(this.network[idx].incoming[i]);
            let inNeuron = this.network[this.getNeuronIndex(this.network[idx].incoming[i])].neuron;
            this.network[idx].neuron.value += inNeuron.value * this.network[idx].weights[i];
        }

        this.network[idx].neuron.activateSigmoid();
    }

    feed(inputs) {
        let j = 0;
        for(let i=0; i<this.network.length; ++i) {
            if(this.network[i].neuron.type === NodeGene.TYPE.INPUT) {
                this.network[i].neuron.value = inputs[j];
                this.network[i].neuron.activated = true;
                ++j;
            }
            if(j === inputs.length)
                break;
        }

        let outputs = [];
        for(let i=0; i<this.network.length; ++i) {
            if(this.network[i].neuron.type === NodeGene.TYPE.OUTPUT) {
                this.calculateNeuronOutput(this.network[i].neuron.id);
                outputs.push(this.network[i].neuron.value);
            }
        }

        this.resetValues();
        return outputs;
    }

    resetValues() {
        for(let i=0; i<this.network.length; ++i) {
            this.network[i].neuron.value = 0;
            this.network[i].neuron.activated = false;
        }
    }
};

class Neuron {
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.activated = false;
        this.value = 0;
    }

    activateSigmoid() {
        // this.value = 1 / (1 + Math.exp(-this.value));
        this.activated = true;
    }
};
