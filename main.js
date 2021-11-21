function displayStartMenu() {

    var button = $("<button>startquiz</button>").on("click", startQuiz)
    $("#startscreen").append(button)
}

function startQuiz() {
    $("#startscreen").hide() 
    $("#quiz").show()
}

function startresults() {
    
}
displayStartMenu()

