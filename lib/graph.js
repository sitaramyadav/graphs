var graph = {};

var Graph = function() {
    this.graph = {};
    this.edges = 0;
};

Graph.prototype = {
    addVertex: function(v) {
        this.graph[v] = this.graph[v] || [];
    },
    addEdge: function(source, desntination) {
        this.graph[source].push(desntination);
        this.graph[desntination].push(source);
        this.edges++;
    },
    hasEdgeBetween: function(source, desntination) {
        return this.graph[source].indexOf(desntination) >= 0;
    },order: function(){
        return Object.keys(this.graph).length;
    },
    size: function(){
        return this.edges;
    }
};

graph.DirectedGraph = function() {
    this.graph = {}
    this.edges = 0;
};

graph.UndirectedGraph = function() {
    this.graph = {}
    this.edges = 0;
};

graph.UndirectedGraph.prototype = Object.create(Graph.prototype);
graph.DirectedGraph.prototype = Object.create(Graph.prototype);
graph.DirectedGraph.prototype.addEdge  = function(source, desntination) {
    this.graph[source].push(desntination);
    this.edges++;
}
module.exports = graph;
