var graph;
var xPadding = 0;
var yPadding = 0;
var xMin = -2*Math.PI;
var xMax = 2*Math.PI;
var yMin = -2;
var yMax = 2;

var colors = ['#e06c75', '#5089b9', '#d19a66a', '#bb72cca'];
var currentColor = 0;

function map(inp, inMin, inMax, outMin, outMax) {
    return outMin + ((outMax - outMin)/(inMax - inMin)) * (inp -inMin);
}

function mapX(inp) {
    return map(inp, xMin, xMax, 0, graph.width());
}

function mapY(inp) {
    return graph.height() - map(inp, yMin, yMax, 0, graph.height());
}

function changeColor() {
    var c = graph[0].getContext('2d');
    c.strokeStyle = colors[currentColor];
    currentColor = currentColor < colors.length-1 ? currentColor+1 : 0;
}

function drawAxes() {
    var c = graph[0].getContext('2d');
    c.strokeStyle = '#fff';
    c.beginPath();
    c.moveTo(xPadding+graph.width()/2, 0);
    c.lineTo(xPadding+graph.width()/2, graph.height() - yPadding);
    c.moveTo(xPadding, graph.height()/2);
    c.lineTo(graph.width(), graph.height()/2);
    c.stroke();
}

function plot(f) {
    changeColor();
    var c = graph[0].getContext('2d');
    c.beginPath();
    c.moveTo(mapX(-10),mapY(f(-10)));
    for (var i = -1000; i < 1000; i++) {
        c.lineTo(mapX(i/100), mapY(f(i/100)));
    }
    c.stroke();
}

function clearContents() {
    var c = graph[0].getContext('2d');
    c.clearRect(0,0,graph.width(),graph.height());
    drawAxes();
}

function initialize() {
    graph = $('#graph');
    var c = graph[0].getContext('2d');

    c.linewidth = 1;
    c.strokeStyle = '#fff';
    c.textAlign = 'center';

    drawAxes();
    plot(Math.sin);
}
