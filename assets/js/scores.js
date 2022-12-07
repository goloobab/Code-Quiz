var scoresContainer = document.querySelector("#highscores")
var clearBtn = document.querySelector("#clear")

// Displaying scores on the high score screen
showScores()

function showScores(){
    scores = getScores()
    //Sorting the scores object array highest to lowest
    scores.sort((a,b) => (b.score - a.score)); 
    // appending the scores and initials
    for(let i = 0; i < scores.length; i++){
        var item = document.createElement("li")
        item.textContent = scores[i].initials + " - " + scores[i].score
        scoresContainer.appendChild(item)
    }
}

// Getting saved scores from the local storage and parsing them
function getScores(){
    var scores = localStorage.getItem("scoresArr")
    return JSON.parse(scores) 
}

//Clearing the local storage data 
clearBtn.addEventListener("click", function(){
    localStorage.clear();
    scoresContainer.classList.add("hide");
})