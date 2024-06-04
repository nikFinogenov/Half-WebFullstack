document.getElementById('load').addEventListener('click', function (e) {
    e.preventDefault();

    let linkForm = document.forms['linkForm'];
    let url = linkForm.elements['url'].value;
    let stringifiedURL = JSON.stringify({ url: url, });

    let req = new XMLHttpRequest()
    req.open('POST', '/', true);
    req.setRequestHeader( 'Content-Type', 'application/json');
    req.addEventListener('load', function () {
        let res = JSON.parse(req.response);

        document.getElementById('urlText').innerText = `url: ${res.url}`;
        document.getElementById('content').innerText = res.html;

        linkForm.elements['url'].value = '';
        document.getElementById('back').href = res.url;
    });

    req.send(stringifiedURL);
});