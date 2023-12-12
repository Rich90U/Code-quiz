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

  