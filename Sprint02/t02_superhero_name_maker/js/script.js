function validateInput(input, regex) {
    return regex.test(input);
}

function getSuperName() {
    let desc, animal, gender, age;
    let animanReg, genderReg, ageReg;

    animal = prompt('What animal is the superhero most similar to?');
    animanReg = /^[a-zA-Z]{1,20}$/;
    if (!validateInput(animal, animanReg)) {
        alert("error");
        return;
    }

    gender = prompt('Is the superhero male or female? Leave blank if unknown or other');
    genderReg = /^(male|female|)$/i;
    if (!validateInput(gender, genderReg)) {
        alert("error");
        return;
    }

    age = prompt('How old is the superhero?');
    ageReg = /^(?!0)[0-9]{1,5}$/;
    if (!validateInput(age, ageReg)) {
        alert("error");
        return;
    }

    if (age < 18 && gender.toLowerCase() == "male") {
        desc = "boy";
    } else if (age < 18 && gender.toLowerCase() == "female") {
        desc = "girl";
    } else if (age < 18 && gender.toLowerCase() == "") {
        desc = "kid";
    } else if (age > 18 && gender.toLowerCase() == "male") {
        desc = "man";
    } else if (age > 18 && gender.toLowerCase() == "female") {
        desc = "woman";
    } else if (age > 18 && gender.toLowerCase() == "") {
        desc = "hero";
    }

    alert("The superhero name is: " + animal + "-" + desc + "!");
}

getSuperName();
