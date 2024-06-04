let submitButton = document.getElementById('submit');
let note_list = document.getElementById('note_list');
let note_info = document.getElementById('note_info');

let request = new XMLHttpRequest()
request.open('POST', '/', true);
request.setRequestHeader('Content-Type', 'application/json');
request.send();
request.addEventListener('load', function () {
    let res = JSON.parse(request.response);
    note_list.innerHTML = res.list;
});



submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    let name = document.getElementById('name');
    let content = document.getElementById('content');
    let importance = document.getElementById('importance')

    if (name.value != '' && content.value != '') {
        let note = JSON.stringify({
            name: name.value,
            importance: importance.value,
            content: content.value,
        });

        let request = new XMLHttpRequest()

        request.open('POST', '/create', true);

        request.setRequestHeader('Content-Type', 'application/json');

        request.addEventListener('load', function () {
            let res = JSON.parse(request.response);
            note_list.innerHTML = res.list;
        });

        name.value = '';
        content.value = '';

        request.send(note);
    }
});

function renderNote(event) {
    event.preventDefault();
    let el = event.target;

    let name = JSON.stringify({
        filename: el.innerText.split('> ')[1],
    });

    let request = new XMLHttpRequest();

    request.open('POST', '/getnote', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(name);
    request.addEventListener('load', function () {
        let res = JSON.parse(request.response);

        let h3Element = document.createElement('h3');
        h3Element.textContent = `Details of file: ${el.innerText.split('>')[1]}`;

        note_info.innerHTML = '';

        note_info.appendChild(h3Element);

        note_info.innerHTML += res.list;
    });
}


function deleteFile(event) {
    event.preventDefault()
    let el = event.target;
    note_info.innerHTML = ''
    let name = JSON.stringify({
        filename: el.name,
    });

    let request = new XMLHttpRequest()
    request.open('POST', '/delete', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(name);
    request.addEventListener('load', function () {
        let res = JSON.parse(request.response);
        note_list.innerHTML = res.list;

    });
}