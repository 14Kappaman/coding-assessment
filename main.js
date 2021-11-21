

var quizquestionview;
var quizquestioninput;
var quizquestionsubmit;
var quizquestionoptions;
var timer;

var questions = [
    {question: "Which item is an example of a physical change?", options: {
        a: "freezing",
        b: "rusting",
        c: "spoiling",
        d: "digesting",
    }, answer: "a"}, 
    /*{question: "", options: {
        a: "",
        b: "",
        c: "",
        d: "",
    }, answer: "a"},
    {question: "", options: {
        a: "",
        b: "",
        c: "",
        d: "",
    }, answer: "a"},
    {question: "", options: {
        a: "",
        b: "",
        c: "",
        d: "",
    }, answer: "a"}
    {question: "", options: {
        a: "",
        b: "",
        c: "",
        d: "",
    }, answer: "a"}*/
]
function displayquestion(){
    var question = questions[0]
    quizquestionview.html(question.question) 
    quizquestionoptions[0].html(question.options["a"]) 
    quizquestionoptions[1].html(question.options["b"]) 
    quizquestionoptions[2].html(question.options["c"]) 
    quizquestionoptions[3].html(question.options["d"])
}


function displayStartMenu() {

    var button = $("<button>startquiz</button>").on("click", startQuiz)
    $("#startscreen").append(button)
}

function startQuiz() {
    $("#startscreen").hide() 
  
    quizquestionview = $("<div> </div>")  
    var options = $("<span> </span>").addClass("row")
    var optionsbutton = $("<span> </span>").addClass("row")
    quizquestionoptions = [
        $("<div></div>"),
        $("<div></div>"),
        $("<div></div>"),
        $("<div></div>")

    ]
    quizquestioninput = [
        $('<input type ="radio">'), $('<input type="radio">'),$('<input type="radio">'),$('<input type="radio">')
    ]
    quizquestionsubmit = $("<div> </div>")
    timer = $("<div> </div>")
    $("#quiz").show()
    .append(quizquestionview)
    .append(options.append(quizquestionoptions))
    .append(optionsbutton.append(quizquestioninput))
    .append(quizquestionsubmit)
    .append(timer)
    displayquestion()
}

function startresults() {
    
}
displayStartMenu()

