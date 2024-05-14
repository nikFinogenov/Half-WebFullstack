function addToLocalStorage() {
    const noteInput = document.getElementById("noteInput").value.trim();
    if (noteInput === "") {
        alert("It's empty. Try to input something in \"Text input\".");
        return;
    }

    const notes = getNotesFromLocalStorage();
    notes.push(noteInput);
    setNotesToLocalStorage(notes);
    displayNotes(notes);
}

function clearLocalStorage() {
    const confirmation = confirm("Are you sure?");
    if (confirmation) {
        localStorage.removeItem("notes");
        document.getElementById("output").innerText = "[Empty]";
    }
}

function getNotesFromLocalStorage() {
    const notesString = localStorage.getItem("notes");
    return notesString ? JSON.parse(notesString) : [];
}

function setNotesToLocalStorage(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes(notes) {
    const outputElement = document.getElementById("output");
    outputElement.innerText = notes.length > 0 ? notes.join("\n\n") : "[Empty]";
}

window.addEventListener("load", function () {
    const notes = getNotesFromLocalStorage();
    displayNotes(notes);
});
