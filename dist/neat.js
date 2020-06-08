// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"connection_gene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ConnectionGene =
/*#__PURE__*/
function () {
  function ConnectionGene(inNode, outNode, weight, enabled, innovation) {
    _classCallCheck(this, ConnectionGene);

    this.inNode = inNode;
    this.outNode = outNode;
    this.weight = weight;
    this.enabled = enabled;
    this.innovation = innovation;
  }

  _createClass(ConnectionGene, [{
    key: "copy",
    value: function copy() {
      return new ConnectionGene(this.inNode, this.outNode, this.weight, this.enabled, this.innovation);
    }
  }]);

  return ConnectionGene;
}();

exports.default = ConnectionGene;
;
},{}],"helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randInt = randInt;
exports.rand = rand;
exports.randGaussian = randGaussian;

function randInt(l, r) {
  return Math.floor(Math.random() * (r - l + 1)) + l;
}

function rand(l, r) {
  return Math.random() * (r - l) + l;
}

function randGaussian() {
  var u = 0,
      v = 0;

  while (u === 0) {
    u = Math.random();
  } //Converting [0,1) to (0,1)


  while (v === 0) {
    v = Math.random();
  }

  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
},{}],"node_gene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TYPE = {
  INPUT: 0,
  HIDDEN: 1,
  OUTPUT: 2
};

var NodeGene =
/*#__PURE__*/
function () {
  function NodeGene(type, id) {
    _classCallCheck(this, NodeGene);

    this.type = type;
    this.id = id;
  }

  _createClass(NodeGene, [{
    key: "copy",
    value: function copy() {
      return new NodeGene(this.type, this.id);
    }
  }]);

  return NodeGene;
}();

