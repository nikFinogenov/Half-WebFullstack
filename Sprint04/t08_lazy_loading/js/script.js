const counter = document.querySelector('.counter');
let loadedImages = 0;
const images = Array.from(document.querySelectorAll('.lazy-load'));
const observer = new IntersectionObserver(entries => {
    entries.filter(isIntersecting).forEach(entry => loadImage(entry.target));
}, { threshold: 0.5 });

function isIntersecting(entry) {
    return entry.isIntersecting;
}

function loadImage(image) {
    image.src = image.dataset.src;
    image.classList.remove('lazy-load');
    if(images.length > loadedImages)
    loadedImages++;
    counter.textContent = `${loadedImages} images loaded`;
    if (loadedImages === images.length) {
        counter.style.backgroundColor = 'green';
        setTimeout(() => {
            counter.style.display = 'none';
        }, 3000);
    }
}

images.forEach(image => observer.observe(image));
