let slideIndex = 0;
autoSlideInterval = setInterval(nextSlideAutoRun, 3000);

function prevSlide() {
    showSlide(slideIndex -= 1);
    clearInterval(autoSlideInterval);
}

function nextSlide() {
    showSlide(slideIndex += 1);
    clearInterval(autoSlideInterval);
}
function nextSlideAutoRun() {
    showSlide(slideIndex += 1);
}

function showSlide(n) {
    const slides = document.getElementsByClassName("slide");
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}
