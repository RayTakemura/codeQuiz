//Global variables
var bodyEl = document.querySelector("body");
var asideEl = document.querySelector("aside");
var mainEl = document.querySelector("main");
var highScore = [];
var timeLeft = 75; //in seconds
const MAX_HS = 3; // maximum number of high score stored...

//create elemnts that goes inside the aside section on the top
var createAsideElements  = function() {
    //create high score button that shows the high scores
    var highScoreBtnEl = document.createElement("button");
    highScoreBtnEl.textContent = "View high scores";
    highScoreBtnEl.className = "hs-btn";
    asideEl.appendChild(highScoreBtnEl);

    //create timer element that displays time remaining
    var timerEl = document.createElement("span");
    timerEl.textContent = "Time: " + timeLeft;
    asideEl.appendChild(timerEl);
};

var highScoreBtnHandler = function() {
    //get high score from localstorage and use it to display on alert
    var highScore = localStorage.getItem('hs');
    if (!highScores) {
        return alert("No high score!");
    }
    var highScores = highScore.split(',');

    // pick high scores
    if (highScores.length > (MAX_HS * 2)){
        var min = parseInt(highScores[1]);
        for (var i = 0; i < highScores.length; i++){
            var scoreIndex = ( 2 * i ) + 1;
            if (min < parseInt(highScores[scoreIndex])) {
                min = parseInt(highScores[scoreIndex]);
            }
        }
        lowScoreIndex = highScores.indexOf(min.toString()) - 1;
        highScores.splice(lowScoreIndex, 2);
    }
    // alert the high scores
    var hsMessage = "";
    for (var i = 0; i < highScores.length; i++){
        var initials = 2 * i;
        var score = initials + 1;
        hsMessage += highScores[initials] + ":   " + highScores[score] + "\n";
    }
    alert(hsMessage);
};

function timer(timerEl) {
    var timeInterval = setInterval(function() {
        if( timeLeft < 0 ){
            clearInterval(timeInterval);
            //function that changes the whole body to the result screen
        } else {
            timerEl.textContent = "Time: " + timeLeft;
            timeLeft--;
        }
    }, 1000);
};


//create start page
//this page will explain about he website and have a start button
//once the start button is pressed, the timer starts

//create question page(s)
//requires array of questions with choices and answer
//requires local storage for highscore.
//for i < array.length then the game is over
//once clicked on a choice, it checks if it's a correct answer
//if correct, give point(s) and say "correct!" below the choices
//else if incorrect take time away and say "wrong!" below the choices
//if timer === 0 the game is over

//create game over page
//present the user's score 
//prompt for user initials
//input box and submit button

/**
 * Sets up to create the start page of the code quiz website
 */
function createStartPage() {
    createAsideElements();
};

createStartPage();

asideEl.addEventListener("click", highScoreBtnHandler);

