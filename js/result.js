    // Get score from query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score');
    const scoreDisplay = document.getElementById('score');
    const resultMessage = document.getElementById('resultMessage');
    const image = document.getElementById("image-stauts");
    const head2 = document.getElementById("head2");
    const scoreNumber = document.getElementById("score-number");

    scoreDisplay.textContent = score;

    if (score >= 6) {
        resultMessage.textContent = 'Congratulations! You passed the quiz.';
        head2.style.color = "#269a48";
        resultMessage.style.color = "#269a48";
        scoreNumber.style.backgroundColor = "#269a48";
        image.src = "congratulation.png";
    } else {
        resultMessage.textContent = 'Sorry! You did not pass the quiz.';
        head2.style.color = "#de0909";
        scoreNumber.style.backgroundColor = "#de0909";
        resultMessage.style.color = "#de0909";
        image.src = "fail.png";
}