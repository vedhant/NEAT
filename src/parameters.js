const PARAMETERS = {
    RandomWeightRange: 4,
    probGenomeMutateConnectionWeights: 0.8,
    probEachWeightUniformPerturb: 0.9,
    c1: 2,
    c2: 2,
    c3: 0.4,
    compatibilityThreshold: 3,
    addConnectionRate: 0.4,
    addNodeRate: 0.25,
    cullRate: 0.8,
    asexualReproductionRate: 0.25,
    elitismRate: 0.1,
    // TODO: implement mutateToggleEnable
    mutateToggleEnable: 0.3,
    disableGeneInheritingChance: 0.3,
    minSpeciesSize: 1,
    PopulationSize: 100
};

export default PARAMETERS;
