var graph;
var xPadding = 30;
var yPadding = 30;


$(document).ready(function() {
    graph = $('#graph');
    var c = graph[0].getContect('2d');

    c.linewidth = 3;
    c.strokeStyle = '#333';
    c.textAlign = 'center';

    c.beginPath();
    c.moveTo(xPadding, 0);
    c.lineTo(xPadding, graph.height() - yPadding);
    c.lineTo(graph.width(), graph.height() - yPadding);
    c.stroke();
});
