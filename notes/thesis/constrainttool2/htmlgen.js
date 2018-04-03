var triplets = []; 
var originalTriplets = []; 

function generateTripletView(tripletsIn) {
    originalTriplets = tripletsIn.slice(); 
    triplets = tripletsIn;
    var html = ""; 
    for (var i = 0; i < triplets.length; i++) {
        html += "<span class='triplet' onclick='changeTriplet(this)' topology='0' id='" + i + "'>" + triplets[i].a + "," + triplets[i].b + "|" + triplets[i].c + "</span> ";
    }

    document.getElementById("triplets").innerHTML = html;
}

function changeTriplet(triplet) {
    var a = triplet.innerHTML.split(",")[0];
    var b = triplet.innerHTML.split(",")[1].split("|")[0];
    var c = triplet.innerHTML.split("|")[1]
    var topology = parseInt(triplet.getAttribute("topology"), 10) > 1 ? 0 : parseInt(triplet.getAttribute("topology"), 10)+1; 
    triplet.setAttribute("topology", topology);
    triplet.innerHTML = c + "," + a + "|" + b;
    var t = new RootedTriplet(parseInt(c, 10), parseInt(a, 10), parseInt(b, 10)); 
    console.log(t);
    triplets[parseInt(triplet.getAttribute("id"), 10)] = t;
    gen(generateConstraints(originalTriplets, triplets));
}

function generatePatternView(patterns) {
    var div = document.getElementById("patterns"); 
    div.innerHTML = "";
    var patts = Array.from(patterns.keys()); 
    for (var i = 0; i < patts.length; i++) {
        var patternVis = "<svg width='90' height='120'>";

        for (var j = 0; j < patts[i].length; j++) {
            var x = (j*10)%30; 
            var y = parseInt(j/3)*10; 
            if (parseInt(patts[i][j]) == 1) {

                patternVis += "<rect x='" + x + "' y='"  + y +"' width='5' height='5' style='fill:black;stroke:black;stroke-width:1;opacity:1.0' />";
            }
            else {
                patternVis += "<rect x='" + x + "' y='"  + y +"' width='5' height='5' style='fill:white;stroke:black;stroke-width:1;opacity:1.0' />";

            }
        }
        patternVis += "<text x='0' y='70'>" + patterns.get(patts[i]).length + "</text>";

        patternVis += "</svg>";
        div.innerHTML += patternVis; 
    }
}

function gen(constraintGroups) {
    corruptedConstraints = constraintGroups.corruptedConstraints;
    constraints = constraintGroups.constraints;
    var page = "<div class='constraintgroup'>original </div> <div class='constraintgroup2'>corrupted</div>"; 
    for (var i = 0; i < constraints.length; i++) {
        page += "<div class='groupheader'>i=" + constraints[i].i + ", j=" + constraints[i].j + ", k=" + constraints[i].k + ", l=" + constraints[i].l + "</div><br>";
        page += "<div class='constraintgroup'>";
        page += constraints[i].c1.a.toString() + " + " + constraints[i].c1.b.toString() + " - " + constraints[i].c1.c.toString() + " <= 1 <br>"; 
        page += constraints[i].c2.a.toString() + " + " + constraints[i].c2.b.toString() + " - " + constraints[i].c2.c.toString() + " <= 1 <br>"; 
        page += constraints[i].c3.a.toString() + " + " + constraints[i].c3.b.toString() + " - " + constraints[i].c3.c.toString() + " <= 1 <br>"; 
        page += constraints[i].c3.a.toString() + " + " + constraints[i].c4.b.toString() + " - " + constraints[i].c4.c.toString() + " <= 1 <br>"; 

        page += "</div>";

        page += "<div class='constraintgroup2'>"; 
        page += corruptedConstraints[i].c1.a.toString() + " + " + corruptedConstraints[i].c1.b.toString() + " - " + corruptedConstraints[i].c1.c.toString() + " <= 1 <br>"; 
        page += corruptedConstraints[i].c2.a.toString() + " + " + corruptedConstraints[i].c2.b.toString() + " - " + corruptedConstraints[i].c2.c.toString() + " <= 1 <br>"; 
        page += corruptedConstraints[i].c3.a.toString() + " + " + corruptedConstraints[i].c3.b.toString() + " - " + corruptedConstraints[i].c3.c.toString() + " <= 1 <br>"; 
        page += corruptedConstraints[i].c3.a.toString() + " + " + corruptedConstraints[i].c4.b.toString() + " - " + corruptedConstraints[i].c4.c.toString() + " <= 1 <br>"; 
        page += "</div>";
    }

    document.getElementById("con").innerHTML = page;
}