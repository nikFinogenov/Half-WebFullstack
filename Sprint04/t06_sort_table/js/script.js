let characters = [
    { name: `Black Panther`, strength: 66, age: 53 },
    { name: `Captain America`, strength: 79, age: 137 },
    { name: `Captain Marvel`, strength: 97, age: 26 },
    { name: `Hulk`, strength: 80, age: 49 },
    { name: `Iron Man`, strength: 88, age: 48 },
    { name: `Spider-Man`, strength: 78, age: 16 },
    { name: `Thanos`, strength: 99, age: 1000 },
    { name: `Thor`, strength: 95, age: 1000 },
    { name: `Yon-Rogg`, strength: 73, age: 52 }
]
let sorting = {
    name: false,
    strength: false,
    age: false
}
let notification = document.querySelector('#notification')
notification.innerHTML = "Sorting by Name, order: ASC"

function createTable(heroesArr) {
    let placeholder = document.getElementById("placeholder");
    let tbl = document.createElement("table");

    tbl.appendChild(createHeader());
    for (let i = 0; i < 9; i++) {
        let row = document.createElement("tr");
        insertCell(`${heroesArr[i].name}`, row);
        insertCell(`${heroesArr[i].strength}`, row);
        insertCell(`${heroesArr[i].age}`, row);
        tbl.appendChild(row);
    }
    placeholder.innerHTML = "";
    placeholder.appendChild(tbl);
}

function createHeader() {
    let row = document.createElement("tr");

    ["Name", "Strength", "Age"].forEach(element => {
        let cell = document.createElement("th");
        cell.innerText = element;

        if (element === "Name") cell.setAttribute("onclick", "name()");
        else if (element === "Strength") cell.setAttribute("onclick", "strength()");
        else cell.setAttribute("onclick", "age()");
        row.appendChild(cell);
    });
    return row;
}

function name() {
    if (sorting.name === false) {
        characters.sort((a, b) => a.name > b.name ? 1 : -1);
        sorting.name = true;
        sorting.strength = false;
        sorting.age = false;
        notification.innerHTML = "Sorting by Name, order: ASC"
    }
    else {
        characters.sort((a, b) => a.name < b.name ? 1 : -1);
        sorting.name = false;
        sorting.strength = false;
        sorting.age = false;
        notification.innerHTML = "Sorting by Name, order: DESC"
    }
    createTable(characters);
}

function strength() {
    if (sorting.strength === false) {
        characters.sort((a, b) => a.strength > b.strength ? 1 : -1);
        sorting.name = false;
        sorting.strength = true;
        sorting.age = false;
        notification.innerHTML = "Sorting by Strength, order: ASC"
    }
    else {
        characters.sort((a, b) => a.strength < b.strength ? 1 : -1);
        sorting.name = false;
        sorting.strength = false;
        sorting.age = false;
        notification.innerHTML = "Sorting by Strength, order: DESC"
    }
    createTable(characters)
}

function age() {
    if (sorting.age === false) {
        characters.sort((a, b) => a.age > b.age ? 1 : -1);
        sorting.name = false;
        sorting.strength = false;
        sorting.age = true;
        notification.innerHTML = "Sorting by Age, order: ASC"
    }
    else {
        characters.sort((a, b) => a.age < b.age ? 1 : -1);
        sorting.name = false;
        sorting.strength = false;
        sorting.age = false;
        notification.innerHTML = "Sorting by Age, order: DESC"
    }
    createTable(characters)
}
function insertCell(str, row) {
    let cell = document.createElement("td");

    cell.innerText = str;
    row.appendChild(cell);
}
createTable(characters);
