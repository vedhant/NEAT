export default class InnovationGenerator {
    constructor() {
        let currentInnovation = -1;

        this.getInnovation = function() {
            ++ currentInnovation;
            return currentInnovation;
        };

        this.reset = function() {
            currentInnovation = -1;
        };
    }
}