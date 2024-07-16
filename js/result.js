    // Get score from query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score');
    const scoreDisplay = document.getElementById('score');
    const resultMessage = document.getElementById('resultMessage');

    scoreDisplay.textContent = score;

    if (score >= 6) {
        resultMessage.textContent = 'Congratulations! You passed the quiz.';
    } else {
        resultMessage.textContent = 'Sorry! You did not pass the quiz. Please try again.';
}