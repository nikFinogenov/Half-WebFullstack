let main = document.getElementById("main");
let state = {
    target: null
}

main.addEventListener("dblclick", event => {
    if (event.target && event.target.classList.contains("stones")) {
        if (event.target.getAttribute("data-state") == "on")
            event.target.setAttribute("data-state", "off");
        else
            event.target.setAttribute("data-state", "on");
    }
});

main.addEventListener("mousedown", event => {
    if (event.target && event.target.classList.contains("stones") && event.target.getAttribute("data-state") == "on") {
        event.target.style.cursor = "none";
        state.target = event.target;
        state.offsetX = event.offsetX;
        state.offsetY = event.offsetY;
    }
});

main.addEventListener("mouseup", () => {
    event.target.style.cursor = "default";
    state.target = null;
});

main.addEventListener("mousemove", e => {
    if (state.target) {
        state.target.style.left = (e.pageX - state.offsetX) + "px";
        state.target.style.top = (e.pageY - state.offsetY) + "px";
    }
});
