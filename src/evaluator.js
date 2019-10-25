import Species from './species';
import Genome from './genome';
import PARAMETERS from './parameters';

export default class Evaluator {
    constructor(startingGenome, connectionInnovation, nodeInnovation) {
        if(this.constructor === Evaluator) {
            throw new Error("Evaluator cannot be instantiated");
        }

        this.populationSize = PARAMETERS.PopulationSize;
        this.genomes = [];
        for(let i=0; i<this.populationSize; ++i) {
            let initialGenome = startingGenome.copy();
            initialGenome.randomizeAllWeights();
            this.genomes.push(initialGenome);
        }
        this.nextGenGenomes = [];
        this.species = [];

        this.connectionInnovation = connectionInnovation;
        this.nodeInnovation = nodeInnovation;

        this.highestScore = 0;
        this.fittestGenome;

        this.generation = 0;
    }

    evaluate() {
        // reset everything for next generation
        for(let i=0; i<this.species.length; ++i)
            this.species[i].reset();
        this.nextGenGenomes = [];
        this.fittestGenome = null;
        this.highestScore = 0;

        // Place genomes into species
        for(let i=0; i<this.genomes.length; ++i) {
            let speciesFound = false;
            for(let j=0; j<this.species.length; ++j) {
                if(Genome.compatibilityDistance(this.genomes[i], this.species[j].representative) < PARAMETERS.compatibilityThreshold) {
                    this.species[j].members.push(this.genomes[i]);
                    speciesFound = true;
                    break;
                }
            }
            if(!speciesFound) {
                let newSpecies = new Species(this.genomes[i]);
                this.species.push(newSpecies);
            }
        }

        // Evaluate genomes and assign fitness
        for(let i=0; i<this.species.length; ++i) {
            for(let j=0; j<this.species[i].members.length; ++j) {
                let s = this.species[i];
                let g = this.species[i].members[j];

                let score = this.evaluateGenome(g);
                let adjustedScore = score / s.members.length;
                s.addAdjustedFitness(adjustedScore);
                g.fitness = adjustedScore;
                if(score > this.highestScore) {
                    this.highestScore = score;
                    this.fittestGenome = g;
                }
            }
        }


        // Cull genome in each Species
        for(let i=0; i<this.species.length; ++i) {
            this.species[i].cull();
        }

        // remove empty species
        for(let i=this.species.length - 1; i >= 0; --i) {
            if(this.species[i].members.length === 0) {
                this.species.splice(i, 1);
            }
        }

        // breed rest of the genomes
        this.nextGenGenomes = Species.reproduce(this.species, this.nodeInnovation, this.connectionInnovation);

        this.genomes = [...this.nextGenGenomes];
        this.populationSize = this.genomes.length;

        ++this.generation;
    }

    evaluateGenome(genome) {
        throw new Error("Method evaluateGenome() must be implemented");
    }
    
};
