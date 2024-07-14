import Question from './Question.js';
import Answer from './Answer.js';

let q1 = new Question("What is the capital of France?", [
    new Answer("Berlin", false),
    new Answer("Madrid", false),
    new Answer("Paris", true),
    new Answer("Rome", false),
]);

let q2 = new Question("What's Your Name?", [
    new Answer("John", false),
    new Answer("Doe", false),
    new Answer("Ahmed", true),
    new Answer("Omar", false),
]);

let q3 = new Question("What's Your Age?", [
    new Answer("23", false),
    new Answer("22", false),
    new Answer("16", true),
    new Answer("32", false),
]);

let quiz = [q1, q2, q3];
let impo = document.getElementById("question");
let options = document.querySelectorAll(".option");
let radioInputs = document.querySelectorAll("input[type='radio']");
let nextButton = document.getElementById("next");
let previousButton = document.getElementById("previous");
let submitButton = document.getElementById("submit");
let markButton = document.getElementById("mark");
let timerDisplay = document.getElementById("timeLeft");
let markedQuestionsDiv = document.getElementById("markedQuestions");
let timerInterval;
let currentIndex = 0;
let timeLeft = 10; // Total time in seconds

function updateQuestion() {
    let currentQuestion = quiz[currentIndex];
    impo.textContent = currentQuestion.title;

    for (let i = 0; i < options.length; i++) {
        options[i].querySelector("label").textContent = currentQuestion.answers[i].body;
        radioInputs[i].checked = false; // Reset radio button selection
        // radioInputs[i].disabled = false; // Enable radio buttons

        // Highlight selected answer if already selected
        if (currentQuestion.getSelectedAnswer() === i) {
            radioInputs[i].checked = true; // Example: Select radio button on selection
        }
    }

    if (currentIndex === 0) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "block";
    }
    if (currentIndex === quiz.length - 1) {
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "block";
    }

    // Update mark/unmark button text based on question marking status
    updateMarkButton();
}

function handleOptionClick(index) {
    let currentQuestion = quiz[currentIndex];

    // Mark the selected answer and update UI
    currentQuestion.setSelectedAnswer(index);
}

function calculateScore() {
    let correctAnswers = 0;
    quiz.forEach((question) => {
        if (question.getSelectedAnswer() !== -1 && question.answers[question.getSelectedAnswer()].isCorrect) {
            correctAnswers++;
        }
    });
    return correctAnswers;
}



function startTimer(minutes) {
    let seconds = minutes * 60;

    function updateCountdown() {
        let mins = Math.floor(seconds / 60);
        let secs = seconds % 60;

        secs = secs < 10 ? '0' + secs : secs; // add leading zero if seconds less than 10
        timerDisplay.textContent = `${mins}:${secs}`;


        if (seconds > 0) {
            seconds--;
            setTimeout(updateCountdown, 1000);
        } else {
            goToResultPage();
        }
    }

    updateCountdown();
}

function goToResultPage() {
    let score = calculateScore();
    // Redirect to result page with score
    window.location.replace(`result.html?score=${score}`);
}

function toggleMarkQuestion() {
    let currentQuestion = quiz[currentIndex];

    // Check if the question is already marked
    let existingMarkedQuestion = Array.from(markedQuestionsDiv.children).find((div) => Number(div.dataset.index) === currentIndex);

    if (!existingMarkedQuestion) {
        // Mark the question
        let markedDiv = document.createElement("div");
        markedDiv.className = "marked-question";
        markedDiv.textContent = currentQuestion.title;
        markedDiv.dataset.index = currentIndex; // Store the current index in dataset
        markedDiv.addEventListener("click", () => {
            goToMarkedQuestion(markedDiv.dataset.index);
        });
        markedQuestionsDiv.appendChild(markedDiv);
        markedQuestionsDiv.style.transition = "all 0.5s";
    } else {
        // Unmark the question
        existingMarkedQuestion.remove();
    }

    // Update mark/unmark button text based on question marking status
    updateMarkButton();
    // Show or hide marked questions section based on content
    toggleMarkedQuestionsSection();
}

function updateMarkButton() {
    // let currentQuestion = quiz[currentIndex];
    let existingMarkedQuestion = Array.from(markedQuestionsDiv.children).find((div) => parseInt(div.dataset.index) === currentIndex);

    if (existingMarkedQuestion) {
        markButton.textContent = "Unmark";
    } else {
        markButton.textContent = "Mark";
    }
}

function goToMarkedQuestion(index) {
    currentIndex = parseInt(index); // Convert index back to integer
    updateQuestion();
}

function toggleMarkedQuestionsSection() {
    if (markedQuestionsDiv.children.length > 0) {
        markedQuestionsDiv.style.display = "block";
        markedQuestionsDiv.classList.add("slideIn");
    } else {
        markedQuestionsDiv.style.display = "none";
        markedQuestionsDiv.classList.remove("slideIn");
    }
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}



shuffleArray(quiz);
updateQuestion();
startTimer(timeLeft); // Start the timer when the page loads

// Event listeners
nextButton.addEventListener("click", () => {
    if (currentIndex < quiz.length - 1) {
        currentIndex++;
        updateQuestion();
    }
});

previousButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateQuestion();
    }
});

submitButton.addEventListener("click", () => {
    goToResultPage();
});

markButton.addEventListener("click", () => {
    toggleMarkQuestion();
});

// Add event listeners to radio buttons for option selection
radioInputs.forEach((radio, index) => {
    radio.addEventListener("change", () => {
        handleOptionClick(index);
    });
});

