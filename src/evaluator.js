import Species from './species';
import Genome from './genome';
import PARAMETERS from './parameters';
import InnovationGenerator from './innovation_generator';

export default class Evaluator {
    constructor(startingGenome, connectionInnovation, nodeInnovation) {
        if(this.constructor === Evaluator) {
            throw new Error("Evaluator cannot be instantiated");
        }

        this.populationSize = PARAMETERS.PopulationSize;
        this.genomeIdGenerator = new InnovationGenerator();
        this.genomes = [];
        for(let i=0; i<this.populationSize; ++i) {
            let initialGenome = startingGenome.copy();
            initialGenome.id = this.genomeIdGenerator.getInnovation();
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

        // Place genomes into species
        this.species = Species.speciate(this.species, this.genomes);
    }

    evaluate() {
        // reset everything for next generation
        this.nextGenGenomes = [];
        this.fittestGenome = null;
        this.highestScore = 0;
        this.genomeIdGenerator.reset();

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
        for(let i=0; i<this.genomes.length; ++i)
            this.genomes[i].id = this.genomeIdGenerator.getInnovation();
        this.populationSize = this.genomes.length;

        ++this.generation;

        // Place genomes into species
        this.species = Species.speciate(this.species, this.genomes);
    }

    evaluateGenome(genome) {
        throw new Error("Method evaluateGenome() must be implemented");
    }
    
};
