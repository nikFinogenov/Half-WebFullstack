const fromXML = document.getElementById('fromXML');
const toXML = document.getElementById('toXML');

function getList() {
    let request = new XMLHttpRequest();
    request.open('GET', '/quotes', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.responseType = 'json';

    request.onload = () => {
        const data = request.response;
        console.log(data);
        fromXML.innerText = 'from XML:\n' + JSON.stringify(data.fromXML, null, 2);
        toXML.innerText = 'to XML:\n' + data.toXML;
    };
    
    request.onerror = () => {
        console.error(request.response);
    };

    request.send();
}
window.onload = function() {
    getList();
}