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

function showQuestionAndChoices(questionIndex){
    var question = getNextQuestion(questionIndex);
    var choices = question.answerChoices;
    var answer = question.correctAnswer;

    showQuestion(question)
    showChoices(choices, answer)
}

function showQuestion(question) {
    var questionTitle = document.querySelector("#question-title");
    questionTitle.textContent = question.title 
}

function showChoices(choices, answer){
    var container = document.querySelector(".choices");
    clearContainer(container)
    populateChoicesContainer(container, choices, answer)
}

function clearContainer(container) {
    while(container.firstChild) {
        container.removeChild(container.firstChild)
    }
}


function populateChoicesContainer(choicesContainer, choices, answer) {
    // Generating a list of choices
    for (let i = 0; i < choices.length; i++){
        var choice = choices[i]
        var choiceBtn = createChoiceButtonElement(choice, i, answer)
        choicesContainer.appendChild(choiceBtn);
    }
}

function createChoiceButtonElement(choice, index, answer){
    var btn = document.createElement("button");
    btn.setAttribute("value", choice);
    btn.textContent = String(index + 1) + '. ' + choice
    btn.addEventListener("click", function(event){
        selectChoice(event, answer)
    })

    return btn
}

function selectChoice(event, answer){
    var selectedChoice = event.target.value
    var isAnswerCorrect = checkAnswer(selectedChoice, answer)
    updateScore(isAnswerCorrect);
    showFeedback(isAnswerCorrect);
    playFeedbackAudio(isAnswerCorrect);
    if (!isAnswerCorrect){
        penalize()
    }
    showNext();
}
// Reducing the seconds by 10 sec
function penalize(){
    quizDuration -= PENALTY
}
// Showing the next question
function showNext(){
    questionsIndex++;

    setTimeout(function(){
        if (questionsIndex < NUM_QUESTIONS){
            showQuestionAndChoices(questionsIndex)
        } else{
            stopQuiz();
        }
        hideFeedback();
    }, TRANSITION_DELAY)
}

function checkAnswer(selectedChoice, correctChoice){
    if (selectedChoice === correctChoice){
        return true
    } else {
        return false
    }
}

// feedback: output depends on the answer selected
// the output can either be "Correct!" or "Wrong!"
function showFeedback(isAnswerCorrect){
    feedbackEl.classList.remove("hide");
    if (isAnswerCorrect){
        feedbackEl.textContent = "Correct!"
        
    }
    else {
        feedbackEl.textContent = "Wrong!"
        
    }
}

// Playing correct or incorrect Audio file
function playFeedbackAudio(isAnswerCorrect){
    if (isAnswerCorrect){
        correctAudio.play()
    }
    else {
        incorrectAudio.play()
    }
}

function hideFeedback(){
    feedbackEl.classList.add("hide");
}

// Adding the scores per question
function updateScore(isAnswerCorrect){
    if (isAnswerCorrect){
        scoreCount += 1;
    }
}

function getScoresArrayFromLocalStorage(){
    var scoresArr = localStorage.getItem("scoresArr")
    if (scoresArr === null){
        localStorage.setItem("scoresArr", JSON.stringify([]))
    }

    return JSON.parse(localStorage.getItem("scoresArr"))
}

function storeScoreToLocalStorage(score) {
    var scoresArr = getScoresArrayFromLocalStorage()
    scoresArr.push(score)
    localStorage.setItem("scoresArr", JSON.stringify(scoresArr)) 
}

function storeScore(){
    var score =  {
        initials: initialsInputEl.value,
        score:scoreCount
    }
    storeScoreToLocalStorage(score)
}

submitBtn.addEventListener("click", submitScore)

function submitScore(){
    storeScore()
    location.href="./highscores.html"
   
}