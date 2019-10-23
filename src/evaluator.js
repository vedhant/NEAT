import Species from './species';
import Genome from './genome';
import PARAMETERS from './parameters';

export default class Evaluator {
    constructor(startingGenome, populationSize, connectionInnovation, nodeInnovation) {
        if(this.constructor === Evaluator) {
            throw new Error("Evaluator cannot be instantiated");
        }

        this.populationSize = populationSize;
        this.genomes = [];
        for(let i=0; i<populationSize; ++i) {
            let initialGenome = startingGenome.copy();
            initialGenome.randomizeAllWeights();
            this.genomes.push(initialGenome);
        }
        this.nextGenGenomes = [];
        this.speciesMap = [];
        this.species = [];

        this.connectionInnovation = connectionInnovation;
        this.nodeInnovation = nodeInnovation;

        this.highestScore = 0;
        this.fittestGenome;
    }

    evaluate() {
        // reset everything for next generation
        for(let i=0; i<this.species.length; ++i)
            this.species[i].reset();
        this.speciesMap.splice(0, this.speciesMap.length);
        this.nextGenGenomes = [];
        this.fittestGenome = null;
        this.highestScore = 0;

        // Place genomes into species
        for(let i=0; i<this.genomes.length; ++i) {
            let speciesFound = false;
            for(let j=0; j<this.species.length; ++j) {
                if(Genome.compatibilityDistance(this.genomes[i], this.species[j].representative) < PARAMETERS.compatibilityThreshold) {
                    this.species[j].members.push(this.genomes[i]);
                    this.speciesMap.push({
                        genome: this.genomes[i],
                        species: this.species[j]
                    });
                    speciesFound = true;
                    break;
                }
            }
            if(!speciesFound) {
                let newSpecies = new Species(this.genomes[i]);
                this.species.push(newSpecies);
                this.speciesMap.push({
                    genome: this.genomes[i],
                    species: newSpecies
                });
            }
        }
        
        // remove empty species
        for(let i=this.species.length - 1; i >= 0; --i) {
            if(this.species[i].members.length === 0) {
                this.species.splice(i, 1);
            }
        }

        // Evaluate genomes and assign fitness
        for(let i=0; i<this.speciesMap.length; ++i) {
            let g = this.speciesMap[i].genome;
            let s = this.speciesMap[i].species;

            let score = this.evaluateGenome(g);
            let adjustedScore = score / s.members.length;
            s.addAdjustedFitness(adjustedScore);
            g.fitness = adjustedScore;
            if(score > this.highestScore) {
                this.highestScore = score;
                this.fittestGenome = g;
            }
        }

        // Put best genomes from each species into next generation
        for(let i=0; i<this.species.length; ++i) {
            this.species[i].members.sort((g1, g2) => g1.fitness > g2.fitness ? -1: 1);
            let fittestGenome = this.species[i].members[0].copy();
            this.nextGenGenomes.push(fittestGenome);
        }

        // Breed the rest of the genomes
        while(this.nextGenGenomes.length < this.populationSize) {
            let s = this.getRandomSpeciesBiasedAdjustedFitness();
            let g1 = this.getRandomGenomeBiasedAdjustedFitness(s);
            let g2 = this.getRandomGenomeBiasedAdjustedFitness(s);
            let child;
            if(g1.fitness > g2.fitness) {
                child = Genome.crossover(g1, g2);
            }
            else {
                child = Genome.crossover(g2, g1);
            }

            if(Math.random() < PARAMETERS.probGenomeMutateConnectionWeights)
                child.mutateConnectionWeights();
            if(Math.random() < PARAMETERS.addConnectionRate)
                child.addConnectionMutation(this.connectionInnovation);
            if(Math.random() < PARAMETERS.addNodeRate)
                child.addNodeMutation(this.nodeInnovation, this.connectionInnovation);

            this.nextGenGenomes.push(child);
        }

        this.genomes = [...this.nextGenGenomes];
    }

    getRandomSpeciesBiasedAdjustedFitness() {
        let completeWeight = 0;
        for(let i=0; i<this.species.length; ++i) {
            completeWeight += this.species[i].totalAdjustedFitness;
        }

        let r = Math.random() * completeWeight;
        let countWeight = 0;
        for(let i=0; i<this.species.length; ++i) {
            countWeight += this.species[i].totalAdjustedFitness;
            if(countWeight >= r) {
                return this.species[i];
            }
        }
        throw new Error("Couldn't find a species");
    }

    getRandomGenomeBiasedAdjustedFitness(fromSpecies) {
        let completeWeight = 0;
        for(let i=0; i<fromSpecies.members.length; ++i) {
            completeWeight += fromSpecies.members[i].fitness;
        }

        let r = Math.random() * completeWeight;
        let countWeight = 0;
        for(let i=0; i<fromSpecies.members.length; ++i) {
            countWeight += fromSpecies.members[i].fitness;
            if(countWeight >= r) {
                return fromSpecies.members[i];
            }
        }
        throw new Error("Couldn't find a genome");
    }

    evaluateGenome(genome) {
        throw new Error("Method evaluateGenome() must be implemented");
    }
    
};
