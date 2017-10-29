var graph;
var xPadding = 0;
var yPadding = 0;
var xMin = -2;
var xMax = 5;
var yMin = -1;
var yMax = 6;

var colors = ['#e06c75', '#5089b9', '#d19a66a', '#bb72cca'];
var currentColor = 0;


var c;


var Plot = (function () {



    function map(inp, inMin, inMax, outMin, outMax) {
        return outMin + ((outMax - outMin)/(inMax - inMin)) * (inp -inMin);
    }

    function mapX(inp) {
        return map(inp, xMin, xMax, 0, graph.width());
    }

    function mapY(inp) {
        return graph.height() - map(inp, yMin, yMax, 0, graph.height());
    }

    function line(x,y) {
        c.lineTo(mapX(x), mapY(y));
    }

    function move(x,y) {
        c.moveTo(mapX(x), mapY(y));
    }

    function changeColor() {
        c.strokeStyle = colors[currentColor];
        currentColor = currentColor < colors.length-1 ? currentColor+1 : 0;
    }

    function drawAxes() {
        c.strokeStyle = '#000';
        c.beginPath();
        c.moveTo(xPadding, 0);
        c.lineTo(xPadding, graph.height() - yPadding);
        c.moveTo(xPadding, graph.height());
        c.lineTo(graph.width(), graph.height());
        c.stroke();
    }

    // function drawTicks() {
    //     c.strokeStyle = '#000'; 
    //     c.beginPath(); 
    //     c.moveTo(mapX(-3), mapY(1))
    //     c.lineTo(mapX(-1.7), mapY(1));
    //     c.stroke();
    // }

    function clear() {
        currentColor = 0;
        c.clearRect(0,0,graph.width(),graph.height());
        drawAxes();
        // drawTicks();
    }

    function init() {
        c.linewidth = 1;
        c.strokeStyle = '#000';
        c.textAlign = 'center';
        drawAxes();
        // drawTicks();
    }


    return {
        line: line,
        move: move,
        changeColor: changeColor,
        clear: clear,
        init: init
    };

})();


function clearContents() {
    Plot.clear();
}



function plot(f, optional) {
    Plot.changeColor();
    c.beginPath();
    Plot.move(-10,f(-10));

    func = function(x) {
        if (!optional) {
            return f(x);
        }
        else {
            return f(x, optional);
        }
    }

    for (var i = -100; i < 100; i++) {
        Plot.line(i/10, func(i/10));
    }
    c.stroke();
}



function initialize() {
    graph = $('#graph');
    c = graph[0].getContext('2d');
    Plot.init();

    plot(relu);
    plot(varRelu);
}

function relu(x) {
    return Math.max(0, x);
}

function relu2(x, bla) {
    return bla * Math.max(0,x)
}


var fb = 5;
var eta = 20;
var beta_max = 0.65;

function varRelu(ff) {
    return 1/(1-Math.min(beta_max/eta * fb, beta_max)) * Math.max(0,ff);
}

function plotVarRelu(f, fb, eta, beta_max) {
    Plot.changeColor();
    c.beginPath();
    Plot.move(-10,f(-10));

    for (var i = -100; i < 100; i++) {
        Plot.line(i/10, f(i/10, fb, eta, beta_max));
    }
    c.stroke();
}

function changeFbValue(value) { 
    document.getElementById("fb_input_display").innerHTML = value;
    clearContents();
    plot(relu);     
    fb = value; 
    plot(varRelu);
}

function changeEtaValue(value) { 
    document.getElementById("eta_input_display").innerHTML = value;
    clearContents();
    plot(relu);     
    eta = value; 
    plot(varRelu);
}

function changeBetaMaxValue(value) { 
    document.getElementById("beta_max_input_display").innerHTML = value;
    clearContents();
    plot(relu);     
    beta_max = value; 
    plot(varRelu);
}



