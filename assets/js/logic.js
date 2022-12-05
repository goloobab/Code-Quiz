// Logic file
// Declaring of global variables

const TRANSITION_DELAY = 500 // msec
const TIMER_PERIOD = 1000 // msec
const PENALTY = 10 // sec
var quizDuration = 30 // sec
var questionsScreen = document.querySelector("#questions");
var feedbackEl = document.querySelector("#feedback");
var startQuizBtn = document.querySelector("#start");
var endQuizScreen = document.querySelector("#end-screen");
var initialsInputEl = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");
var questionsIndex = 0

// When user clicks the start quiz button the start screen hides
function startQuiz(){
    hideStartScreen();
    startTimer();
    showQuiz();
}
startQuizBtn.addEventListener("click", startQuiz);

function hideStartScreen(){
    var startScreenDiv = document.querySelector("#start-screen");
    startScreenDiv.classList.add("hide");
}