exports.default = NodeGene;
;
Object.defineProperty(NodeGene, 'TYPE', {
  value: TYPE,
  writable: false
});
},{}],"parameters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var PARAMETERS = {
  RandomWeightRange: 4,
  probGenomeMutateConnectionWeights: 0.8,
  probEachWeightUniformPerturb: 0.9,
  c1: 2,
  c2: 2,
  c3: 0.4,
  compatibilityThreshold: 1.4,
  addConnectionRate: 0.2,
  addNodeRate: 0.1,
  cullRate: 0.4,
  asexualReproductionRate: 0.25,
  elitismRate: 0.1,
  // TODO: implement mutateToggleEnable
  mutateToggleEnable: 0.3,
  disableGeneInheritingChance: 0.3,
  minSpeciesSize: 1,
  PopulationSize: 50,
  survivalThreshold: 0.5
};
var _default = PARAMETERS;
exports.default = _default;
},{}],"feed_forward_network.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _node_gene = _interopRequireDefault(require("./node_gene"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: implement RNN too!
var FeedForwardNetwork =
/*#__PURE__*/
function () {
  function FeedForwardNetwork(genome) {
    _classCallCheck(this, FeedForwardNetwork);

    this.network = [];

    for (var i = 0; i < genome.nodes.length; ++i) {
      this.network.push({
        neuron: new Neuron(genome.nodes[i].id, genome.nodes[i].type),
        incoming: [],
        weights: []
      });
    }

    this.network.sort(function (n1, n2) {
      return n1.neuron.id < n2.neuron.id ? -1 : 1;
    });

    for (var _i = 0; _i < genome.connections.length; ++_i) {
      if (genome.connections[_i].enabled) {
        var inId = genome.connections[_i].inNode;
        var outId = genome.connections[_i].outNode;
        this.network[this.getNeuronIndex(outId)].incoming.push(inId);
        this.network[this.getNeuronIndex(outId)].weights.push(genome.connections[_i].weight);
      }
    }
  } // search neuron index in network using binary search


  _createClass(FeedForwardNetwork, [{
    key: "getNeuronIndex",
    value: function getNeuronIndex(id) {
      var l = 0,
          r = this.network.length - 1;

      while (l <= r) {
        var m = Math.floor((l + r) / 2);

        if (this.network[m].neuron.id === id) {
          return m;
        } else if (this.network[m].neuron.id < id) {
          l = m + 1;
        } else {
          r = m - 1;
        }
      }
    }
  }, {
    key: "calculateNeuronOutput",
    value: function calculateNeuronOutput(id) {
      var idx = this.getNeuronIndex(id);

      if (this.network[idx].neuron.activated) {
        return;
      }

      for (var i = 0; i < this.network[idx].incoming.length; ++i) {
        this.calculateNeuronOutput(this.network[idx].incoming[i]);
        var inNeuron = this.network[this.getNeuronIndex(this.network[idx].incoming[i])].neuron;
        this.network[idx].neuron.value += inNeuron.value * this.network[idx].weights[i];
      }

      this.network[idx].neuron.activateSigmoid();
    }
  }, {
    key: "feed",
    value: function feed(inputs) {
      var j = 0;

      for (var i = 0; i < this.network.length; ++i) {
        if (this.network[i].neuron.type === _node_gene.default.TYPE.INPUT) {
          this.network[i].neuron.value = inputs[j];
          this.network[i].neuron.activated = true;
          ++j;
        }

        if (j === inputs.length) break;
      }

      var outputs = [];

      for (var _i2 = 0; _i2 < this.network.length; ++_i2) {
        if (this.network[_i2].neuron.type === _node_gene.default.TYPE.OUTPUT) {
          this.calculateNeuronOutput(this.network[_i2].neuron.id);
          outputs.push(this.network[_i2].neuron.value);
        }
      }

      this.resetValues();
      return outputs;
    }
  }, {
    key: "dfs",
    value: function dfs(u) {
      var idx = this.getNeuronIndex(u);

      if (!this.visited[idx]) {
        this.visited[idx] = true;
        this.inStack[idx] = true;

        for (var i = 0; i < this.network[idx].incoming.length; ++i) {
          var v = this.network[idx].incoming[i];
          if (!this.visited[this.getNeuronIndex(v)] && this.dfs(v)) return true;else if (this.inStack[this.getNeuronIndex(v)]) return true;
        }
      }

      this.inStack[idx] = false;
      return false;
    }
  }, {
    key: "checkCycles",
    value: function checkCycles() {
      this.visited = new Array(this.network.length);
      this.visited.fill(false);
      this.inStack = new Array(this.network.length);
      this.inStack.fill(false);

      for (var i = 0; i < this.network.length; ++i) {
        if (this.dfs(this.network[i].neuron.id)) return true;
      }

      return false;
    }
  }, {
    key: "resetValues",
    value: function resetValues() {
      for (var i = 0; i < this.network.length; ++i) {
        this.network[i].neuron.value = 0;
        this.network[i].neuron.activated = false;
      }
    }
  }]);

  return FeedForwardNetwork;
}();

exports.default = FeedForwardNetwork;
;

var Neuron =
/*#__PURE__*/
function () {
  function Neuron(id, type) {
    _classCallCheck(this, Neuron);

    this.id = id;
    this.type = type;
    this.activated = false;
    this.value = 0;
  }

  _createClass(Neuron, [{
    key: "activateSigmoid",
    value: function activateSigmoid() {
      this.value = 1 / (1 + Math.exp(-this.value));
      this.activated = true;
    }
  }, {
    key: "activateRelu",
    value: function activateRelu() {
      this.value = Math.max(this.value, 0);
      this.activated = true;
    }
  }]);

  return Neuron;
}();

;
},{"./node_gene":"node_gene.js"}],"genome.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connection_gene = _interopRequireDefault(require("./connection_gene"));

var _helpers = require("./helpers");

var _node_gene = _interopRequireDefault(require("./node_gene"));

var _parameters = _interopRequireDefault(require("./parameters"));

