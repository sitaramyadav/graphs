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
    addEdge: function(source, destination) {
        if(this.graph[destination]==undefined)
            this.graph[destination]=[];
        this.graph[source].push(destination);
        this.graph[destination].push(source);
        this.edges++;
    },
    hasEdgeBetween: function(source, destination) {
        return this.graph[source].indexOf(destination) !=-1;
    },
    order: function(){
        return Object.keys(this.graph).length;
    },
    size: function(){
        return this.edges;
    },
    pathBetween: function(source, destination,path) {
        path=path||[];
        if(source == destination){
            return path.concat(destination);
        }
        for(var i in this.graph[source]){

            if(path.indexOf(source) == -1){
                var result = this.pathBetween(this.graph[source][i], destination, path.concat(source));
                if(result.slice(-1) == destination){
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
    },
    allPaths : function(source, destination,visited,paths) {
        visited=visited||[];
        paths=paths||[];
        if(source == destination){
            paths.push(visited.concat(source));
            return paths;
        }
        for(var i in this.graph[source]){
            var vertex = this.graph[source][i];
            if(visited.indexOf(vertex) == -1 && visited.indexOf(source) == -1){
                this.allPaths(vertex, destination, visited.concat(source),paths);
            }
        }
        return paths;
        }
};


graph.UndirectedGraph.prototype = Object.create(graph.prototype);
graph.DirectedGraph.prototype = Object.create(graph.prototype);
graph.DirectedGraph.prototype.addEdge  = function(source, destination) {
    this.graph[source].push(destination);
    this.edges++;
}
module.exports = graph;
