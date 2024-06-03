const addNoteBtn = document.querySelector(".add-note-btn");
let notesContainer = document.querySelector(".notes-container");

let notesTemp = '<p contenteditable="true"><img class="dlt-note-btn" src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt=""></p>';

// Load notes from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadNotes);

// Add a new note
addNoteBtn.addEventListener("click", function() {
    let newNote = document.createElement("div");
    newNote.innerHTML = notesTemp;
    notesContainer.appendChild(newNote.firstChild);
    saveNotes();
});

// Delete a note
notesContainer.addEventListener("click", function(e) {
    if (e.target && e.target.classList.contains("dlt-note-btn")) {
        e.target.parentElement.remove();
        saveNotes();
    }
});

// Save notes to local storage
function saveNotes() {
    let notes = [];
    notesContainer.querySelectorAll("p").forEach(note => {
        notes.push(note.innerHTML);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Load notes from local storage
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes"));
    if (notes) {
        notes.forEach(noteContent => {
            let newNote = document.createElement("div");
            newNote.innerHTML = `<p contenteditable="true">${noteContent}</p>`;
            notesContainer.appendChild(newNote.firstChild);
        });
    }
}

// Save notes on edit
notesContainer.addEventListener("input", function() {
    saveNotes();
});
