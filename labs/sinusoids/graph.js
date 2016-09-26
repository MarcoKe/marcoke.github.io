var graph;
var xPadding = 0;
var yPadding = 0;
var xMin = -2*Math.PI;
var xMax = 2*Math.PI;
var yMin = -2;
var yMax = 2;

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
        c.strokeStyle = '#fff';
        c.beginPath();
        c.moveTo(xPadding+graph.width()/2, 0);
        c.lineTo(xPadding+graph.width()/2, graph.height() - yPadding);
        c.moveTo(xPadding, graph.height()/2);
        c.lineTo(graph.width(), graph.height()/2);
        c.stroke();
    }

    function clear() {
        c.clearRect(0,0,graph.width(),graph.height());
        drawAxes();
    }

    function init() {
        c.linewidth = 1;
        c.strokeStyle = '#fff';
        c.textAlign = 'center';
        drawAxes();
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



function plot(f) {
    Plot.changeColor();
    c.beginPath();
    Plot.move(-10,f(-10));
    for (var i = -100; i < 100; i++) {
        Plot.line(i/10, f(i/10));
    }
    c.stroke();
}



function initialize() {
    graph = $('#graph');
    c = graph[0].getContext('2d');
    Plot.init();

    plot(Math.sin);
}
