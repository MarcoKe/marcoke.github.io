/**
 * Created by mar on 18-2-16.
 */

var examples = [["VIVADAVIS", "QUEVIVALASVEGAS"], ["GATTACA", "GCATGCU"]];
var seq1;
var seq2;
var table;
var alignments;
var tracebackTables = [];

function printSolution() {
    seq1 = getInput("seq1");
    seq2 = getInput("seq2");

    if (seq1.length === 0 || seq2.length === 0) {
        document.getElementById("solution").innerHTML = newRow("", "<span class='glyphicon glyphicon-fire' aria-hidden='true'></span> Eating empty sequences gives the algorithm a stomach ache.");
    }
    else {
        table = initialize(seq1, seq2);
        document.getElementById("solution").innerHTML = newRow(table.toHTML("  " + seq2, " " + seq1), initExplanation());


        table = fill(table, seq1, seq2);
        document.getElementById("solution").innerHTML += newRow(table.toHTML("  " + seq2, " " + seq1), fillExplanation());

        alignments = findAllSolutions(table, seq1, seq2);
        makeTracebackTables(seq1, seq2, alignments);
        document.getElementById("solution").innerHTML += newRow(tabbedTracebackSolution(table, seq1, seq2, alignments), tracebackExplanation());

        document.getElementById("solution").innerHTML += newRow(showAllAlignments(alignments, 0), resultExplanation());

        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
}

function newRow(left, right) {
    return "<br><div class='row'>" +
        "<div class='col-md-5'>"
        + left
        + "</div>" +
        "<div class='col-md-4  bg-success'>"
        + right
        + "</div></div>";
}

function tabbedTracebackSolution(table, seq1, seq2, alignments) {
    var tabs = "Solutions: <ul class='nav nav-tabs'>" +
        "<li class='active'>" +
        "<a data-toggle='tab' onclick='updateTraceback(0)'>0</a>" +
        "</li>";

    for (var i = 1; i < alignments.length; i++) {
        tabs += "<li><a data-toggle='tab' onclick='updateTraceback(" + i + ");'>" + i + "</a></li>";
    }
    tabs += "</ul>";

    var tabContent = "<div id='tracebackSolution'>" + tracebackTables[0] + "</div>";



    return (tabs + tabContent);
}

function showAllAlignments(alignments, index) {
    var alignmentsView = "<p id='alignmentSolution' class='sequencematch'>" + alignments[index][0] + "<br> " + alignments[index][2] + "<br>" + alignments[index][1] + "</p>";
    return alignmentsView;
}


function updateTraceback(index) {
    document.getElementById("tracebackSolution").innerHTML = tracebackTables[index];
    document.getElementById("alignmentSolution").innerHTML = showAllAlignments(alignments, index);
}

function makeTracebackTables(seq1, seq2, alignments) {
    tracebackTables = [];
    for (var i = 0; i < alignments.length; i++) {
        tracebackTables.push(table.toHTML('  ' + seq2, ' ' + seq1, alignments[i][3]));
    }
}

function updateView() {
    var index = $("")
}

function initExplanation() {
    return "Create a (n+1)x(m+1) table and fill entries (1, 1:m+1) and (1:n+1, 1) with zeros. " +
        "<br \>(Implementationwise: just create a (n+1)x(m+1) zero matrix)";
}

function fillExplanation() {
    return "Starting from the top left, we compute each entry using the recursive relation: <br>" +
        "$$M_{i,j}=  max\\begin{cases} \\hfill \\ M_{i-1,j-1}+\\sigma(x_i,y_j)  \\hfill  \\\\ \\hfill \\ M_{i-1,j}+\\sigma(x_i,-) \\hfill \\\\ \\hfill \\ M_{i,j-1}+\\sigma(-,y_j) \\\\ \\hfill \\ 0 \\hfill \\\\ \\end{cases}$$" +
        "with " +
        "$$\\sigma(-,a)=\\sigma(a,-)=\\sigma(a,b)=-1  \\   \\forall a \\neq b$$" +
        "$$\\sigma(a,b)=1 \\ \\forall a = b$$";
}

function tracebackExplanation() {
    return "Traceback (more than one solution might be possible here): <br />" +
        "Find the highest score in the table and trace back until you get to a 0.";
}

function resultExplanation() {
    return "The resulting sequence alignment.";
}

function getInput(id) {
    var input = document.getElementById(id).value.toUpperCase();
    input = input.replace(/\W/g, '');
    document.getElementById(id).value = input;
    return input;
}

function setExample(ex) {
    if (ex < 0) {
        document.getElementById("seq1").value = "";
        document.getElementById("seq2").value = "";
    }
    else {
        document.getElementById("seq1").value = examples[ex][0].toUpperCase();
        document.getElementById("seq2").value = examples[ex][1].toUpperCase();
    }
}

function getExample(ex) {
    return examples[ex];
}