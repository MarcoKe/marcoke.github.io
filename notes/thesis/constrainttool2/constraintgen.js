triplets = []; 

function RootedTripletExt(a, b, c, inObj) {
    this.a = a; 
    this.b = b; 
    this.c = c; 
    this.inObj = inObj;

    this.toString = function toString() {
        var s = a+","+b+"|"+c;
        if (this.inObj) {
            s = "<span class='inObj'>" + s + "</span>";
        }
        return s; 

    };
}

function Constraint(a, b, c) {
    this.a = a; 
    this.b = b; 
    this.c = c; 
}

function ConstraintGroup(i, j, k, l, c1, c2, c3, c4) {
    this.i = i; 
    this.j = j; 
    this.k = k; 
    this.l = l; 
    this.c1 = c1; 
    this.c2 = c2; 
    this.c3 = c3; 
    this.c4 = c4; 
    this.standard = true;
}

function createExtTriplet(triplet, triplets) {
    return new RootedTripletExt(triplet.a, triplet.b, triplet.c, isInObj(triplet, triplets));    
}



function isInObj(triplet, triplets) {
    for (var i = 0; i < triplets.length; i++) {
        if (triplets[i].c === triplet.c && ((triplets[i].a === triplet.a && triplets[i].b === triplet.b) || (triplets[i].a === triplet.b && triplets[i].b === triplet.a))) {
            return true; 
        }
    }
    return false;
}

function generateConstraints(triplets, corruptedTriplets) {
    var labels = [] 
    for (var i = 0; i < triplets.length; i++) {
        if (!labels.includes(triplets[i].a)) {
            labels.push(triplets[i].a);
        }
        if (!labels.includes(triplets[i].b)) {
            labels.push(triplets[i].b);

        }
        if (!labels.includes(triplets[i].c)) {
            labels.push(triplets[i].c);

        }
    }

    labels.sort();

    constraints = []; 
    corruptedConstraints = []; 

    for (var i = 0; i < labels.length; i++) {
        for (var j = 0; j < labels.length; j++) {
            for (var k = 0; k < labels.length; k++) {
                for (var l = 0; l < labels.length; l++) {
                    if (!(labels[i] === labels[j] || labels[i] === labels[k] || labels[i] === labels[l] || labels[j] === labels[k] || labels[j] === labels[l] || labels[l] === labels[k])) {

                        var c1 = new Constraint(createExtTriplet(new RootedTriplet(labels[i], labels[j], labels[k]), triplets), createExtTriplet(new RootedTriplet(labels[j], labels[k], labels[l]), triplets), createExtTriplet(new RootedTriplet(labels[i], labels[k], labels[l]), triplets));
                        var c2 = new Constraint(createExtTriplet(new RootedTriplet(labels[i], labels[j], labels[k]), triplets), createExtTriplet(new RootedTriplet(labels[j], labels[k], labels[l]), triplets), createExtTriplet(new RootedTriplet(labels[i], labels[j], labels[l]), triplets)); 
                        var c3 = new Constraint(createExtTriplet(new RootedTriplet(labels[i], labels[j], labels[l]), triplets), createExtTriplet(new RootedTriplet(labels[j], labels[k], labels[l]), triplets), createExtTriplet(new RootedTriplet(labels[i], labels[k], labels[l]), triplets)); 
                        var c4 = new Constraint(createExtTriplet(new RootedTriplet(labels[i], labels[j], labels[l]), triplets), createExtTriplet(new RootedTriplet(labels[i], labels[k], labels[l]), triplets), createExtTriplet(new RootedTriplet(labels[j], labels[k], labels[l]), triplets)); 
                        constraints.push(new ConstraintGroup(labels[i], labels[j], labels[k], labels[l], c1, c2, c3, c4)); 

                        var cc1 = new Constraint(createExtTriplet(new RootedTriplet(labels[i], labels[j], labels[k]), corruptedTriplets), createExtTriplet(new RootedTriplet(labels[j], labels[k], labels[l]), corruptedTriplets), createExtTriplet(new RootedTriplet(labels[i], labels[k], labels[l]), corruptedTriplets));
                        var cc2 = new Constraint(createExtTriplet(new RootedTriplet(labels[i], labels[j], labels[k]), corruptedTriplets), createExtTriplet(new RootedTriplet(labels[j], labels[k], labels[l]), corruptedTriplets), createExtTriplet(new RootedTriplet(labels[i], labels[j], labels[l]), corruptedTriplets)); 
                        var cc3 = new Constraint(createExtTriplet(new RootedTriplet(labels[i], labels[j], labels[l]), corruptedTriplets), createExtTriplet(new RootedTriplet(labels[j], labels[k], labels[l]), corruptedTriplets), createExtTriplet(new RootedTriplet(labels[i], labels[k], labels[l]), corruptedTriplets)); 
                        var cc4 = new Constraint(createExtTriplet(new RootedTriplet(labels[i], labels[j], labels[l]), corruptedTriplets), createExtTriplet(new RootedTriplet(labels[i], labels[k], labels[l]), corruptedTriplets), createExtTriplet(new RootedTriplet(labels[j], labels[k], labels[l]), corruptedTriplets)); 
                        corruptedConstraints.push(new ConstraintGroup(labels[i], labels[j], labels[k], labels[l], cc1, cc2, cc3, cc4)); 


                    }
                }
            }
        }
    }

    findPatterns(constraints, corruptedConstraints);
    return {constraints: constraints, corruptedConstraints: corruptedConstraints};
}


