// private Map<Integer, List<Integer>> adjListArray; 
// 	private Map<Integer, Integer> ancestors;
// 	private int root; 
function RootedTriplet(a, b, c) {
    this.a = a; 
    this.b = b; 
    this.c = c; 

    this.toString = function toString() {
        return a+","+b+"|"+c;
    };
}



function PhylTree() {
    this.root = 0; 
    this.ancestors = new Map(); 
    this.adjListArray = new Map(); 
    
    this.addEdge = addEdge;
    this.getAncestors = getAncestors;
    this.lca = lca; 
    this.isConsistent = isConsistent;
    this.findAllTriplets = findAllTriplets;
    this.isLeaf = isLeaf;
    this.removeNode = removeNode;
}

function addEdge(src, dest) {
    if (!this.adjListArray.has(src)) {
        this.adjListArray.set(src, []);
    }

    if (!this.adjListArray.has(dest)) {
        this.adjListArray.set(dest, []); 
    }

    this.adjListArray.get(src).push(dest); 
    this.ancestors.set(dest, src);
}

function removeNode(node) {
    var anc = this.ancestors.get(node); 
    this.ancestors.delete(node); 
    this.adjListArray.delete(node); 
    var list = this.adjListArray.get(anc); 
    var newlist = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i] !== node) {
            newlist.push(list[i]);
        }
    }

    this.adjListArray.set(anc, newlist);

}

function getAncestors(a) {
    var allAncestors = []; 

    var current = a; 
    while (current != this.root) {
        if (!this.ancestors.has(current)) break; 
        var nextAncestor = this.ancestors.get(current); 
        allAncestors.push(nextAncestor);
        current = nextAncestor;
    }

    return allAncestors;
}

function lca(a, b) {
    ancestorsA = this.getAncestors(a); 
    ancestorsB = this.getAncestors(b); 

    for (var i = 0; i < ancestorsA.length; i++) {
        for (var j = 0; j < ancestorsB.length; j++) {
            if (ancestorsA[i] == ancestorsB[j]) {
                return ancestorsA[i];
            }
        }
    }

    return this.root; 
}

function isConsistent(triplet) {
    var lcaAB = this.lca(triplet.a, triplet.b); 
    var lcaAC = this.lca(triplet.a, triplet.c); 

    if (this.getAncestors(triplet.a).includes(triplet.c) || this.getAncestors(triplet.b).includes(triplet.c) 
        || this.getAncestors(triplet.a).includes(triplet.b) || this.getAncestors(triplet.b).includes(triplet.a)) {
    
        return false; 
    }

    var ancestors = this.getAncestors(lcaAB); 
    for (var i = 0; i < ancestors.length; i++) {
        if (lcaAC == ancestors[i]) {
            return true; 
        } 
    }

    return false; 
}

function findAllTriplets(labelMap) {
    triplets = []; 

    var keys = Array.from(this.adjListArray.keys()); 

    for (var i = 0; i < keys.length; i++) {
        if (!this.ancestors.has(keys[i]) || this.ancestors.get(keys[i]) === this.root) continue; 
        for (var j = 0; j < keys.length; j++) {
            if (!this.ancestors.has(keys[j]) || this.ancestors.get(keys[j]) === this.root) continue; 

            for (var k = 0; k < keys.length; k++) {
                if (this.isLeaf(keys[i]) && this.isLeaf(keys[j]) && this.isLeaf(keys[k]) && keys[i] < keys[j] && keys[i] !== keys[k] && keys[j] !== keys[k]) {
                    var t = new RootedTriplet(keys[i], keys[j], keys[k]); 
                    if (this.isConsistent(t)) {
                        var triplet = new RootedTriplet(labelMap.get(t.a), labelMap.get(t.b), labelMap.get(t.c));
                        triplets.push(new RootedTriplet(labelMap.get(keys[i]), labelMap.get(keys[j]), labelMap.get(keys[k])));
                    }
                    
                }
            }
        }
    }

    return triplets;
}



function isLeaf(a) {
    return this.adjListArray.get(a).length == 0;
}

// var tree = new PhylTree(); 
// tree.addEdge(0, 5);
// tree.addEdge(0, 6);
// tree.addEdge(5, 1); 
// tree.addEdge(5, 2); 
// tree.addEdge(6, 3); 
// tree.addEdge(6, 4);  
// console.log(tree.adjListArray);
// tree.getAncestors(1);
// console.log(tree.lca(1,3));
// var trip = new RootedTriplet(1,2,5); 
// console.log(tree.isConsistent(trip));
// console.log(tree.findAllTriplets());

