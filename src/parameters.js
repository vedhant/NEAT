const PARAMETERS = {
    RandomWeightRange: 4,
    probGenomeMutateConnectionWeights: 0.8,
    probEachWeightUniformPerturb: 0.9,
    c1: 2,
    c2: 2,
    c3: 0.4,
    compatibilityThreshold: 1.5,
    addConnectionRate: 0.05,
    addNodeRate: 0.03,
    cullRate: 0.6,
    asexualReproductionRate: 0.25,
    elitismRate: 0.1,
    // TODO: implement mutateToggleEnable
    mutateToggleEnable: 0.3,
    disableGeneInheritingChance: 0.3,
    minSpeciesSize: 1,
    PopulationSize: 50,
    survivalThreshold: 0.5
};

export default PARAMETERS;
