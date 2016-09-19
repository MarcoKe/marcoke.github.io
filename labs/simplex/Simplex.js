/**
 * Created by Marco Kemmerling on 15-2-16.
 */

var basis;

var NONSENSE = "The given input appears to be nonsense. \nEither that, " +
    "or you have found a bug in the code. In the latter case please contact " +
    "me at the email address I failed to provide.";
var OPTIMALITY = "We have reached optimality.";

function solve(tableau) {
    basis = findBasicVars(tableau);
    var pivCol = findPivotColumn(tableau);
    var pivRow = findPivotRow(tableau, pivCol);
    var resultTableau = matrixToTable(tableau, pivRow, pivCol, basis);
    var explanation = makeBasisString(basis[pivRow], pivCol);
    var solution = makeRowString(resultTableau, explanation);

    while (!zRowPositive(tableau)) {
        //change basis and pivot
        basis[pivRow] = pivCol;
        tableau = pivotStep(tableau);
        pivCol = findPivotColumn(tableau);
        pivRow = findPivotRow(tableau, pivCol);

        //generate html output
        resultTableau = matrixToTable(tableau, pivRow, pivCol, basis);

        if (zRowPositive(tableau)) {
            explanation = OPTIMALITY;
        }
        else {
            explanation = makeBasisString(basis[pivRow], pivCol) + "<br>";
        }
        solution += makeRowString(resultTableau, explanation);
    }

    document.getElementById("solution").innerHTML = solution;
}

function pivotStep(tableau) {
    var old = copyArray(tableau);

    var pivCol = findPivotColumn(tableau);
    var pivRow = findPivotRow(tableau, pivCol);

    //update pivot row
    for (var i = 0; i < tableau[0].length; i++) {
        tableau[pivRow][i] = old[pivRow][i] / old[pivRow][pivCol];
    }

    //update non-pivot rows
    for (var i = 0; i < tableau.length; i++) {
        for (var j = 0; j < tableau[0].length; j++) {
            if (i != pivRow)
                tableau[i][j] = old[i][j] - (old[i][pivCol] * tableau[pivRow][j]);
        }
    }

    return tableau;
}

function findPivotColumn(matrix) {
    var zRow = findZRow();
    var smallest = matrix[zRow][0];
    var col = 0;

    for (var i = 0; i < matrix[0].length; i++) {
        if (parseFloat(matrix[zRow][i]) <= parseFloat(smallest)) {
            smallest = matrix[zRow][i];
            col = i;
        }
    }

    return col;
}

function findPivotRow(matrix, col) {
    var rightCol = matrix[0].length-1;
    var smallest = Infinity;
    var pivot = 1;
    var zRow = findZRow();

    for (var i = 0; i < matrix.length; i++) {
        if (i !== zRow) {
            var val = matrix[i][rightCol] / matrix[i][col];
            if (val >= 0 && val <= smallest) {
                smallest = val;
                pivot = i;
            }
        }
    }

    return pivot;
}

//if zRow positive --> optimality
function zRowPositive(matrix) {
    var zRow = matrix[findZRow()];

    for (var i = 0; i < zRow.length; i++) {
        if (zRow[i] < 0)
            return false;
    }

    return true;
}

function findBasicVars(matrix) {
    var basicVars = [];

    for (var col = 0; col < matrix[0].length; col++) {
        var cnt = 0;
        var brow = 0;
        for (var row = 0; row < matrix.length; row++) {
            if (matrix[row][col] != 0) {
                if (matrix[row][col] == 1)
                    cnt += 1;
                else
                    cnt += 2;
                brow = row;
            }

        }
        if (cnt == 1)
            basicVars[brow] = col;
    }

    return basicVars;
}

function matrixToTable(matrix, pivRow, pivCol, basicVars) {
    var numVars = matrix[0].length-2;
    var varString = "";

    for (var i = 0; i < numVars; i++) {
        varString += "<th>x" + (i+1) + "</th>";
    }
    var result = "<table class=\"table table-bordered table-hover\"><thead><tr><th>Basis</th><th>Z</th>" + varString + "<th>RHS</th></tr><tr></thead><tbody>";

    var highlightPivot = true;
    if (zRowPositive(matrix))
        highlightPivot = false;

    for (var i = 0; i < matrix.length; i++) {
        result += "<th scope=row>";

        if (basicVars[i] === 0)
            result += "Z";
        else
            result += "x" + basicVars[i];

        result += "</th>";

        for (var j = 0; j < matrix[0].length; j++) {
            if (pivRow == i && pivCol == j && highlightPivot === true)
                result += "<td class=\"warning\">";
            else
                result += "<td>";

            result += round(matrix[i][j]) + roundEllipses(matrix[i][j]) + "</td>";
        }
        result += "</tr><tr>";
    }

    result += "</tbody></table>";

    return result;
}

function findZRow() {
    var zRow = 0;
    for (var i = 0; i < basis.length; i++) {
        if (basis[i] == 0)
            zRow = i;
    }

    return zRow;
}

function makeBasisString(bout, bin) {
    if (bout === undefined || bin === undefined)
        return NONSENSE;
    return "x" + bout + " leaves the basis, x" + bin + " enters the basis. "
}

function makeRowString(left, right) {
    return "<br><div class='row'><div class='col-md-5'>" + left + "</div><div class='col-md-4  bg-success'>" + right + "</div></div>";
}

function round(num) {
    return Math.round(num * 100) / 100
}

function roundEllipses(num) {
    if (num - round(num) == 0)
        return "";
    else
        return "..";

}

function copyArray(arr) {
    var narr = createMatrix(arr.length);

    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[0].length; j++) {
            narr[i][j] = arr[i][j];
        }
    }

    return narr;
}

function createMatrix(rows) {
    var matrix = [];

    for (var i = 0; i < rows; i++) {
        matrix[i] = [];
    }

    return matrix;
}

function clearSolution() {
    document.getElementById("solution").innerHTML = "";
}