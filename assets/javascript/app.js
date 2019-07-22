var questions = [
    {
        questionNo : 1,
        questionText : "text",
        answers : ["answer1", "answer2", "answer3", "answer4"],
        correctAns : 1,
        correctGif : "",
        wrongGif : ""
    },
    {
        questionNo : 2,
        questionText : "text",
        answers : ["answer1", "answer2", "answer3", "answer4"],
        correctAns : 1
    },
    {
        questionNo : 3,
        questionText : "text",
        answers : ["answer1", "answer2", "answer3", "answer4"],
        correctAns : 1
    }
]

var intervalId;
var clockRunning = false;
var timeLeft = 3;
var currentQuestion = 0;

loadQuestion(currentQuestion);

$(document).on("click", ".answer", function(){
    timeLeft = 10;
    
    if ($(this).text() === questions[currentQuestion].answers[questions[currentQuestion].correctAns]){
        console.log("correct");
        loadQuestion(currentQuestion);
        ++currentQuestion;
    }else
        console.log('wrong');

    (currentQuestion === questions.length)?console.log("Game Over"):"";
    

});

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
      intervalId = setInterval(count, 1000);
      clockRunning = true;
    }
  }

function stop() {
    clearInterval(intervalId);
    clockRunning = false;
    $("#timer").text("Times Up!!!");
}

function count() {
    timeLeft--;
  
    $("#timer").text(timeLeft);
    (timeLeft === 0)?clockRunning = stop():"";
  }
  