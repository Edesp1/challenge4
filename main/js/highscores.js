function printHighscores() { //prints highscores
    var scores = JSON.parse(window.localStorage.getItem("scores")) || []; //retrieves scores from local storage

    scores.sort(function (firstScore, secondScore) {
        return firstScore.username.localeCompare(secondScore.username);
    });
    
    for (var i = 0; i < scores.length; i++) { //loops to make new highscore entry
        var liTag = document.createElement('li');
        liTag.textContent = scores[i].username + ' - ' + scores[i].score;

        var olEl = document.getElementById('highscores');
        olEl.appendChild(liTag);
    }
}

function clearHighscores() { //clears highscores
    window.localStorage.removeItem('scores');
    window.location.reload(); //once cleared it refreshes page
}

document.getElementById('clear').onclick = clearHighscores; //when clickes it clears highscores

printHighscores();//prints highscores