var _feed_forward_network = _interopRequireDefault(require("./feed_forward_network"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Genome =
/*#__PURE__*/
function () {
  function Genome() {
    _classCallCheck(this, Genome);

    this.id = null;
    this.species = null;
    this.connections = [];
    this.nodes = [];
    this.fitness = 0;
  }

  _createClass(Genome, [{
    key: "getInitialTopology",
    value: function getInitialTopology(inputs, outputs, connectionInnovation, nodeInnovation) {
      var n = [];

      for (var i = 0; i < inputs + outputs; ++i) {
        n.push(nodeInnovation.getInnovation());
      }

      for (var _i = 0; _i < inputs; ++_i) {
        this.addNode(new _node_gene.default(_node_gene.default.TYPE.INPUT, n[_i]));
      }

      for (var _i2 = 0; _i2 < outputs; ++_i2) {
        this.addNode(new _node_gene.default(_node_gene.default.TYPE.OUTPUT, n[_i2 + inputs]));
      }

      for (var _i3 = 0; _i3 < inputs; ++_i3) {
        for (var j = 0; j < outputs; ++j) {
          genome.addConnection(new _connection_gene.default(n[_i3], n[inputs + j], 0.5, true, connectionInnovation.getInnovation()));
        }
      }
    } // TODO: add tries

  }, {
    key: "addConnectionMutation",
    value: function addConnectionMutation(connectionCounter) {
      var node1 = this.nodes[(0, _helpers.randInt)(0, this.nodes.length - 1)];
      var node2 = this.nodes[(0, _helpers.randInt)(0, this.nodes.length - 1)];
      var weight = (0, _helpers.rand)(-_parameters.default.RandomWeightRange / 2, _parameters.default.RandomWeightRange / 2);
      var reversed = false;
      if (node1.type === _node_gene.default.TYPE.HIDDEN && node2.type === _node_gene.default.TYPE.INPUT) reversed = true;else if (node1.type === _node_gene.default.TYPE.OUTPUT && node2.type === _node_gene.default.TYPE.HIDDEN) reversed = true;else if (node1.type === _node_gene.default.TYPE.OUTPUT && node2.type === _node_gene.default.TYPE.INPUT) reversed = true;
      var connectionImpossible = false;
      if (node1.type === _node_gene.default.TYPE.INPUT && node2.type === _node_gene.default.TYPE.INPUT) connectionImpossible = true;else if (node1.type === _node_gene.default.TYPE.OUTPUT && node2.type === _node_gene.default.TYPE.OUTPUT) connectionImpossible = true;else if (node1.id === node2.id) connectionImpossible = true;
      var connectionExists = false;

      for (var i = 0; i < this.connections.length; ++i) {
        if (this.connections[i].inNode === node1.id && this.connections[i].outNode === node2.id) {
          connectionExists = true;
          break;
        }

        if (this.connections[i].inNode === node2.id && this.connections[i].outNode === node1.id) {
          connectionExists = true;
          break;
        }
      }

      if (connectionExists || connectionImpossible) return;
      var newConnection = new _connection_gene.default(reversed ? node2.id : node1.id, reversed ? node1.id : node2.id, weight, true, connectionCounter.getInnovation());
      this.addConnection(newConnection);
    }
  }, {
    key: "addNodeMutation",
    value: function addNodeMutation(nodeCounter, connectionCounter) {
      var connection = this.connections[(0, _helpers.randInt)(0, this.connections.length - 1)];
      var inNode = this.getNodeById(connection.inNode);
      var outNode = this.getNodeById(connection.outNode);
      connection.enabled = false;
      var newNode = new _node_gene.default(_node_gene.default.TYPE.HIDDEN, nodeCounter.getInnovation());
      var inToNew = new _connection_gene.default(inNode.id, newNode.id, 1, true, connectionCounter.getInnovation());
      var newToOut = new _connection_gene.default(newNode.id, outNode.id, connection.weight, true, connectionCounter.getInnovation());
      this.addNode(newNode);
      this.addConnection(inToNew);
      this.addConnection(newToOut);
    }
  }, {
    key: "mutateConnectionWeights",
    value: function mutateConnectionWeights() {
      for (var i = 0; i < this.connections.length; ++i) {
        if ((0, _helpers.rand)(0, 1) < _parameters.default.probEachWeightUniformPerturb) {
          this.connections[i].weight += (0, _helpers.randGaussian)();
        } else {
          this.connections[i].weight = (0, _helpers.rand)(-_parameters.default.RandomWeightRange / 2, _parameters.default.RandomWeightRange / 2);
        }
      }
    }
  }, {
    key: "getNodeById",
    value: function getNodeById(id) {
      var node = this.nodes.find(function (node) {
        return node.id === id;
      });
      if (node === undefined) return null;
      return node;
    }
  }, {
    key: "getConnection",
    value: function getConnection(innovation) {
      var connection = this.connections.find(function (connection) {
        return connection.innovation === innovation;
      });
      if (connection === undefined) return null;
      return connection;
    } // TODO: use GenesisGenome

  }, {
    key: "randomizeAllWeights",
    value: function randomizeAllWeights() {
      for (var i = 0; i < this.connections.length; ++i) {
        this.connections[i].weight = (0, _helpers.rand)(-_parameters.default.RandomWeightRange / 2, _parameters.default.RandomWeightRange / 2);
      }
    }
  }, {
    key: "copy",
    value: function copy() {
      var newConnections = [];
      var newNodes = [];

      for (var i = 0; i < this.connections.length; ++i) {
        newConnections.push(this.connections[i].copy());
      }

      for (var _i4 = 0; _i4 < this.nodes.length; ++_i4) {
        newNodes.push(this.nodes[_i4].copy());
      }

      var newGenome = new Genome();
      newGenome.connections = newConnections;
      newGenome.nodes = newNodes;
      newGenome.fitness = this.fitness;
      return newGenome;
    }
  }, {
    key: "addNode",
    value: function addNode(node) {
      this.nodes.push(node);
    }
  }, {
    key: "addConnection",
    value: function addConnection(connection) {
      this.connections.push(connection);
      var net = new _feed_forward_network.default(this);

      if (!net.checkCycles()) {
        return true;
      } else {
        this.connections.pop();
        return false;
      }
    }
  }]);

  return Genome;
}();

exports.default = Genome;
; // parent1 should be fitter than parent2

Genome.crossover = function (parent1, parent2) {
  var child = new Genome();

  for (var i = 0; i < parent1.nodes.length; ++i) {
    var matchingNode = parent2.getNodeById(parent1.nodes[i].id);

    if (matchingNode !== null) {
      var childNodeGene = Math.random() >= 0.5 ? parent1.nodes[i].copy() : matchingNode.copy();
      child.addNode(childNodeGene);
    } else {
      var _childNodeGene = parent1.nodes[i].copy();

      child.addNode(_childNodeGene);
    }
  }

  for (var _i5 = 0; _i5 < parent1.connections.length; ++_i5) {
    var matchingConnection = parent2.getConnection(parent1.connections[_i5].innovation);
    var childConnectionGene = void 0;

    if (matchingConnection !== null) {
      childConnectionGene = Math.random() >= 0.5 ? parent1.connections[_i5].copy() : matchingConnection.copy();
      var disabled = !parent1.connections[_i5].enabled || !matchingConnection.enabled;
      if (disabled && Math.random() < _parameters.default.disableGeneInheritingChance) childConnectionGene.enabled = false;
      child.addConnection(childConnectionGene);
    } else {
      childConnectionGene = parent1.connections[_i5].copy();
      child.addConnection(childConnectionGene);
    }
  }

  return child;
};

Genome.compatibilityDistance = function (genome1, genome2) {
  var N = Math.max(genome1.nodes.length + genome1.connections.length, genome2.nodes.length + genome2.connections.length);
  var compatibilities = Genome.getGenesCompatibility(genome1, genome2); // TODO: check value of N
  // N = 1;

  return _parameters.default.c1 * compatibilities.excess / N + _parameters.default.c2 * compatibilities.disjoint / N + _parameters.default.c3 * compatibilities.avgWeightDiff;
};

Genome.getGenesCompatibility = function (genome1, genome2) {
  var nodesMatching = 0,
      connectionMatching = 0,
      disjoint = 0,
      excess = 0; // count matching node genes

  var nodegenes1 = genome1.nodes.map(function (node) {
    return node.id;
  }).sort(function (id1, id2) {
    return id1 < id2 ? -1 : 1;
  });
  var nodegenes2 = genome2.nodes.map(function (node) {
    return node.id;
  }).sort(function (id1, id2) {
    return id1 < id2 ? -1 : 1;
  });
  var i = nodegenes1.length - 1;
  var j = nodegenes2.length - 1;

  while (i >= 0 && j >= 0) {
    if (nodegenes1[i] === nodegenes2[j]) {
      ++nodesMatching;
      --i;
      --j;
    } else {
      if (nodegenes1[i] < nodegenes2[j]) {
        if (nodegenes2[j] > nodegenes1[nodegenes1.length - 1]) ++excess;else ++disjoint;
        --j;
      } else {
        if (nodegenes1[i] > nodegenes2[nodegenes2.length - 1]) ++excess;else ++disjoint;
        --i;
      }
    }
  } // count matching connection genes


  var weightDiff = 0;
  var connectiongenes1 = genome1.connections.map(function (connection) {
    return {
      innovation: connection.innovation,
      weight: connection.weight
    };
  }).sort(function (conn1, conn2) {
    return conn1.innovation < conn2.innovation ? -1 : 1;
  });
  var connectiongenes2 = genome2.connections.map(function (connection) {
    return {
      innovation: connection.innovation,
      weight: connection.weight
    };
  }).sort(function (conn1, conn2) {
    return conn1.innovation < conn2.innovation ? -1 : 1;
  });
  i = connectiongenes1.length - 1;
  j = connectiongenes2.length - 1;

  while (i >= 0 && j >= 0) {
    if (connectiongenes1[i].innovation === connectiongenes2[j].innovation) {
      ++connectionMatching;
      weightDiff += Math.abs(connectiongenes1[i].weight - connectiongenes2[j].weight);
      --i;
      --j;
    } else {
      if (connectiongenes1[i].innovation < connectiongenes2[j].innovation) {
        if (connectiongenes2[j].innovation > connectiongenes1[connectiongenes1.length - 1].innovation) ++excess;else ++disjoint;
        --j;
      } else {
        if (connectiongenes1[i].innovation > connectiongenes2[connectiongenes2.length - 1].innovation) ++excess;else ++disjoint;
        --i;
      }
    }
  }

  var avgWeightDiff = connectionMatching > 0 ? weightDiff / connectionMatching : 0;
  return {
    matching: nodesMatching + connectionMatching,
    disjoint: disjoint,
    excess: excess,
    avgWeightDiff: avgWeightDiff
  };
};
},{"./connection_gene":"connection_gene.js","./helpers":"helpers.js","./node_gene":"node_gene.js","./parameters":"parameters.js","./feed_forward_network":"feed_forward_network.js"}],"innovation_generator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InnovationGenerator = function InnovationGenerator() {
  _classCallCheck(this, InnovationGenerator);

  var currentInnovation = -1;

  this.getInnovation = function () {
    ++currentInnovation;
    return currentInnovation;
  };

  this.reset = function () {
    currentInnovation = -1;
  };
};

