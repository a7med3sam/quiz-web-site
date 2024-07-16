import Question from './Question.js';
import Answer from './Answer.js';

let q1 = new Question("What does HTML stand for?", [
    new Answer("High Tech Markup Language", false),
    new Answer("Hyperlinks and Text Markup Language", false),
    new Answer("Hyper Text Markup Language", true),
    new Answer("Home Tool Markup Language", false),
]);

let q2 = new Question("Which tag is used to define an image in HTML?", [
    new Answer("<picture>", false),
    new Answer("<image>", false),
    new Answer("<img>", true),
    new Answer("<src>", false),
]);

let q3 = new Question("Which tag is used to define an unordered list in HTML?", [
    new Answer("<li>", false),
    new Answer("<list>", false),
    new Answer("<ul>", true),
    new Answer("<ol>", false),
]);

let q4 = new Question("Which tag is used to create a hyperlink in HTML?", [
    new Answer("<link>", false),
    new Answer("<href>", false),
    new Answer("<a>", true),
    new Answer("<hyperlink>", false),
]);

let q5 = new Question("Which tag is used to define a line break in HTML?", [
    new Answer("<break>", false),
    new Answer("<lb>", false),
    new Answer("<br>", true),
    new Answer("<newline>", false),
]);
let q6 = new Question("Which tag is used to define a table row in HTML?", [
    new Answer("<th>", false),
    new Answer("<td>", false),
    new Answer("<tr>", true),
    new Answer("<table-row>", false),
]);
let q7 = new Question("Which tag is used to define a line break in HTML?", [
    new Answer("<break>", false),
    new Answer("<lb>", false),
    new Answer("<br>", true),
    new Answer("<newline>", false),
]);
let q8 = new Question("Which HTML tag is used to define emphasized text?", [
    new Answer("<italic>", false),
    new Answer("<strong>", false),
    new Answer("<em>", true),
    new Answer("<bold>", false),
]);
let q9 = new Question("Which tag is used to define metadata in HTML?", [
    new Answer("<data>", false),
    new Answer("<info>", false),
    new Answer("<meta>", true),
    new Answer("<meta-data>", false),
]);
let q10 = new Question("In HTML, which tag is used to define a level-one heading?", [
    new Answer("<head1>", false),
    new Answer("<header1>", false),
    new Answer("<h1>", true),
    new Answer("<level1>", false),
]);

let quiz = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
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
        radioInputs[i].disabled = false; // Enable radio buttons

        // Highlight selected answer if already selected
        if (currentQuestion.getSelectedAnswer() === i) {
            radioInputs[i].checked = true; // Example: Select radio button on selection
        }
    }

    if (currentIndex === 0) {
        previousButton.style.visibility = "hidden";
    } else {
        previousButton.style.visibility = "visible";
    }
    if (currentIndex === quiz.length - 1) {
        nextButton.style.visibility = "hidden";
    } else {
        nextButton.style.visibility = "visible";
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
    let currentQuestion = quiz[currentIndex];
    let existingMarkedQuestion = Array.from(markedQuestionsDiv.children).find((div) => parseInt(div.dataset.index) === currentIndex);

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

