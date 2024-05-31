let subButton = document.getElementById('submit');
let names = document.getElementById('name');
let emails = document.getElementById('email');
let ages = document.getElementById('age');
let descriptions = document.getElementById('description');
let photos = document.getElementById('photo');

subButton.addEventListener('click', function (evt) {

    evt.preventDefault();

    let registerForm = document.forms['regForm'];

    let temp = JSON.stringify({
        name: registerForm.elements['name'].value,
        email: registerForm.elements['email'].value,
        age: registerForm.elements['age'].value,
        description: registerForm.elements['description'].value,
        photo: registerForm.elements['photo'].value,
    });

    let request = new XMLHttpRequest()

    request.open('POST', '/', true);

    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('load', function () {
        let receivedUser = JSON.parse(temp);
        names.innerText = receivedUser.name;
        emails.innerText = receivedUser.email;
        ages.innerText = receivedUser.age;
        descriptions.innerText = receivedUser.description;
        photos.innerText = receivedUser.photo;
    });

    request.send(temp);
})