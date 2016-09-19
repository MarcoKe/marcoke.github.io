/**
 * Created by mar on 18-2-16.
 */

var examples = [["VIVALASVEGAS", "VIVADAVIS"], ["GATTACA", "GCATGCU"]];

function printSolution() {
    var seq1 = getInput("seq1");
    var seq2 = getInput("seq2");

    if (seq1.length === 0 || seq2.length === 0) {
        document.getElementById("solution").innerHTML = newRow("", "Eating empty sequences gives the algorithm a stomach ache.");
    }
    else {
        var table = initialize(seq1, seq2);
        document.getElementById("solution").innerHTML = newRow(table.toHTML("  " + seq2, " " + seq1), initExplanation());


        table = fill(table, seq1, seq2);
        document.getElementById("solution").innerHTML += newRow(table.toHTML("  " + seq2, " " + seq1), fillExplanation());

        var alignment = traceback(table, seq1, seq2);
        document.getElementById("solution").innerHTML += newRow(table.toHTML("  " + seq2, " " + seq1, alignment[3]), tracebackExplanation());

        document.getElementById("solution").innerHTML += newRow("<p class='sequencematch'>" + alignment[0] + "<br> " + alignment[2] + "<br>" + alignment[1] + "</p>", resultExplanation());

        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
}

function newRow(left, right) {
    return "<br><div class='row'><div class='col-md-5'>" + left + "</div><div class='col-md-4  bg-success'>" + right + "</div></div>";
}

function initExplanation() {
    return "With an (m+1)x(n+1) table, where m, n are the lengths of the sequences, we fill the table entries (m:1) and (1:n) as follows: <br>" +
        "$$M_{i,1} = \\sum_{k=1}^i \\sigma(s_k, -)$$ <br> " +
        "$$M_{1,j} = \\sum_{k=1}^j \\sigma(-, t_k)$$ <br> " +
        "with $$\\sigma(-,a)=\\sigma(a,-)=\\sigma(a,b)=-1  \\   \\forall a \\neq b$$" +
        "$$\\sigma(a,b)=1 \\ \\forall a = b$$";
}

function fillExplanation() {
    return "Starting from the top left, we compute each entry using the recursive relation: <br>" +
        "$$M_{i,j}=  max\\begin{cases} \\hfill \\ M_{i-1,j-1}+\\sigma(x_i,y_j)  \\hfill  \\\\ \\hfill \\ M_{i-1,j}+\\sigma(x_i,-) \\hfill \\\\ \\hfill \\ M_{i,j-1}+\\sigma(-,y_j) \\hfill \\\\ \\end{cases}$$";
}

function tracebackExplanation() {
    return "Traceback (more than one solution might be possible here)";
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