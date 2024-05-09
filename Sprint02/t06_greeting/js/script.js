let namef = prompt("What is your first name?");
let surname = prompt("What is your last name?");

if(/^[a-z]+$/i.test(namef) && /^[a-z]+$/i.test(surname)) {
    namef = namef[0].toUpperCase() + namef.slice(1).toLowerCase();
    surname = surname[0].toUpperCase() + surname.slice(1).toLowerCase();

    console.log(`Hey, ${namef} ${surname}`);
    alert(`Hey, ${namef} ${surname}`);
}
else {
    console.log("Wrong input!");
    alert("Wrong input!");
}
