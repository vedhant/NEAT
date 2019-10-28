import { randInt } from "./helpers";
import PARAMETERS from "./parameters";
import Genome from "./genome";

// TODO: set compatibility threshold dynamically to make no of species remain constant
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
        this.members.sort((g1, g2) => g1.fitness > g2.fitness ? -1: 1);
        this.representative = this.members[0];
        this.members.splice(0, this.members.length);
        this.totalAdjustedFitness = 0;
    }

    cull() {
        this.members.sort((g1, g2) => g1.fitness > g2.fitness ? -1: 1);
        let killTill = Math.ceil(this.members.length * (1 - PARAMETERS.cullRate));
        for(let i = this.members.length; i >= killTill; --i) {
            this.members.splice(i, 1);
        }
    }
};


Species.reproduce = function(species, nodeInnovation, connectionInnovation) {
    // TODO: implement stagnation
    let speciesRemaining = [...species];
    let previousSize = speciesRemaining.map(s => s.members.length);
    let minSpeciesSize = previousSize.map(p => Math.max(PARAMETERS.elitismRate * p, PARAMETERS.minSpeciesSize));
    let adjustedFitness = speciesRemaining.map(s => s.totalAdjustedFitness);

    let spawnAmounts = Species.computeSpawnAmounts(previousSize, minSpeciesSize, adjustedFitness);

    let newPopulation = [];
    // console.log(previousSize, minSpeciesSize, adjustedFitness, spawnAmounts);
    
    for(let i=0; i<speciesRemaining.length; ++i) {
        let s = speciesRemaining[i];
        let spawn = Math.max(previousSize[i] * PARAMETERS.elitismRate, spawnAmounts[i]);
        if(spawn < 0)
            throw new Error("Spawning should be positive");
        
        let oldMembers = s.members.map(g => g.copy());

        oldMembers.sort((g1, g2) => g1.fitness > g2.fitness ? -1: 1);
        for(let j=0; j<Math.ceil(s.members.length * PARAMETERS.elitismRate); ++j) {
            newPopulation.push(s.members[j]);
            --spawn;
        }

        if(spawn <= 0)
            continue;

        let cutOff = Math.ceil(PARAMETERS.survivalThreshold * oldMembers.length);
        if(oldMembers.length > 1)
           cutOff = Math.max(2, cutOff);
        while(cutOff < oldMembers.length) {
            oldMembers.pop();
        }

        while(spawn > 0) {
            spawn -= 1;

            let id1 = randInt(0, oldMembers.length - 1);
            let id2 = randInt(0, oldMembers.length - 1);
            let parent1 = oldMembers[id1];
            let parent2 = oldMembers[id2];
            let child;
            
            if(Math.random() > PARAMETERS.asexualReproductionRate && id1 !== id2) {
                if(parent1.fitness > parent2.fitness) {
                    child = Genome.crossover(parent1, parent2);
                }
                else {
                    child = Genome.crossover(parent2, parent1);
                }
                if(Math.random() < PARAMETERS.probGenomeMutateConnectionWeights)
                    child.mutateConnectionWeights();
                if(Math.random() < PARAMETERS.addConnectionRate)
                    child.addConnectionMutation(connectionInnovation);
                if(Math.random() < PARAMETERS.addNodeRate)
                    child.addNodeMutation(nodeInnovation, connectionInnovation);
            }
            else {
                child = parent1.copy();
                if(Math.random() < PARAMETERS.probGenomeMutateConnectionWeights)
                    child.mutateConnectionWeights();
            }

            newPopulation.push(child);
        }
    }
    return newPopulation;
};

Species.computeSpawnAmounts = function(previousSize, minSpeciesSize, adjustedFitness) {
    let afSum = adjustedFitness.reduce((a, b) => a + b, 0);
    let spawnAmounts = [];

    for(let i=0; i<adjustedFitness.length; ++i) {
        let s = Math.max(minSpeciesSize[i], (adjustedFitness[i] / afSum) * PARAMETERS.PopulationSize);
        // TODO: check why / 2
        let d = (s - previousSize[i]) / 2;
        let c = Math.round(d);
        
        let spawn = previousSize[i];
        if(Math.abs(c) > 0)
            spawn += c;
        else if(d > 0)
            spawn += 1;
        else
            spawn -= 1;

        spawnAmounts.push(spawn);
    }
    let totalSpawn = spawnAmounts.reduce((a, b) => a + b, 0);
    let norm = PARAMETERS.PopulationSize / totalSpawn;
    spawnAmounts = spawnAmounts.map((s, i) => Math.max(minSpeciesSize[i], Math.round(norm * s)));
    // spawnAmounts = spawnAmounts.map((s, i) => Math.round(norm * s));

    return spawnAmounts;
};

Species.speciate = function(species, genomes) {
    // Place genomes into species
    for(let i=0; i<species.length; ++i)
        species[i].reset();
        
    for(let i=0; i<genomes.length; ++i) {
        let speciesFound = false;
        for(let j=0; j<species.length; ++j) {
            if(Genome.compatibilityDistance(genomes[i], species[j].representative) < PARAMETERS.compatibilityThreshold) {
                species[j].members.push(genomes[i]);
                speciesFound = true;
                genomes[i].species = j;
                break;
            }
        }
        if(!speciesFound) {
            let newSpecies = new Species(genomes[i]);
            species.push(newSpecies);
            genomes[i].species = species.length - 1;
        }
    }

    return species;
};
