var buttonscontainer;
var timerupdate;
var quizquestionview;
var quizquestioninput;
var quizquestionsubmit;
var quizquestionoptions;
var timerview;
var timeleft;
var lastupdate;
var score;
var scoreview;

var questions = [
  {
    question: "How do you comment in Javascript?",
    options: {
      a: "//",
      b: "..",
      c: "<",
      d: "=>",
    },
    answer: "a",
  },
  {
    question: "How do you declare a variable that can not change?",
    options: {
      a: "var",
      b: "const",
      c: "let",
      d: "auto",
    },
    answer: "b",
  },
  {
    question: "How do you declare a function?",
    options: {
      a: "var",
      b: "if",
      c: "function display()",
      d: "display()",
    },
    answer: "c",
  },
  {
    question: "How do you declare an anonymous function?",
    options: {
      a: "lambda",
      b: "function display()",
      c: "AF",
      d: "() => ()",
    },
    answer: "d",
  },
  {
    question: "Inside which HTML do we put the Javascript? ",
    options: {
      a: "<scripting>",
      b: "<javascript>",
      c: "<script>",
      d: "<js>",
    },
    answer: "c",
  },
];
function displayquestion(questionnumber) {
  var currentquestion = questions[questionnumber];
  quizquestionview.html(currentquestion.question);
  buttonscontainer.html("");
  for (let key in currentquestion.options) {
    var button = $("<button></button>");
    button.text(currentquestion.options[key]);
    buttonscontainer.append(button);
    button.on("click", () => {
      onanswer(currentquestion.answer, key, questionnumber + 1);
    });
  }
}
function onanswer(answer, useranswer, nextquestion) {
  if (nextquestion >= questions.length) {
    timeleft = 0;
  }
  if (answer !== useranswer) {
    timeleft -= 1000 * 10;
  } else {
    score += 20;
    scoreview.html(`score: ${score}`);
  }
  displayquestion(nextquestion);
}

function displayStartMenu() {
  $("#startscreen").show().text("");
  var highscoreview = $("<div></div>");
  var keys = Object.keys(window.localStorage);
  var display = "High Scores <br>";
  keys.forEach((key) => {
    display += `${key}
    
    ${window.localStorage.getItem(key)}<br>`;
  });
  highscoreview.html(display);
  var button = $("<button>startquiz</button>").on("click", startQuiz);
  $("#startscreen").append(button).append(highscoreview);
}

function startQuiz() {
  score = 0;
  $("#startscreen").hide();
  scoreview = $("<div> </div>");
  quizquestionview = $("<div> </div>");
  scoreview.html(`score: ${score}`);
  buttonscontainer = $("<div></div>").addClass("buttonscontainer");

  timerview = $("<div> </div>");
  $("#quiz")
    .show()
    .text("")
    .append(quizquestionview)
    .append(buttonscontainer)
    .append(scoreview)
    .append(timerview);
  timeleft = 1000 * 60 * 1;
  lastupdate = Date.now();
  displayquestion(0);
  timerupdate = setInterval(updatetimer, 100);

  score = 0;
}
function updatetimer() {
  var currenttime = Date.now();
  var timesince = currenttime - lastupdate;
  timeleft -= timesince;
  if (timeleft <= 0) {
    startresults();
  }
  timerview.html(Math.floor(timeleft / 1000));
  lastupdate = currenttime;
}

function startresults() {
  $("#results").show().text("");
  var Initialsinput = $("<input type=`text`>");
  var submit = $("<button>Save High Score</button>");
  submit.on("click", () => {
    window.localStorage.setItem(Initialsinput.val(), score);
    submit.remove();
    Initialsinput.remove();
    $("#results").append($("<div>savehighscore</div>"));
  });
  clearInterval(timerupdate);
  $("#quiz").hide();
  scoreview = $("<div> </div>").html(`Your High Score is ${score}`);
  var reset = $("<button>RESET</button>");
  reset.on("click", () => {
    $("#results").hide();
    displayStartMenu();
  });
  $("#results")
    .append(scoreview)
    .append(Initialsinput)
    .append(submit)
    .append(reset);
}
displayStartMenu();
