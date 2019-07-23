var questions = [
    {
        questionNo : 1,
        questionText : "text1",
        answers : [
            "answer1", 
            "answer2", 
            "answer3", 
            "answer4"
        ],
        correctAns : 1,
        correctGif : "",
        wrongGif : ""
    },
    {
        questionNo : 2,
        questionText : "text2",
        answers : ["answer1", "answer2", "answer3", "answer4"],
        correctAns : 1
    },
    {
        questionNo : 3,
        questionText : "text3",
        answers : ["answer1", "answer2", "answer3", "answer4"],
        correctAns : 1
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
            ++score;
            nextQuestion();  
        }else{
            console.log('wrong');
            nextQuestion();
        }
    }
});

function nextQuestion(){
    timeLeft = 10;
    ++currentQuestion;
    (currentQuestion === questions.length)?endGame():loadQuestion(currentQuestion);
}

function endGame(){
    console.log("Game Over")
    console.log(`Score: ${score}`)
    stopTimer();
    gameOver = true;
}

//Load first question and start timer
function loadQuestion(index){
    $("#question").text(questions[index].questionText)
    $(".answer").each((i, element) => $(element).text(questions[index].answers[i]));
    $("#timer").text(timeLeft);
    startTimer();
}



//player answers correct show correct gif
//if timer runs out or wrong question is marked wrong, show wrong gif
//then load next question


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
  
    $("#timer").text(timeLeft);
    if (timeLeft === 0){
        stopTimer();
        nextQuestion();
    }
  }
  