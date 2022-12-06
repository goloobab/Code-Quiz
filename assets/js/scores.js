var scoresContainer = document.querySelector("#highscores")
var clearBtn = document.querySelector("#clear")


showScores()

function showScores(){
    scores = getScores()

    for(let i = 0; i < scores.length; i++){
        var item = document.createElement("li")
        item.textContent = scores[i].initials + " - " + scores[i].score
        scoresContainer.appendChild(item)
    }
}

function getScores(){
    var scores = localStorage.getItem("scoresArr")
    return JSON.parse(scores) 
}

clearBtn.addEventListener("click", function(){
    localStorage.clear();
    scoresContainer.classList.add("hide");
})