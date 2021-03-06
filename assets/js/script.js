//Global variables
var bodyEl = document.querySelector('body');
var asideEl = document.querySelector('aside');
var mainEl = document.querySelector('main');
var highScores = [];
var timeLeft = 75; //in seconds
const MAX_HS = 3; // maximum number of high score stored...

/**
 * Creates elements inside the aside section.
 * The created elements are: a high score alerting button and the timer.
 */
var createAsideElements  = function() {
    // var asideEl = document.createElement('aside');
    // asideEl.className = 'flex';
    // bodyEl.appendChild(asideEl);

    //create high score button that shows the high scores
    var highScoreBtnEl = document.createElement('button');
    highScoreBtnEl.textContent = "View high scores";
    highScoreBtnEl.className = 'hs-btn';
    asideEl.appendChild(highScoreBtnEl);

    //create timer element that displays time remaining
    var timerEl = document.createElement('span');
    timerEl.textContent = "Time: " + timeLeft;
    timerEl.className = 'timer';
    asideEl.appendChild(timerEl);
};

/**
 * Alerts user a list of high scores with user initials
 * @returns alert with "No high score!" if there is no high score saved in the localstorage
 */
var highScoreBtnHandler = function() {
    //get high score from localstorage and use it to display on alert
    var highScore = localStorage.getItem('hs');
    if (!highScore) {
        return alert("No high score!");
    }
    highScores = highScore.split(',');

    // pick high scores
    if (highScores.length > (MAX_HS * 2)){
        var min = parseInt(highScores[1]);
        for (var i = 0; i < highScores.length / 2; i++){
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
    for (var i = 0; i < highScores.length / 2; i++){
        var initials = 2 * i;
        var score = initials + 1;
        hsMessage += highScores[initials] + ":   " + highScores[score] + "\n";
    }
    alert(hsMessage);
};

/**
 * Counts down the timer every second.
 * 
 * @param {document} timerEl The timer Element in the aside section
 */
function timer(timerEl) {
    var timeInterval = setInterval(function() {
        if( timeLeft < 0 ){
            clearInterval(timeInterval);
            //TO DO: insert function that changes the whole body section to the result screen
        } else {
            timerEl.textContent = "Time: " + timeLeft;
            timeLeft--;
        }
    }, 1000);
};


/**
 * Creates the elements in the main section for the start page.
 * Start page includes the aside section on top and the title
 * of the page, description, and the start quiz button.
 */
var createStartMainEls = function(){
    // var mainEl = document.createElement('main');
    // mainEl.className = 'flex';
    // bodyEl.appendChild(mainEl);

    var h1El = document.createElement('h1');
    h1El.textContent = "Code Quiz Challenge";
    h1El.className = 's-title';
    mainEl.appendChild(h1El);

    var pEl = document.createElement('p');
    pEl.textContent = "Try to answer the following code-related" +
    " questions within the time limit. Keep in mind that incorrect" +
    " answers will penalize your score/time by ten seconds!";
    pEl.className = 's-p';
    mainEl.appendChild(pEl);
    
    // create button element to start quiz and timer
    var startQuizBtnEl = document.createElement('button');
    startQuizBtnEl.textContent = "Start Quiz";
    startQuizBtnEl.className = 'sq-btn';
    mainEl.appendChild(startQuizBtnEl);
};

var nextButtonHandler = function(event) {
    // delete main
    if (event.target.matches('.sq-btn')){
        //createQuestionPage();
        timer(document.querySelector('.timer'));
    } else if (event.target.matches('.choice')){

    }
    
};

//create question page(s)
//requires array of questions with choices and answer
//requires local storage for highscore.
//for i < array.length then the game is over
//once clicked on a choice, it checks if it's a correct answer
//if correct, give point(s) and say "correct!" below the choices
//else if incorrect take time away and say "wrong!" below the choices
//if timer === 0 the game is over

var createQuestionPage = function() {
    var h2El = document.createElement('h2');
    //h2El.textContent = ;
    h2El.className = 's-title';
    mainEl.appendChild(h2El);
};

//create game over page
//present the user's score 
//prompt for user initials
//input box and submit button

/**
 * Sets up to create the start page of the code quiz website
 */
function createStartPage() {
    createAsideElements();
    createStartMainEls();
};

createStartPage();

asideEl.addEventListener('click', highScoreBtnHandler);
//mainEl.addEventListener('click', )