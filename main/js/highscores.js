function printHighscores() {
    var scores = JSON.parse(window.localStorage.getItem("scores")) || [];

    scores.sort(function (firstScore, secondScore) {
        return firstScore.username.localeCompare(secondScore.username);
    });
    
    for (var i = 0; i < scores.length; i++) {
        var liTag = document.createElement('li');
        liTag.textContent = scores[i].username + ' - ' + scores[i].score;

        var olEl = document.getElementById('highscores');
        olEl.appendChild(liTag);
    }
}

function clearHighscores() {
    window.localStorage.removeItem('scores');
    window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

printHighscores();