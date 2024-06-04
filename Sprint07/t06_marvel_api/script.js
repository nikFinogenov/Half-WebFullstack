window.onload = function () {
    fetch('/show')
        .then(response => response.json())
        .then(data => {
            document.querySelector('#content').innerHTML = getHtml(data)
        })
}
function getHtml(data) {
    let result = '';
    for (let key in data) {
        if (typeof data[key] === "object") {
            result += `<div class="box"><b class="key object">${key}: </b>${getHtml(data[key])}</div>`;
        } else {
            result += `<div class="box"><b class="key">${key}:</b><span class="data"> ${data[key]}</span></div>`;
        }
    }
    return result;
}