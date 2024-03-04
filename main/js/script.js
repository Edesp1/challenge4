var questionIndex = 0;
var time = questions.length * 15
var timerId;

var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('finish');
var startBtn = document.getElementById('start');
var usernameEl = document.getElementById('username');
var feedbackEl = document.getElementById('feedback');

var sfxRight = new Audio("sfx/correct.wav");
var sfxWrong = new Audio("sfx/incorrect.wav");

function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide"); //hides start screen

    questionsEl.removeAttribute("class"); 
    timerId = setInterval(clockTick, 1000); //starts timer

    timerEl.textContent = time;

    getQuestion(); //loads first question
}

function getQuestion() {
    var currentQ = questions[questionIndex];
    var titleEl = document.getElementById("question-title"); //displays the question

    titleEl.textContent = currentQ.title; 
    choicesEl.innerHTML = " ";

    for(var i = 0; i < currentQ.choices.length; i++) { //creates buttons for each question based on the questions and what awnsers could be chosen from said questions
        var choice = currentQ.choices[i];
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute('value', choice);
        choiceNode.style.borderRadius = "10px" //makes buttons have rounded edges

        choiceNode.textContent = i + 1 + '. ' + choice;
        choicesEl.appendChild(choiceNode);
    }
}

function questionClick(event) {
    var buttonEl = event.target;

    if (!buttonEl.matches('.choice')) { //checks to see if button clicked matches a choice 
        return;
      }

    if (buttonEl.value !== questions[questionIndex].answer) { //checks to see if clicked choice is correct or wrong and plays correct/incorrect sound based on answer
        time -=15;

        if(time < 0) {
            time = 0;
        }

        timerEl.textContent = time;
        sfxWrong.play();
        feedbackEl.textContent = "Wrong!";
    } else {
        sfxRight.play();
        feedbackEl.textContent = "Correct!";
    }

    feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 1000);

  questionIndex++; //moves to next question

  if(time <= 0 || questionIndex == questions.length) { //checks if quiz should end based on time left or should continue
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() { //ends quiz

    clearInterval(timerId);
  
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');
  
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
  
    questionsEl.setAttribute('class', 'hide'); //hides questions
}

function clockTick() { //updates time

    time--;
    timerEl.textContent = time;
  
    if (time <= 0) {
      quizEnd();
    }
}

startBtn.onclick = startQuiz;

choicesEl.onclick = questionClick;