function Pattern(pattern) {
    this.pattern = pattern;
    

    this.toString = function toString() {
        var s = "";

        for (var i = 0; i < this.pattern.length; i++) {
            s += str(pattern[i]);
        }
        return s; 

    };
}
function findPatterns(constraintGroups, corruptedConstraintGroups) {
    var s1 = "000000000000"; 
    var s2 = "001000001010";
    var s3 = "010010010001"; 
    var s4 = "100100000000";
    var s5 = "100101100100";
    var s6 = "011011111111";
    var s7 = "111111111111";
    
    var patterns = new Map(); 
    for (var i = 0; i < constraintGroups.length; i++) {
        pattern = ""; 
        pattern += constraintGroups[i].c1.a.inObj ? 1 : 0; 
        pattern += constraintGroups[i].c1.b.inObj ? 1 : 0;
        pattern += constraintGroups[i].c1.c.inObj ? 1 : 0;
        pattern += constraintGroups[i].c2.a.inObj ? 1 : 0;
        pattern += constraintGroups[i].c2.b.inObj ? 1 : 0;
        pattern += constraintGroups[i].c2.c.inObj ? 1 : 0;
        pattern += constraintGroups[i].c3.a.inObj ? 1 : 0;
        pattern += constraintGroups[i].c3.b.inObj ? 1 : 0;
        pattern += constraintGroups[i].c3.c.inObj ? 1 : 0;
        pattern += constraintGroups[i].c4.a.inObj ? 1 : 0;
        pattern += constraintGroups[i].c4.b.inObj ? 1 : 0;
        pattern += constraintGroups[i].c4.c.inObj ? 1 : 0;

        var p = pattern;


        // if (constraintGroups[i].c1 === undefined || constraintGroups[i].c2 !== undefined || constraintGroups[i].c3 !== undefined || constraintGroups[i].c4 !== undefined) {continue;}
        // constraints = [constraintGroups[i].c1, constraintGroups[i].c2, constraintGroups[i].c3, constraintGroups[i].c4];
        // for (var j = 0; j < constraints.length; j++) {
        //     // console.log(constraints[j]);
        //     pattern.push(constraints[j].a.inObj); 
        //     pattern.push(constraints[j].b.inObj); 
        //     pattern.push(constraints[j].c.inObj);
        // }

        // console.log(pattern);
        if (!patterns.has(p)) {
            patterns.set(p, []); 
        }
        // patterns.set(p, patterns.get(p).push(i)); 
        patterns.get(p).push(i);
    }

    for (var i = 0; i < corruptedConstraintGroups.length; i++) {
        pattern = ""; 
        pattern += corruptedConstraintGroups[i].c1.a.inObj ? 1 : 0; 
        pattern += corruptedConstraintGroups[i].c1.b.inObj ? 1 : 0;
        pattern += corruptedConstraintGroups[i].c1.c.inObj ? 1 : 0;
        pattern += corruptedConstraintGroups[i].c2.a.inObj ? 1 : 0;
        pattern += corruptedConstraintGroups[i].c2.b.inObj ? 1 : 0;
        pattern += corruptedConstraintGroups[i].c2.c.inObj ? 1 : 0;
        pattern += corruptedConstraintGroups[i].c3.a.inObj ? 1 : 0;
        pattern += corruptedConstraintGroups[i].c3.b.inObj ? 1 : 0;
        pattern += corruptedConstraintGroups[i].c3.c.inObj ? 1 : 0;
        pattern += corruptedConstraintGroups[i].c4.a.inObj ? 1 : 0;
        pattern += corruptedConstraintGroups[i].c4.b.inObj ? 1 : 0;
        pattern += corruptedConstraintGroups[i].c4.c.inObj ? 1 : 0;

        var p = pattern;

        if (!(p === s1 || p === s2 || p === s3 || p === s4 || p === s5 || p === s6 || p === s7)) {
            corruptedConstraintGroups[i].standard = false; 
        }
        // if (constraintGroups[i].c1 === undefined || constraintGroups[i].c2 !== undefined || constraintGroups[i].c3 !== undefined || constraintGroups[i].c4 !== undefined) {continue;}
        // constraints = [constraintGroups[i].c1, constraintGroups[i].c2, constraintGroups[i].c3, constraintGroups[i].c4];
        // for (var j = 0; j < constraints.length; j++) {
        //     // console.log(constraints[j]);
        //     pattern.push(constraints[j].a.inObj); 
        //     pattern.push(constraints[j].b.inObj); 
        //     pattern.push(constraints[j].c.inObj);
        // }

        // console.log(pattern);
        if (!patterns.has(p)) {
            patterns.set(p, []); 
        }
        // patterns.set(p, patterns.get(p).push(i)); 
        patterns.get(p).push(i);
    }

    generatePatternView(patterns);
    

}