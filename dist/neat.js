parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"B7pA":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function n(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var i=function(){function t(n,i,o,r,a){e(this,t),this.inNode=n,this.outNode=i,this.weight=o,this.enabled=r,this.innovation=a}return n(t,[{key:"copy",value:function(){return new t(this.inNode,this.outNode,this.weight,this.enabled,this.innovation)}}]),t}();exports.default=i;
},{}],"lTk1":[function(require,module,exports) {
"use strict";function r(r,t){return Math.floor(Math.random()*(t-r+1))+r}function t(r,t){return Math.random()*(t-r)+r}function a(){for(var r=0,t=0;0===r;)r=Math.random();for(;0===t;)t=Math.random();return Math.sqrt(-2*Math.log(r))*Math.cos(2*Math.PI*t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.randInt=r,exports.rand=t,exports.randGaussian=a;
},{}],"KUc5":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r={INPUT:0,HIDDEN:1,OUTPUT:2},i=function(){function t(n,r){e(this,t),this.type=n,this.id=r}return n(t,[{key:"copy",value:function(){return new t(this.type,this.id)}}]),t}();exports.default=i,Object.defineProperty(i,"TYPE",{value:r,writable:!1});
},{}],"xuC4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e={RandomWeightRange:4,probGenomeMutateConnectionWeights:.8,probEachWeightUniformPerturb:.9,c1:2,c2:2,c3:.4,compatibilityThreshold:3,addConnectionRate:.4,addNodeRate:.25,cullRate:.8,asexualReproductionRate:.25,elitismRate:.1,mutateToggleEnable:.3,disableGeneInheritingChance:.3,minSpeciesSize:1,PopulationSize:100},t=e;exports.default=t;
},{}],"hCEY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=e(require("./node_gene"));function e(t){return t&&t.__esModule?t:{default:t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function r(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}var o=function(){function e(t){n(this,e),this.network=[];for(var i=0;i<t.nodes.length;++i)this.network.push({neuron:new u(t.nodes[i].id,t.nodes[i].type),incoming:[],weights:[]});this.network.sort(function(t,e){return t.neuron.id<e.neuron.id?-1:1});for(var r=0;r<t.connections.length;++r)if(t.connections[r].enabled){var o=t.connections[r].inNode,s=t.connections[r].outNode;this.network[this.getNeuronIndex(s)].incoming.push(o),this.network[this.getNeuronIndex(s)].weights.push(t.connections[r].weight)}}return r(e,[{key:"getNeuronIndex",value:function(t){for(var e=0,n=this.network.length-1;e<=n;){var i=Math.floor((e+n)/2);if(this.network[i].neuron.id===t)return i;this.network[i].neuron.id<t?e=i+1:n=i-1}}},{key:"calculateNeuronOutput",value:function(t){var e=this.getNeuronIndex(t);if(!this.network[e].neuron.activated){for(var n=0;n<this.network[e].incoming.length;++n){this.calculateNeuronOutput(this.network[e].incoming[n]);var i=this.network[this.getNeuronIndex(this.network[e].incoming[n])].neuron;this.network[e].neuron.value+=i.value*this.network[e].weights[n]}this.network[e].neuron.activateSigmoid()}}},{key:"feed",value:function(e){for(var n=0,i=0;i<this.network.length&&(this.network[i].neuron.type===t.default.TYPE.INPUT&&(this.network[i].neuron.value=e[n],this.network[i].neuron.activated=!0,++n),n!==e.length);++i);for(var r=[],o=0;o<this.network.length;++o)this.network[o].neuron.type===t.default.TYPE.OUTPUT&&(this.calculateNeuronOutput(this.network[o].neuron.id),r.push(this.network[o].neuron.value));return this.resetValues(),r}},{key:"dfs",value:function(t){var e=this.getNeuronIndex(t);if(!this.visited[e]){this.visited[e]=!0,this.inStack[e]=!0;for(var n=0;n<this.network[e].incoming.length;++n){var i=this.network[e].incoming[n];if(!this.visited[this.getNeuronIndex(i)]&&this.dfs(i))return!0;if(this.inStack[this.getNeuronIndex(i)])return!0}}return this.inStack[e]=!1,!1}},{key:"checkCycles",value:function(){this.visited=new Array(this.network.length),this.visited.fill(!1),this.inStack=new Array(this.network.length),this.inStack.fill(!1);for(var t=0;t<this.network.length;++t)if(this.dfs(this.network[t].neuron.id))return!0;return!1}},{key:"resetValues",value:function(){for(var t=0;t<this.network.length;++t)this.network[t].neuron.value=0,this.network[t].neuron.activated=!1}}]),e}();exports.default=o;var u=function(){function t(e,i){n(this,t),this.id=e,this.type=i,this.activated=!1,this.value=0}return r(t,[{key:"activateSigmoid",value:function(){this.value=1/(1+Math.exp(-this.value)),this.activated=!0}},{key:"activateRelu",value:function(){this.value=Math.max(this.value,0),this.activated=!0}}]),t}();
},{"./node_gene":"KUc5"}],"xE0e":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var n=a(require("./connection_gene")),e=require("./helpers"),t=a(require("./node_gene")),o=a(require("./parameters")),i=a(require("./feed_forward_network"));function a(n){return n&&n.__esModule?n:{default:n}}function d(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function r(n,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function s(n,e,t){return e&&r(n.prototype,e),t&&r(n,t),n}var c=function(){function a(){d(this,a),this.connections=[],this.nodes=[],this.fitness=0}return s(a,[{key:"addConnectionMutation",value:function(i){var a=this.nodes[(0,e.randInt)(0,this.nodes.length-1)],d=this.nodes[(0,e.randInt)(0,this.nodes.length-1)],r=(0,e.rand)(-o.default.RandomWeightRange/2,o.default.RandomWeightRange/2),s=!1;a.type===t.default.TYPE.HIDDEN&&d.type===t.default.TYPE.INPUT?s=!0:a.type===t.default.TYPE.OUTPUT&&d.type===t.default.TYPE.HIDDEN?s=!0:a.type===t.default.TYPE.OUTPUT&&d.type===t.default.TYPE.INPUT&&(s=!0);var c=!1;a.type===t.default.TYPE.INPUT&&d.type===t.default.TYPE.INPUT?c=!0:a.type===t.default.TYPE.OUTPUT&&d.type===t.default.TYPE.OUTPUT?c=!0:a.id===d.id&&(c=!0);for(var u=!1,h=0;h<this.connections.length;++h){if(this.connections[h].inNode===a.id&&this.connections[h].outNode===d.id){u=!0;break}if(this.connections[h].inNode===d.id&&this.connections[h].outNode===a.id){u=!0;break}}if(!u&&!c){var l=new n.default(s?d.id:a.id,s?a.id:d.id,r,!0,i.getInnovation());this.addConnection(l)}}},{key:"addNodeMutation",value:function(o,i){var a=this.connections[(0,e.randInt)(0,this.connections.length-1)],d=this.getNodeById(a.inNode),r=this.getNodeById(a.outNode);a.enabled=!1;var s=new t.default(t.default.TYPE.HIDDEN,o.getInnovation()),c=new n.default(d.id,s.id,1,!0,i.getInnovation()),u=new n.default(s.id,r.id,a.weight,!0,i.getInnovation());this.addNode(s),this.addConnection(c),this.addConnection(u)}},{key:"mutateConnectionWeights",value:function(){for(var n=0;n<this.connections.length;++n)(0,e.rand)(0,1)<o.default.probEachWeightUniformPerturb?this.connections[n].weight+=(0,e.randGaussian)():this.connections[n].weight=(0,e.rand)(-o.default.RandomWeightRange/2,o.default.RandomWeightRange/2)}},{key:"getNodeById",value:function(n){var e=this.nodes.find(function(e){return e.id===n});return void 0===e?null:e}},{key:"getConnection",value:function(n){var e=this.connections.find(function(e){return e.innovation===n});return void 0===e?null:e}},{key:"randomizeAllWeights",value:function(){for(var n=0;n<this.connections.length;++n)this.connections[n].weight=(0,e.rand)(-o.default.RandomWeightRange/2,o.default.RandomWeightRange/2)}},{key:"copy",value:function(){for(var n=[],e=[],t=0;t<this.connections.length;++t)n.push(this.connections[t].copy());for(var o=0;o<this.nodes.length;++o)e.push(this.nodes[o].copy());var i=new a;return i.connections=n,i.nodes=e,i.fitness=this.fitness,i}},{key:"addNode",value:function(n){this.nodes.push(n)}},{key:"addConnection",value:function(n){return this.connections.push(n),!new i.default(this).checkCycles()||(this.connections.pop(),!1)}}]),a}();exports.default=c,c.crossover=function(n,e){for(var t=new c,i=0;i<n.nodes.length;++i){var a=e.getNodeById(n.nodes[i].id);if(null!==a){var d=Math.random()>=.5?n.nodes[i].copy():a.copy();t.addNode(d)}else{var r=n.nodes[i].copy();t.addNode(r)}}for(var s=0;s<n.connections.length;++s){var u=e.getConnection(n.connections[s].innovation),h=void 0;if(null!==u)h=Math.random()>=.5?n.connections[s].copy():u.copy(),(!n.connections[s].enabled||!u.enabled)&&Math.random()<o.default.disableGeneInheritingChance&&(h.enabled=!1),t.addConnection(h);else h=n.connections[s].copy(),t.addConnection(h)}return t},c.compatibilityDistance=function(n,e){var t=Math.max(n.nodes.length+n.connections.length,e.nodes.length+e.connections.length),i=c.getGenesCompatibility(n,e);return o.default.c1*i.excess/t+o.default.c2*i.disjoint/t+o.default.c3*i.avgWeightDiff},c.getGenesCompatibility=function(n,e){for(var t=0,o=0,i=0,a=0,d=n.nodes.map(function(n){return n.id}).sort(function(n,e){return n<e?-1:1}),r=e.nodes.map(function(n){return n.id}).sort(function(n,e){return n<e?-1:1}),s=d.length-1,c=r.length-1;s>=0&&c>=0;)d[s]===r[c]?(++t,--s,--c):d[s]<r[c]?(r[c]>d[d.length-1]?++a:++i,--c):(d[s]>r[r.length-1]?++a:++i,--s);var u=0,h=n.connections.map(function(n){return{innovation:n.innovation,weight:n.weight}}).sort(function(n,e){return n.innovation<e.innovation?-1:1}),l=e.connections.map(function(n){return{innovation:n.innovation,weight:n.weight}}).sort(function(n,e){return n.innovation<e.innovation?-1:1});for(s=h.length-1,c=l.length-1;s>=0&&c>=0;)h[s].innovation===l[c].innovation?(++o,u+=Math.abs(h[s].weight-l[c].weight),--s,--c):h[s].innovation<l[c].innovation?(l[c].innovation>h[h.length-1].innovation?++a:++i,--c):(h[s].innovation>l[l.length-1].innovation?++a:++i,--s);return{matching:t+o,disjoint:i,excess:a,avgWeightDiff:o>0?u/o:0}};
},{"./connection_gene":"B7pA","./helpers":"lTk1","./node_gene":"KUc5","./parameters":"xuC4","./feed_forward_network":"hCEY"}],"VVA4":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=function e(){t(this,e);var n=-1;this.getInnovation=function(){return++n}};exports.default=e;
},{}],"XZ32":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./helpers"),t=r(require("./parameters")),n=r(require("./genome"));function r(e){return e&&e.__esModule?e:{default:e}}function a(e){return u(e)||i(e)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function i(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function u(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),e}var d=function(){function n(e){s(this,n),this.representative=e,this.members=[e],this.totalAdjustedFitness=0}return f(n,[{key:"addAdjustedFitness",value:function(e){this.totalAdjustedFitness+=e}},{key:"reset",value:function(){this.representative=this.members[(0,e.randInt)(0,this.members.length-1)],this.members.splice(0,this.members.length),this.totalAdjustedFitness=0}},{key:"cull",value:function(){this.members.sort(function(e,t){return e.fitness>t.fitness?-1:1});for(var e=Math.ceil(this.members.length*(1-t.default.cullRate)),n=this.members.length;n>=e;--n)this.members.splice(n,1)}}]),n}();exports.default=d,d.reproduce=function(r,o,i){for(var u=a(r),s=u.map(function(e){return e.members.length}),l=s.map(function(e){return Math.max(t.default.elitismRate*e,t.default.minSpeciesSize)}),f=u.map(function(e){return e.totalAdjustedFitness}),m=d.computeSpawnAmounts(s,l,f),c=[],h=0;h<u.length;++h){var p=u[h],b=Math.max(s[h]*t.default.elitismRate,m[h]);if(b<0)throw new Error("Spawning should be positive");var v=p.members.map(function(e){return e.copy()});v.sort(function(e,t){return e.fitness>t.fitness?-1:1});for(var g=0;g<Math.floor(p.members.length*t.default.elitismRate);++g)c.push(p.members[g]),--b;if(!(b<=0))for(;b>0;){b-=1;var M=(0,e.randInt)(0,v.length-1),y=(0,e.randInt)(0,v.length-1),A=v[M],w=v[y],j=void 0;Math.random()>t.default.asexualReproductionRate&&M!==y?(j=A.fitness>w.fitness?n.default.crossover(A,w):n.default.crossover(w,A),Math.random()<t.default.probGenomeMutateConnectionWeights&&j.mutateConnectionWeights(),Math.random()<t.default.addConnectionRate&&j.addConnectionMutation(i),Math.random()<t.default.addNodeRate&&j.addNodeMutation(o,i)):(j=A.copy(),Math.random()<t.default.probGenomeMutateConnectionWeights&&j.mutateConnectionWeights()),c.push(j)}}return c},d.computeSpawnAmounts=function(e,n,r){for(var a=r.reduce(function(e,t){return e+t},0),o=[],i=0;i<r.length;++i){var u=(Math.max(n[i],r[i]/a*t.default.PopulationSize)-e[i])/2,s=Math.round(u),l=e[i];Math.abs(s)>0?l+=s:u>0?l+=1:l-=1,o.push(l)}var f=o.reduce(function(e,t){return e+t},0),d=t.default.PopulationSize/f;return o=o.map(function(e,t){return Math.max(n[t],Math.round(d*e))})};
},{"./helpers":"lTk1","./parameters":"xuC4","./genome":"xE0e"}],"pLPt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=s(require("./species")),t=s(require("./genome")),i=s(require("./parameters"));function s(e){return e&&e.__esModule?e:{default:e}}function n(e){return a(e)||o(e)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function o(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function a(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function l(e,t,i){return t&&c(e.prototype,t),i&&c(e,i),e}var u=function(){function s(e,t,n){if(h(this,s),this.constructor===s)throw new Error("Evaluator cannot be instantiated");this.populationSize=i.default.PopulationSize,this.genomes=[];for(var r=0;r<this.populationSize;++r){var o=e.copy();o.randomizeAllWeights(),this.genomes.push(o)}this.nextGenGenomes=[],this.species=[],this.connectionInnovation=t,this.nodeInnovation=n,this.highestScore=0,this.fittestGenome,this.generation=0}return l(s,[{key:"evaluate",value:function(){for(var s=0;s<this.species.length;++s)this.species[s].reset();this.nextGenGenomes=[],this.fittestGenome=null,this.highestScore=0;for(var r=0;r<this.genomes.length;++r){for(var o=!1,a=0;a<this.species.length;++a)if(t.default.compatibilityDistance(this.genomes[r],this.species[a].representative)<i.default.compatibilityThreshold){this.species[a].members.push(this.genomes[r]),o=!0;break}if(!o){var h=new e.default(this.genomes[r]);this.species.push(h)}}for(var c=0;c<this.species.length;++c)for(var l=0;l<this.species[c].members.length;++l){var u=this.species[c],p=this.species[c].members[l],f=this.evaluateGenome(p),m=f/u.members.length;u.addAdjustedFitness(m),p.fitness=m,f>this.highestScore&&(this.highestScore=f,this.fittestGenome=p)}for(var g=0;g<this.species.length;++g)this.species[g].cull();for(var v=this.species.length-1;v>=0;--v)0===this.species[v].members.length&&this.species.splice(v,1);this.nextGenGenomes=e.default.reproduce(this.species,this.nodeInnovation,this.connectionInnovation),this.genomes=n(this.nextGenGenomes),this.populationSize=this.genomes.length,++this.generation}},{key:"evaluateGenome",value:function(e){throw new Error("Method evaluateGenome() must be implemented")}}]),s}();exports.default=u;
},{"./species":"XZ32","./genome":"xE0e","./parameters":"xuC4"}],"gyHp":[function(require,module,exports) {
"use strict";var e=i(require("./genome")),n=i(require("./innovation_generator")),o=i(require("./node_gene")),r=i(require("./connection_gene")),t=i(require("./evaluator")),d=i(require("./feed_forward_network"));function i(e){return e&&e.__esModule?e:{default:e}}window.Genome=e.default,window.NodeGene=o.default,window.ConnectionGene=r.default,window.InnovationGenerator=n.default,window.Evaluator=t.default,window.FeedForwardNetwork=d.default;
},{"./genome":"xE0e","./innovation_generator":"VVA4","./node_gene":"KUc5","./connection_gene":"B7pA","./evaluator":"pLPt","./feed_forward_network":"hCEY"}]},{},["gyHp"], null)
//# sourceMappingURL=/neat.js.map