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

// Call all the functions required to start the quiz
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

// Timer count down
function startTimer(){
    var timerEl = document.querySelector("#time");
    var timer = setInterval(function(){
        if (quizDuration >= 0){
            timerEl.textContent = quizDuration
            quizDuration -= (TIMER_PERIOD / 1000);
        } else {
            clearInterval(timer);
            timerEl.textContent = ""
            stopQuiz();
        }
    }, TIMER_PERIOD)
}


function showQuiz(){
    /* After hiding the start screen the first question
    1. unhide the questions element
    2. display question and choices
    */
    showQuestionsScreen();
    showQuestionAndChoices(questionsIndex);
}

// This fn shows/unhides the questions element
function showQuestionsScreen(){
    questionsScreen.classList.remove("hide");
}

// Calls functions that hide the questions and show the end of quiz page
function stopQuiz(){
    hideQuestionsScreen()
    showEndQuizScreen()
}
// Hides the Questions screen
function hideQuestionsScreen(){
    questionsScreen.classList.add("hide");
}

function showEndQuizScreen(){
    var scoreEl = document.querySelector("#final-score");
    endQuizScreen.classList.remove("hide");
    scoreEl.textContent = scoreCount;
}
