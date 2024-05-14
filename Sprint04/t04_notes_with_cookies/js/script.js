function addNote() {
    const noteInput = document.getElementById("noteInput").value.trim();
    if (noteInput === "") {
        alert("It's empty. Try to input something in \"Text input\".");
        return;
    }

    const notes = getNotesFromCookies();
    notes.push(noteInput);
    setNotesToCookies(notes);
    displayNotes(notes);
}

function clearCookies() {
    const confirmation = confirm("Are you sure?");
    if (confirmation) {
        document.cookie = "notes=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.getElementById("output").innerText = "[Empty]";
    }
}

function getNotesFromCookies() {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";").map(cookie => cookie.trim());
    const notesCookie = cookies.find(cookie => cookie.startsWith("notes="));
    if (notesCookie) {
        return JSON.parse(notesCookie.split("=")[1]);
    }
    return [];
}

function setNotesToCookies(notes) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    document.cookie = `notes=${JSON.stringify(notes)}; expires=${expiryDate.toUTCString()}; path=/;`;
}

function displayNotes(notes) {
    const outputElement = document.getElementById("output");
    outputElement.innerText = notes.length > 0 ? notes.join("\n\n") : "[Empty]";
}

window.addEventListener("load", function () {
    const notes = getNotesFromCookies();
    displayNotes(notes);
});
