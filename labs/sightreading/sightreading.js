var SUCESS_COLOUR = "lightgreen"; 
var FAILURE_COLOUR = "salmon";
var COLOUR_DELAY = 1000; 
var numSucesses = 0; 
var numFailures = 0; 

VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "notation".
var div = document.getElementById("notation")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(310, 250);
var context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
context.scale(1.5,1.5);

// Create a stave of width 200 at position 0, 40 on the canvas.
var stave = new VF.Stave(0, 40, 200);

// Add a clef and time signature.
stave.addClef("treble");

// Connect it to the rendering context and draw!
stave.setContext(context).draw();

// Create the notes

var scale = ["c", "d", "e", "f", "g", "a", "b"]
var notes = [];
var noteNames = []; 

for (var pitch = 4; pitch < 6; pitch++) {
    for (var i = 0; i < scale.length; i++) {
        var note = scale[i] + "/" + pitch;
        noteNames.push(note);
        notes.push(new VF.StaveNote({keys: [note], duration: "q"}));
    }
}


// Create a voice in 4/4 and add above notes
var voice = new VF.Voice({num_beats: 1,  beat_value: 4});
voice.addTickables([notes[5]]);
var currentNoteName = noteNames[5];

// Format and justify the notes to 400 pixels.
var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

// Render voice
voice.draw(context, stave); 

function getRandomNote() {
    var index = Math.floor(Math.random()*notes.length)
    return {note: notes[index], noteName: noteNames[index]};
}

function drawRandomNote() {
    // removes the current note
    context.svg.removeChild(context.svg.lastChild);

    randomNote = getRandomNote(); 

    var voice = new VF.Voice({num_beats: 1,  beat_value: 4});
    voice.addTickables([randomNote.note]);

    currentNoteName = randomNote.noteName;
    
    // Format and justify the notes to 400 pixels.
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
    
    // Render voice
    voice.draw(context, stave);
}

/* Accepts a note submission and draws the next note if input was correct */
function submitNote(note) {
    success = note.toLowerCase() === currentNoteName[0].toLowerCase(); 

    changeColor(note, success); 
    
    if (success) { 
        numSucesses += 1; 
        drawRandomNote(); 
    }
    else {
        numFailures += 1; 
    }

    updateStats();
}

/* Changes the colour of the pressed button for a specific time interval depending on whether the note was correct */ 
function changeColor(id, success) {
    document.getElementById(id).style.backgroundColor = success ? SUCESS_COLOUR : FAILURE_COLOUR; 
    setTimeout(function() { 
        document.getElementById(id).style.removeProperty("background-color");        
    }, COLOUR_DELAY);    
}

function updateStats() {
    var accuracy = Math.round((numSucesses / (numSucesses + numFailures))*100); 
    document.getElementById("accuracy").innerHTML = accuracy + "%";
}

