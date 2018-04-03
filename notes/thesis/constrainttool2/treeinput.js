var LINE_LENGTH = 70; 
var svgns = "http://www.w3.org/2000/svg";

var tree = new PhylTree(); 
var labelMap = new Map();


function remove(node, origin) {
    if ($(node).attr("id") == "0") {
        return; 
    }

    parents = document.querySelectorAll('[id="'  + $(node).attr("parentid") + '"]');
    parent = parents[0];


    parent.setAttributeNS(null, 'onclick', 'addChildren(this)');

    var children = document.querySelectorAll('[parentid="' + $(node).attr("id") + '"]');

    for (var i = 0; i < children.length; i++) {
        remove(children[i], false);
    }
    var elements = document.getElementsByClassName($(node).attr("id"));


    var el1 = elements[0]; 
    var el2 = elements[1]; 
 
    $( "." + $(node).attr("id")).remove();

    if (!origin) {
        tree.removeNode(parseInt($(node).attr("id"), 10));
        node.parentNode.removeChild(node);
    }
    else {
        addText(node);
        label();
    }
}


function label() {
    // elements = document.getElementsByTagName("text");

    // for (var i = 0; i < elements.length; i++) {
    //     elements[i].innerHTML = i;
    // }

    els = $("text").sort(function(a, b) {
        return +$(a).attr("x") < +$(a).attr("x") ? 1 : -1;
    })

    labelMap = new Map();
    // els = $("text").tsort("",{attr:"x"});

    for (var i = 0; i < els.length; i++) {
        els[i].innerHTML = i;
        labelMap.set(parseInt($(els[i]).attr("class"), 10), i);
    }
    
    var triplets = tree.findAllTriplets(labelMap);
    generateTripletView(triplets); 
    gen(generateConstraints(triplets, triplets)); 

}

function addChildren(node) {
    // node.parentNode.removeChild(node.nextSibling)
    node.setAttributeNS(null, 'onclick', 'remove(this, true)');
    var id = node.getAttribute("id");
    $("text[class='" + id + "']").remove();

    var x = parseFloat($(node).attr("cx"));
    var y = parseFloat($(node).attr("cy")); 
    var angle = parseFloat($(node).attr("nextangle"));

    var deltax = LINE_LENGTH * Math.sin(angle);
    var deltay = LINE_LENGTH * Math.cos(angle);

    var xnew1 = x + deltax; 
    var xnew2 = x - deltax; 

    var ynew1 = y + deltay; 
    var ynew2 = y + deltay; 


    inputDiv = document.getElementById("svgarea"); 

    if($("#" + createId(xnew1, ynew1)).length == 0) {
        var circle = addCircle(xnew1, ynew1, angle, id); 
        addText(circle);
        addLine(x, y, xnew1, ynew1, id);    
        tree.addEdge(parseInt(id, 10), parseInt(createId(xnew1, ynew1), 10)); 
    }

    if($("#" + createId(xnew2, ynew2)).length == 0) {  
        var circle2 = addCircle(xnew2, ynew2,angle, id); 
        addText(circle2);
        addLine(x, y, xnew2, ynew2, id);   
        tree.addEdge(parseInt(id, 10), parseInt(createId(xnew2, ynew2), 10));      
    }
    
    label();
}

function addLine(x1, y1, x2, y2, id) {
    var line2 = document.createElementNS(svgns, 'line'); 
    line2.setAttributeNS(null, 'x1', x1);
    line2.setAttributeNS(null, 'y1', y1); 
    line2.setAttributeNS(null, 'x2', x2);
    line2.setAttributeNS(null, 'y2', y2); 
    line2.setAttributeNS(null, 'class', id); 
    line2.setAttributeNS(null, 'style', 'stroke:rgb(0,0,0);stroke-width:2');
    $("#svgarea").append(line2);
}

function addText(node) {
    var x = parseInt(node.getAttribute("cx"), 10);
    var y = parseInt(node.getAttribute("cy"), 10);
    var text = document.createElementNS(svgns, 'text'); 
    text.setAttributeNS(null, 'x', x-3);
    text.setAttributeNS(null, 'y', y+30);
    text.setAttributeNS(null, 'class', createId(x,y));
    $("#svgarea").append(text);
}

function addCircle(x, y, angle, parentid) {
    var circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'cx', x);
    circle.setAttributeNS(null, 'cy', y);
    circle.setAttributeNS(null, 'r', 10);
    circle.setAttributeNS(null, 'fill', 'black');
    circle.setAttributeNS(null, 'onclick', 'addChildren(this)');
    circle.setAttributeNS(null, 'nextangle', angle/2);
    circle.setAttributeNS(null, 'id', createId(x, y));
    circle.setAttributeNS(null, 'parentid', parentid);
    $("#svgarea").append(circle);
    return circle; 
}

function createId(x, y) {
    return parseInt(x, 10)+""+parseInt(y, 10);
}