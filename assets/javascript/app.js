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
        wrongGif : "https://media.giphy.com/media/wNbMrlmfatKqA/giphy.gif",
        backgroundImg : "https://images.vice.com/vice/images/articles/meta/2015/05/15/entendiendo-el-traje-de-ironman-1431728701.jpg",
        titleColor: "#760c10e7",
        quizColor: "#d7bb2be7"
    },
    {
        questionNo : 2,
        questionText : "In which MCU movie did the character of Peter Parker first appear?",
        answers : [
            "Iron Man 2", 
            "Spiderman: Homecoming", 
            "Captain America: Civil War", 
            "Avengers: Infinity War"
        ],
        correctAns : 0,
        correctGif : "https://66.media.tumblr.com/938ec4e7eba4d66a6b643b8815a5b3a4/tumblr_inline_p8ud2cI25d1tkli1e_500.gif",
        wrongGif : "https://media.giphy.com/media/xT9IgoB4yOspMqzufu/giphy.gif",
        backgroundImg : "https://i.ytimg.com/vi/BNcxTNrtRdk/maxresdefault.jpg",
        titleColor: "#b11313e7",
        quizColor: "#2b3784e7",
    },
    {
        questionNo : 3,
        questionText : "What is the name of Captain America's unit during WWII?",
        answers : [
            "Star Spangled Men", 
            "Red White Blue", 
            "America's Finest", 
            "Howling Commando's"
        ],
        correctAns : 3,
        correctGif : "https://media.giphy.com/media/1lk1IcVgqPLkA/giphy.gif",
        wrongGif : "http://giphygifs.s3.amazonaws.com/media/dGQinrFi3BDIQ/giphy.gif",
        backgroundImg : "https://fsmedia.imgix.net/11/91/65/66/aa08/4ef6/be12/964b648601b6/captain-america-the-winter-soldier.jpeg?rect=0%2C0%2C1920%2C960&auto=format%2Ccompress&dpr=2&w=650",
        titleColor: "#c31D10e7",
        quizColor: "#162ca2e7",
    }
    // {
    //     questionNo : ,
    //     questionText : "",
    //     answers : [
    //         "", 
    //         "", 
    //         "", 
    //         ""
    //     ],
    //     correctAns : 1,
    //     correctGif : "",
    //     wrongGif : "",
    //     backgroundImg : "",
    //     titleColor: "e7",
    //     quizColor: "#e7",
    // }
]

var intervalId;
var clockRunning = false;
var gameOver = false;
var timeLeft = 10;
var score = 0;
var currentQuestion = 0;

loadQuestion(currentQuestion);

$(document).on("click", ".answer button", function(){
    //Does not allow button click if game is over
    if(gameOver === false){
        //check if the question is correct
        if ($(this).text() === questions[currentQuestion].answers[questions[currentQuestion].correctAns]){
            console.log("correct");
            loadGIF(questions[currentQuestion].correctGif, true) 
        }else{
            console.log('wrong');
            loadGIF(questions[currentQuestion].wrongGif, false)
        }
    }
});

//hide the buttons then loads the GIF based on answer and increments the score
function loadGIF(questionGIF, correct){
    $(".answer").hide();
    $("#answerGIF").append($("<img>").attr("src", questionGIF));
    setTimeout(function(){
        $("#answerGIF").empty();
        if(correct)
            ++score;
        $(".answer").show();
        nextQuestion();
    }, 1000*5);

}

//gets the next question in the array and checks for last question
function nextQuestion(){
    timeLeft = 11;
    ++currentQuestion;
    (currentQuestion === questions.length)?endGame():loadQuestion(currentQuestion);
}

//ends the game and displays final score
function endGame(){
    console.log("Game Over")
    console.log(`Score: ${score}`)
    stopTimer();
    gameOver = true;
}

//loads question/answers onto DOM and sets custom background and colors
function loadQuestion(index){
    $("body")
        .css("background-image", "url(" + questions[currentQuestion].backgroundImg + ")")
        .css("height", "100vh")
        .css("margin", "0")
        .css("background-size", "cover")
        .css("background-blend-mode", "soft-light")
        .css("background-color", "#ffffff7d")
        .css("z-index", "-1")
        .css("margin", "0")
        .css("background-repeat", "no-repeat");

    $("#title").css("background-color", questions[currentQuestion].titleColor);
    $("#quizArea").css("background-color", questions[currentQuestion].quizColor);

    $("#question").empty();
    $("#question")
        .append($("<h3>")
            .text(`${questions[index].questionNo}. ${questions[index].questionText}`)  
            .addClass("text-center m-3")
            .append($("<hr>"))
        );

    $(".answer").each((i, element) => $(element).empty())
    $(".answer").each((i, element) => $(element)
        .append($("<button>")
            .text(questions[index].answers[i])
            .addClass("btn btn-secondary m-2 p-4")
            .css("width", "350px")
        ));

    startTimer();
}

//starts quiz timer
function startTimer() {
    if (!clockRunning) {
      intervalId = setInterval(countTimer, 1000);
      clockRunning = true;
    }
  }

//stops quiz timer
function stopTimer() {
    clearInterval(intervalId);
    clockRunning = false;
}

//increments the timer
function countTimer() {
    timeLeft--;
  
    $("#timer").text(`Question Timer: ${timeLeft}`);

    if (timeLeft === 0){
        stopTimer();
        nextQuestion();
    }
  }
  