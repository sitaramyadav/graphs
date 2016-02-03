var ld = require('lodash');
var g = {};
g.WeightedGraph = function() {
    this.add_edge = {};
    this._ = {};
    this.edges = [];
}
g.WeightedGraph.prototype = {
    addVertex: function(vertex) {
        this.add_edge[vertex] = this.add_edge[vertex] || [];
        this._[vertex] = Infinity;
    },
    addEdge: function(edge) {
        this.edges.push(edge);
        this.add_edge[edge.source].push(edge);
        this.add_edge[edge.destination].push(edge);
    },
    shortestPath: function(source, destination) {
        var self = this;
        var vertices = Object.keys(this.add_edge);
        this._[source] = 0;
        var parent = {};
        parent[source] = source;
        while (vertices.length != 0) {
            var v = vertices[0];
            var i;
                if (this._[v] > this._[vertices[i]]) v = vertices[i]; 
            vertices.splice(vertices.indexOf(v), 1);                 
            for (var U in this.add_edge[v]) {
                var u = this.add_edge[v][U].destination;
                var add_edgeOfV = ld.find(this.add_edge[v], function(x) {
                    return x.source == v && x.destination == u
                });
                if (self._[u] > self._[v] + this.add_edge[v][U].weight) {
                    self._[u] = self._[v] + this.add_edge[v][U].weight;
                    parent[u] = v;
                }
            }
        }
        var shortestPath = [];
        while (source != destination) {
            var destination_1 = parent[destination];
            var add_edge = [];
            for (var v in self.edges)
                if (self.edges[v].destination == destination&&self.edges[v].source == destination_1) add_edge.push(self.edges[v]);
            var path = add_edge.reduce(function(x,y){
                return x.weight>y.weight?y:x;
            })
            shortestPath.push(path);
            destination = destination_1;

        }
        return shortestPath.reverse();
    }
};

g.Edge = function(id, v1, v2, weight) {
    this.id = id;
    this.source = v1;
    this.destination = v2;
    this.weight = weight;
}

module.exports = g;