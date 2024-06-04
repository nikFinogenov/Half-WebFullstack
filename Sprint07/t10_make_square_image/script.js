const input = document.querySelector("input");

function getExtension(filename) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}
document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();
  if(getExtension(input.value) !== 'png') {
    fetch("/clear").then(
      document.querySelector(".error").innerHTML = `<h2>Please upload PNG file</h2>`
    );
  }
  else if (input.value) {
    fetch("/upload/?url=" + input.value)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(
          "#img1"
        ).innerHTML = `<img src="${data.img[0]}">
        <img src="${data.img[1]}">
        <img src="${data.img[2]}">
        <img src="${data.img[3]}">`;
        document.querySelector(".error").innerHTML = "";
      });
  }
});