exports.default = InnovationGenerator;
},{}],"species.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("./helpers");

var _parameters = _interopRequireDefault(require("./parameters"));

var _genome = _interopRequireDefault(require("./genome"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: set compatibility threshold dynamically to make no of species remain constant
var Species =
/*#__PURE__*/
function () {
  function Species(representative) {
    _classCallCheck(this, Species);

    this.representative = representative;
    this.members = [representative];
    this.totalAdjustedFitness = 0;
  }

  _createClass(Species, [{
    key: "addAdjustedFitness",
    value: function addAdjustedFitness(adjustedFitness) {
      this.totalAdjustedFitness += adjustedFitness;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.members.sort(function (g1, g2) {
        return g1.fitness > g2.fitness ? -1 : 1;
      });
      this.representative = this.members[0];
      this.members.splice(0, this.members.length);
      this.totalAdjustedFitness = 0;
    }
  }, {
    key: "cull",
    value: function cull() {
      this.members.sort(function (g1, g2) {
        return g1.fitness > g2.fitness ? -1 : 1;
      });
      var killTill = Math.ceil(this.members.length * (1 - _parameters.default.cullRate));

      for (var i = this.members.length; i >= killTill; --i) {
        this.members.splice(i, 1);
      }
    }
  }]);

  return Species;
}();

exports.default = Species;
;

Species.reproduce = function (species, nodeInnovation, connectionInnovation) {
  // TODO: implement stagnation
  var speciesRemaining = _toConsumableArray(species);

  var previousSize = speciesRemaining.map(function (s) {
    return s.members.length;
  });
  var minSpeciesSize = previousSize.map(function (p) {
    return Math.max(_parameters.default.elitismRate * p, _parameters.default.minSpeciesSize);
  });
  var adjustedFitness = speciesRemaining.map(function (s) {
    return s.totalAdjustedFitness;
  });
  var spawnAmounts = Species.computeSpawnAmounts(previousSize, minSpeciesSize, adjustedFitness);
  var newPopulation = []; // console.log(previousSize, minSpeciesSize, adjustedFitness, spawnAmounts);

  for (var i = 0; i < speciesRemaining.length; ++i) {
    var s = speciesRemaining[i];
    var spawn = Math.max(previousSize[i] * _parameters.default.elitismRate, spawnAmounts[i]);
    if (spawn < 0) throw new Error("Spawning should be positive");
    var oldMembers = s.members.map(function (g) {
      return g.copy();
    });
    oldMembers.sort(function (g1, g2) {
      return g1.fitness > g2.fitness ? -1 : 1;
    });

    for (var j = 0; j < Math.ceil(s.members.length * _parameters.default.elitismRate); ++j) {
      newPopulation.push(s.members[j]);
      --spawn;
    }

    if (spawn <= 0) continue;
    var cutOff = Math.ceil(_parameters.default.survivalThreshold * oldMembers.length);
    if (oldMembers.length > 1) cutOff = Math.max(2, cutOff);

    while (cutOff < oldMembers.length) {
      oldMembers.pop();
    }

    while (spawn > 0) {
      spawn -= 1;
      var id1 = (0, _helpers.randInt)(0, oldMembers.length - 1);
      var id2 = (0, _helpers.randInt)(0, oldMembers.length - 1);
      var parent1 = oldMembers[id1];
      var parent2 = oldMembers[id2];
      var child = void 0;

      if (Math.random() > _parameters.default.asexualReproductionRate && id1 !== id2) {
        if (parent1.fitness > parent2.fitness) {
          child = _genome.default.crossover(parent1, parent2);
        } else {
          child = _genome.default.crossover(parent2, parent1);
        }

        if (Math.random() < _parameters.default.probGenomeMutateConnectionWeights) child.mutateConnectionWeights();
        if (Math.random() < _parameters.default.addConnectionRate) child.addConnectionMutation(connectionInnovation);
        if (Math.random() < _parameters.default.addNodeRate) child.addNodeMutation(nodeInnovation, connectionInnovation);
      } else {
        child = parent1.copy();
        if (Math.random() < _parameters.default.probGenomeMutateConnectionWeights) child.mutateConnectionWeights();
      }

      newPopulation.push(child);
    }
  }

  return newPopulation;
};

Species.computeSpawnAmounts = function (previousSize, minSpeciesSize, adjustedFitness) {
  var afSum = adjustedFitness.reduce(function (a, b) {
    return a + b;
  }, 0);
  var spawnAmounts = [];

  for (var i = 0; i < adjustedFitness.length; ++i) {
    var s = Math.max(minSpeciesSize[i], adjustedFitness[i] / afSum * _parameters.default.PopulationSize); // TODO: check why / 2

    var d = (s - previousSize[i]) / 2;
    var c = Math.round(d);
    var spawn = previousSize[i];
    if (Math.abs(c) > 0) spawn += c;else if (d > 0) spawn += 1;else spawn -= 1;
    spawnAmounts.push(spawn);
  }

  var totalSpawn = spawnAmounts.reduce(function (a, b) {
    return a + b;
  }, 0);
  var norm = _parameters.default.PopulationSize / totalSpawn;
  spawnAmounts = spawnAmounts.map(function (s, i) {
    return Math.max(minSpeciesSize[i], Math.round(norm * s));
  }); // spawnAmounts = spawnAmounts.map((s, i) => Math.round(norm * s));

  return spawnAmounts;
};

Species.speciate = function (species, genomes) {
  // Place genomes into species
  for (var i = 0; i < species.length; ++i) {
    species[i].reset();
  }

  for (var _i = 0; _i < genomes.length; ++_i) {
    var speciesFound = false;

    for (var j = 0; j < species.length; ++j) {
      if (_genome.default.compatibilityDistance(genomes[_i], species[j].representative) < _parameters.default.compatibilityThreshold) {
        species[j].members.push(genomes[_i]);
        speciesFound = true;
        genomes[_i].species = j;
        break;
      }
    }

    if (!speciesFound) {
      var newSpecies = new Species(genomes[_i]);
      species.push(newSpecies);
      genomes[_i].species = species.length - 1;
    }
  }

  return species;
};
},{"./helpers":"helpers.js","./parameters":"parameters.js","./genome":"genome.js"}],"evaluator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _species = _interopRequireDefault(require("./species"));

