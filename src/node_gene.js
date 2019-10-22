const TYPE = {
    INPUT: 0,
    HIDDEN: 1,
    OUTPUT: 2
};

export default class NodeGene {
    constructor(type, id) {
        this.type = type;
        this.id = id;
    }

    copy() {
        return new NodeGene(this.type, this.id);
    }
};

Object.defineProperty(NodeGene, 'TYPE', {
    value: TYPE,
    writable: false
});
