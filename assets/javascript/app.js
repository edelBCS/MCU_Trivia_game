var questions = [
    {
        questionNo : 1,
        questionText : "What is the name of the terrorist organization that kidnaps Tony Stark?",
        answers : [
            "The Ten Rings", 
            "Manderin Assassins", 
            "ISIS", 
            "Obadiah Stane's"
        ],
        correctAns : 0,
        correctGif : "https://media.giphy.com/media/DjclSiVtiB11C/giphy.gif",
        wrongGif : "https://media.giphy.com/media/wNbMrlmfatKqA/giphy.gif"
    }
]

var intervalId;
var clockRunning = false;
var gameOver = false;
var timeLeft = 10;
var score = 0;
var currentQuestion = 0;

loadQuestion(currentQuestion);

$(document).on("click", ".answer", function(){
    if(gameOver === false){
        
        if ($(this).text() === questions[currentQuestion].answers[questions[currentQuestion].correctAns]){
            console.log("correct");
            loadGIF(questions[currentQuestion].correctGif)
            ++score;
            nextQuestion();  
        }else{
            console.log('wrong');
            loadGIF(questions[currentQuestion].wrongGif)
            nextQuestion();
        }
    }
});

function loadGIF(questionGIF){
    $("#answerGIF").append($("<img>").attr("src", questionGIF));
    setTimeout(function(){$("#answerGIF").empty()}, 1000*5);

}

function nextQuestion(){
    timeLeft = 11;
    ++currentQuestion;
    (currentQuestion === questions.length)?endGame():loadQuestion(currentQuestion);
}

function endGame(){
    console.log("Game Over")
    console.log(`Score: ${score}`)
    stopTimer();
    gameOver = true;
}

function loadQuestion(index){
    $("#question").empty();
    $("#question")
        .append($("<h2>")
            .text(`${questions[index].questionNo}. ${questions[index].questionText}`)  
            .addClass("text-center m-3")
            .append($("<hr>"))
        );

    $(".answer").each((i, element) => $(element).empty())
    $(".answer").each((i, element) => $(element)
        .append($("<button>")
            .text(questions[index].answers[i])
            .addClass("btn btn-secondary m-2")
        ));

    startTimer();
}

function startTimer() {
    if (!clockRunning) {
      intervalId = setInterval(countTimer, 1000);
      clockRunning = true;
    }
  }

function stopTimer() {
    clearInterval(intervalId);
    clockRunning = false;
}

function countTimer() {
    timeLeft--;
  
    $("#timer").text(`Question Timer: ${timeLeft}`);

    if (timeLeft === 0){
        stopTimer();
        nextQuestion();
    }
  }
  