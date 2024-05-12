class Human {
    constructor(firstName, lastName, gender, age, calories) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.calories = calories;
        this.hungerTimer = setTimeout(() => {
            this.hungry();
        }, 5000);
        this.updateProperties();
    }

    updateProperties() {
        document.getElementById("human-properties").innerHTML = `
            Gender: ${this.gender}<br>
            Age: ${this.age}<br>
            Calories: ${this.calories}<br>
        `;
    }

    updateImage(imageSrc) {
        document.getElementById("human-image").src = imageSrc;
    }

    hungry() {
        this.calories -= 200;
        this.updateProperties();
        if (this.calories < 500 && !this.hungryMessageDisplayed) {
            this.displayHungryMessage();
            this.hungryMessageDisplayed = true;
        }
    }

    displayHungryMessage() {
        console.log("I'm hungry!");
        document.getElementById("info-block").innerHTML = "<br>I'm hungry!";
    }

    sleepFor(seconds) {
        this.updateImage('assets/images/sleeping.png');
        console.log(`I'm sleeping for ${seconds} seconds...`);
        document.getElementById("info-block").innerHTML = `<br>I'm sleeping for ${seconds} seconds...`;
        setTimeout(() => {
            console.log("I'm awake now!");
            document.getElementById("info-block").innerHTML = "<br>I'm awake now!";
            this.updateImage('assets/images/human.png');
        }, seconds * 1000);
    }

    feed() {
        if (this.calories > 500) {
            console.log("I'm not hungry.");
            document.getElementById("info-block").innerHTML = "<br>I'm not hungry.";
        } else {
            this.updateImage('assets/images/eating.png');
            console.log("Nom nom nom while eating for 10 seconds...");
            document.getElementById("info-block").innerHTML = "<br>Nom nom nom while eating for 10 seconds...";
            setTimeout(() => {
                this.calories += 200;
                console.log(`I have ${this.calories} calories now.`);
                document.getElementById("info-block").innerHTML = `<br>I have ${this.calories} calories now.`;
                if (this.calories < 500) {
                    console.log("I'm still hungry.");
                    document.getElementById("info-block").innerHTML = "<br>I'm still hungry.";
                }
                this.updateProperties();
                this.updateImage('assets/images/human.png');
            }, 10000);
        }
    }
}

class Superhero extends Human {
    constructor(firstName, lastName, gender, age, calories) {
        super(firstName, lastName, gender, age, calories);
        this.superheroName = `${firstName} the Superhero`;
    }

    fly() {
        console.log("I'm flying!");
        document.getElementById("super-info-block").innerHTML = "<br>I'm flying!";
        setTimeout(() => {
            console.log("I'm back on the ground.");
            document.getElementById("super-info-block").innerHTML = "<br>I'm back on the ground.";
        }, 10000);
    }

    fightWithEvil() {
        console.log("Khhhh-chh... Bang-g-g-g... Evil is defeated!");
        document.getElementById("super-info-block").innerHTML = "<br>Khhhh-chh... Bang-g-g-g... Evil is defeated!";
    }
}

let superhero = null;
const human = new Human("John", "Doe", "Male", 25, 500);

document.getElementById("sleep-btn").addEventListener("click", () => {
    human.sleepFor(5);
});

document.getElementById("feed-btn").addEventListener("click", () => {
    human.feed();
});

document.getElementById("turn-superhero-btn").addEventListener("click", () => {
    if (human.calories > 500) {
        superhero = new Superhero(human.firstName, human.lastName, human.gender, human.age, human.calories);
        document.getElementById("human-container").style.display = "none";
        document.getElementById("superhero-container").style.display = "inline-block";
        document.getElementById("superhero-name").innerHTML = superhero.superheroName;
        document.getElementById("super-info-block").innerHTML = `
            Gender: ${superhero.gender}<br>
            Age: ${superhero.age}<br>
            Calories: ${superhero.calories}<br>
        `;
        document.getElementById("fly-btn").disabled = false;
        document.getElementById("fight-btn").disabled = false;
    } else {
        console.log("You need more than 500 calories to turn into a superhero.");
        document.getElementById("info-block").innerHTML = "<br>You need more than 500 calories to turn into a superhero.";
    }
});

document.getElementById("fly-btn").addEventListener("click", () => {
    superhero.fly();
});

document.getElementById("fight-btn").addEventListener("click", () => {
    superhero.fightWithEvil();
});
