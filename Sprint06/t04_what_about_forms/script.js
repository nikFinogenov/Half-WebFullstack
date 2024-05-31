document.addEventListener('DOMContentLoaded', function () {
    const quizForm = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');

    quizForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const answer = quizForm.elements['check'].value;

        if (answer === '3') {
            resultDiv.textContent = 'Right!';
        } else {
            resultDiv.textContent = 'Shame on you! Go watch Avengers!';
        }
    });
});
