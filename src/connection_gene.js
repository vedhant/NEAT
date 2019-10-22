export default class ConnectionGene {
    constructor(inNode, outNode, weight, enabled, innovation) {
        this.inNode = inNode;
        this.outNode = outNode;
        this.weight = weight;
        this.enabled = enabled;
        this.innovation = innovation;
    }

    copy() {
        return new ConnectionGene(this.inNode, this.outNode, this.weight, this.enabled, this.innovation);
    }
};