var _genome = _interopRequireDefault(require("./genome"));

var _parameters = _interopRequireDefault(require("./parameters"));

var _innovation_generator = _interopRequireDefault(require("./innovation_generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Evaluator =
/*#__PURE__*/
function () {
  function Evaluator(startingGenome, connectionInnovation, nodeInnovation) {
    _classCallCheck(this, Evaluator);

    if (this.constructor === Evaluator) {
      throw new Error("Evaluator cannot be instantiated");
    }

    this.populationSize = _parameters.default.PopulationSize;
    this.genomeIdGenerator = new _innovation_generator.default();
    this.genomes = [];

    for (var i = 0; i < this.populationSize; ++i) {
      var initialGenome = startingGenome.copy();
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
    this.generation = 0; // Place genomes into species

    this.species = _species.default.speciate(this.species, this.genomes);
  }

  _createClass(Evaluator, [{
    key: "evaluate",
    value: function evaluate() {
      // reset everything for next generation
      this.nextGenGenomes = [];
      this.fittestGenome = null;
      this.highestScore = 0;
      this.genomeIdGenerator.reset(); // Evaluate genomes and assign fitness

      for (var i = 0; i < this.species.length; ++i) {
        for (var j = 0; j < this.species[i].members.length; ++j) {
          var s = this.species[i];
          var g = this.species[i].members[j];
          var score = this.evaluateGenome(g);
          var adjustedScore = score / s.members.length;
          s.addAdjustedFitness(adjustedScore);
          g.fitness = adjustedScore;

          if (score > this.highestScore) {
            this.highestScore = score;
            this.fittestGenome = g;
          }
        }
      } // Cull genome in each Species


      for (var _i = 0; _i < this.species.length; ++_i) {
        this.species[_i].cull();
      } // remove empty species


      for (var _i2 = this.species.length - 1; _i2 >= 0; --_i2) {
        if (this.species[_i2].members.length === 0) {
          this.species.splice(_i2, 1);
        }
      } // breed rest of the genomes


      this.nextGenGenomes = _species.default.reproduce(this.species, this.nodeInnovation, this.connectionInnovation);
      this.genomes = _toConsumableArray(this.nextGenGenomes);

      for (var _i3 = 0; _i3 < this.genomes.length; ++_i3) {
        this.genomes[_i3].id = this.genomeIdGenerator.getInnovation();
      }

      this.populationSize = this.genomes.length;
      ++this.generation; // Place genomes into species

      this.species = _species.default.speciate(this.species, this.genomes);
    }
  }, {
    key: "evaluateGenome",
    value: function evaluateGenome(genome) {
      throw new Error("Method evaluateGenome() must be implemented");
    }
  }]);

  return Evaluator;
}();

exports.default = Evaluator;
;
},{"./species":"species.js","./genome":"genome.js","./parameters":"parameters.js","./innovation_generator":"innovation_generator.js"}],"neat.js":[function(require,module,exports) {
"use strict";

var _genome = _interopRequireDefault(require("./genome"));

var _innovation_generator = _interopRequireDefault(require("./innovation_generator"));

var _node_gene = _interopRequireDefault(require("./node_gene"));

var _connection_gene = _interopRequireDefault(require("./connection_gene"));

var _evaluator = _interopRequireDefault(require("./evaluator"));

var _feed_forward_network = _interopRequireDefault(require("./feed_forward_network"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Genome = _genome.default;
window.NodeGene = _node_gene.default;
window.ConnectionGene = _connection_gene.default;
window.InnovationGenerator = _innovation_generator.default;
window.Evaluator = _evaluator.default;
window.FeedForwardNetwork = _feed_forward_network.default;
},{"./genome":"genome.js","./innovation_generator":"innovation_generator.js","./node_gene":"node_gene.js","./connection_gene":"connection_gene.js","./evaluator":"evaluator.js","./feed_forward_network":"feed_forward_network.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38749" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","neat.js"], null)