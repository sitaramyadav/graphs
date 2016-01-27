var graph = {};
graph.DirectedGraph = function() {
    this.graph = {}
    this.edges = 0;
};

graph.UndirectedGraph = function() {
    this.graph = {}
    this.edges = 0;
};

graph.prototype = {
    addVertex: function(v) {
        this.graph[v] = this.graph[v] || [];
    },
    addEdge: function(source, desntination) {
        if(this.graph[desntination]==undefined)
            this.graph[desntination]=[];
        this.graph[source].push(desntination);
        this.graph[desntination].push(source);
        this.edges++;
    },
    hasEdgeBetween: function(source, desntination) {
        return this.graph[source].indexOf(desntination) !=-1;
    },
    order: function(){
        return Object.keys(this.graph).length;
    },
    size: function(){
        return this.edges;
    },
    pathBetween: function(source, desntination,path) {
        path=path||[];
        if(source == desntination){
            return path.concat(desntination);
        }
        for(var i in this.graph[source]){
            if(path.indexOf(source) == -1){
                var result = this.pathBetween(this.graph[source][i], desntination, path.concat(source));
                if(result.slice(-1) == desntination){
                    return result;
                }
            }
        }
        return [];  
    },
    farthestVertex: function(vertex) {
        var counter = 0;
        var farthestvertex=vertex;
        var result;
        for (var i in this.graph) {
            result = this.pathBetween(vertex, i).length;
            if (counter < result){
                counter = result;
                farthestvertex = i;
            }
        };
        return farthestvertex;
    }
};


graph.UndirectedGraph.prototype = Object.create(graph.prototype);
graph.DirectedGraph.prototype = Object.create(graph.prototype);
graph.DirectedGraph.prototype.addEdge  = function(source, desntination) {
    this.graph[source].push(desntination);
    this.edges++;
}
module.exports = graph;
