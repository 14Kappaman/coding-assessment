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
    {question: "Which item is an example of a physical change?", options: {
        a: "freezing",
        b: "rusting",
        c: "spoiling",
        d: "digesting",
    }, answer: "a"}, 
    {question: "Ice melting is an example of a?", options: {
        a: "chemical change",
        b: "physical change"
        
    }, answer: "b"},
    {question: "Roasting a marshmallow is an example of a?", options: {
        a: "chemical change",
        b: "physical change",
       
    }, answer: "a"},
    {question: "Is moving the lawn an example of physical or chemical change?", options: {
        a: "chemical change",
        b: "physical change",
        
    }, answer: "b"},
    {question: "Is bleaching your hair a physical or chemical change?", options: {
        a: "physical change",
        b: "chemical change",
    
    }, answer: "b"}
]
function displayquestion(questionnumber){
    var currentquestion=questions[questionnumber]
    quizquestionview.html(currentquestion.question) 
    buttonscontainer.html("")
    for (let key in currentquestion.options){
        var button=$("<button></button>")  
        button.html(currentquestion.options[key])  
        buttonscontainer.append(button) 
        button.on("click", () => {
            onanswer(currentquestion.answer,key,questionnumber+1)
        })
    }
    
    
}
function onanswer(answer,useranswer,nextquestion){ 
    if (nextquestion >= questions.length){timeleft =0}
    if (answer !== useranswer){
        timeleft-=1000*10
    }else {
        score+=20;
        scoreview.html(`score: ${score}`)
    }
displayquestion(nextquestion)
}

function displayStartMenu() {
var highscoreview =$("<div></div>")
var keys=Object.keys(window.localStorage)
var display=""
keys.forEach(key =>{
    display+=`x${key}
    
    ${window.localStorage.getItem(key)}`
})
highscoreview.html(display)
    var button = $("<button>startquiz</button>").on("click", startQuiz)
    $("#startscreen").append(button).append(highscoreview)
}

function startQuiz() {
    $("#startscreen").hide() 
  scoreview=$("<div> </div>")
    quizquestionview = $("<div> </div>")  
    scoreview.html(`score: ${score}`)
    buttonscontainer = $('<div></div>').addClass('buttonscontainer')
  
    timerview = $("<div> </div>")
    $("#quiz").show()
    .append(quizquestionview)
    .append(buttonscontainer)
    .append(scoreview)   
    .append(timerview)
    timeleft=1000*60*1
    lastupdate=Date.now()
    displayquestion(0)
    timerupdate=setInterval(updatetimer,100)

    score=0
}
function updatetimer( ) {
    var currenttime = Date.now()
    var timesince = currenttime - lastupdate
    timeleft -= timesince;
    if (timeleft <= 0){
        startresults() 
    }
    timerview.html(Math.floor(timeleft/1000))
    lastupdate=currenttime 
    
}

function startresults() {
    $("#results").show()
    var Initialsinput=$("<input type=`text`>")
    var submit=$("<button>Save High Score</button>")
    submit.on("click", () => {
        window.localStorage.setItem(Initialsinput.val( ),score)
        submit.remove()
        Initialsinput.remove()
        $("#results").append($("<div>savehighscore</div>"))
    })
    clearInterval(timerupdate)
    $("#quiz").hide()
    scoreview=$("<div> </div>")
    .html(`Your High Score is ${score}`)
    $("#results").append(scoreview)
    .append(Initialsinput)
    .append(submit)
}
displayStartMenu()

