import { randInt } from "./helpers";

export default class Species {
    constructor(representative) {
        this.representative = representative;
        this.members = [representative];
        this.totalAdjustedFitness = 0;
    }

    addAdjustedFitness(adjustedFitness) {
        this.totalAdjustedFitness += adjustedFitness;
    }

    reset() {
        this.representative = this.members[randInt(0, this.members.length - 1)];
        this.members.splice(0, this.members.length);
        this.totalAdjustedFitness = 0;
    }
};