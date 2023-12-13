

function saveHighscore(initials, score) {
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push({ initials: initials, score: score });
  localStorage.setItem("highscores", JSON.stringify(highscores));
}


function displayHighscores() {
  var highscoresList = document.getElementById("highscores");
  highscoresList.innerHTML = ""; // Clear existing highscores

  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.sort((a, b) => b.score - a.score);

  highscores.forEach(function (score, index) {
    var li = document.createElement("li");
    li.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
    highscoresList.appendChild(li);
  });
}


function clearHighscores() {
  localStorage.removeItem("highscores");
  displayHighscores(); // Refresh the displayed highscores
}


