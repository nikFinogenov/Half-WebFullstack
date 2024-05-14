document.addEventListener("DOMContentLoaded", function () {
    let charactersList = document.getElementById("characters").getElementsByTagName("li");

    for (var i = 0; i < charactersList.length; i++) {
        var character = charactersList[i];

        if (!character.hasAttribute("class") || !/^(good|evil)$/.test(character.getAttribute("class"))) {
            character.setAttribute("class", "unknown");
        }

        if (!character.hasAttribute("data-element")) {
            character.setAttribute("data-element", "none");
        }

        var dataElements = character.getAttribute("data-element").split(" ");
        character.innerHTML += "<br>";
        for (var j = 0; j < dataElements.length; j++) {
            var circle = document.createElement("div");
            circle.classList.add("elem", dataElements[j]);
            character.appendChild(circle);
            if (dataElements[j] === "none") {
                var line = document.createElement("div");
                line.classList.add("line");
                circle.appendChild(line);
            }
        }
    }
});
