// logic.js
document.addEventListener("DOMContentLoaded", function () {
  var startButton = document.getElementById("start");
  var questionsContainer = document.getElementById("questions");
  var choicesContainer = document.getElementById("choices");
  var feedbackContainer = document.getElementById("feedback");
  var timerElement = document.getElementById("time");
  var finalScoreElement = document.getElementById("final-score");
  var initialsInput = document.getElementById("initials");
  var submitButton = document.getElementById("submit");

  var currentQuestionIndex = 0;
  var timer;
  var timeLeft = 60; 

  startButton.addEventListener("click", startQuiz);

  function startQuiz() {
    startButton.parentNode.classList.add("hide");
    questionsContainer.classList.remove("hide");
    timer = setInterval(updateTimer, 1000);
    displayQuestion();
  }

  function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question-title").textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";

    for (var i = 0; i < currentQuestion.choices.length; i++) {
      var choiceButton = document.createElement("button");
      choiceButton.textContent = currentQuestion.choices[i];
      (function (index) {
        choiceButton.addEventListener("click", function () {
          checkAnswer(index);
        });
      })(i);
      choicesContainer.appendChild(choiceButton);
    }
  }

  function checkAnswer(choiceIndex) {
    var currentQuestion = questions[currentQuestionIndex];
  
    if (choiceIndex === currentQuestion.correctAnswer) {
      feedbackContainer.textContent = "Correct!";
    } else {
      feedbackContainer.textContent = "Wrong! -10 seconds";
      timeLeft -= 10; // Penalty for wrong answer
      
      finalScoreElement.textContent = timeLeft;
    }
  
    setTimeout(function () {
      feedbackContainer.textContent = "";
      currentQuestionIndex++;
  
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    }, 1000);
  }

  function endQuiz() {
    clearInterval(timer);
    questionsContainer.classList.add("hide");
    document.getElementById("end-screen").classList.remove("hide");
    finalScoreElement.textContent = timeLeft;
  }

  function updateTimer() {
    if (timeLeft > 0) {
      timeLeft--;
      timerElement.textContent = timeLeft;
    } else {
      endQuiz();
    }
  }

  submitButton.addEventListener("click", function () {
    var initials = initialsInput.value.trim();

    if (initials !== "") {
      saveHighscore(initials, timeLeft);
      displayHighscores(); 
    } else {
      feedbackContainer.textContent = "Please enter your initials.";
    }
  });

  function displayHighscores() {
    var highscoresList = document.getElementById("highscores");
  
    if (highscoresList) {
      highscoresList.innerHTML = ""; 
  
      var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
      highscores.sort((a, b) => b.score - a.score);
  
      highscores.forEach(function (score, index) {
        var li = document.createElement("li");
        li.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
        highscoresList.appendChild(li);
      });
    } 
  }
});