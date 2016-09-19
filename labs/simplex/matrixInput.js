/**
 * Created by Marco Kemmerling on 16-2-16.
 */
CELL_SIZE = 3;
matrix = [[1, -3, -5, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 4],
    [0, 0, 2, 0, 1, 0, 12],
    [0, 3, 2, 0, 0, 1, 18]];

matrix2 = [[0, 3, 2, 0, 0, 1, 18],
    [0, 1, 0, 1, 0, 0, 4],
    [0, 0, 2, 0, 1, 0, 12],
    [1, -3, -5, 0, 0, 0, 0]];


function createMatrixInput() {
    var rows = document.getElementById("numvar").value-1;
    var cols = rows + 3;
    if (cols === 7 && rows === 4)
        var defaultValues = matrix;

    var varString = "";

    for (var i = 0; i < cols-2; i++) {
        varString += "<th>x" + (i+1) + "</th>";
    }
    var htmlOut = "<table class=\"table table-bordered table-hover\"><thead><tr><th>Z</th>" + varString + "<th>RHS</th></tr><tr></thead><tbody><tr>";

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            htmlOut += "<td><input type=\"text\""
                    + "name=\"cell" + i + j +"\" ";
            if (defaultValues != undefined)
                htmlOut += "value=\"" + defaultValues[i][j]+"\"";
            else htmlOut += "value=\"0\"";
            htmlOut += "size=\"" + CELL_SIZE + "\">";
        }
        htmlOut += "</tr><tr>";
    }

    htmlOut += "</tbody></table>";
    document.getElementById("tableauInput").innerHTML = htmlOut;
    return htmlOut;
}



function formToMatrix() {
    var myControls = document.forms.tableauInput;
    var name_value_array = [];
    for (var i = 0; i < myControls.length; i++) {
        var aControl = myControls[i];

        // don't print the button value
        if (aControl.type != "button") {
            name_value_array.push(aControl.value, aControl.name);
        }
    }

    var last = name_value_array.pop();
    var matrix = createMatrix(parseInt(last.charAt(4))+1);
    matrix[last.charAt(4)][last.charAt(5)] = name_value_array.pop();

    while (name_value_array.length > 0) {
        var val = name_value_array.pop();
        matrix[val.charAt(4)][val.charAt(5)] = name_value_array.pop();
    }

    return matrix;
}