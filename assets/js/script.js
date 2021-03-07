//Global variables
var bodyEl = document.querySelector('body');
var highScores = "";
var highScoreArr = [];
var qCount = 0;
var score = 0;
var onGoing = true;
const TIME_TOTAL = 75; //in seconds
var timeLeft = TIME_TOTAL; 
const SCORE_INC = 5; //The points for each question 
const MAX_HS = 3; // maximum number of high score stored...
const NUM_CHOICE = 4;

var questions = [
    {
        question: "String, integer, boolean, and double. These are examples of a: ",
        a: "Pointer",
        b: "Fruit",
        c: "Dog",
        d: "Data type",
        ans: "Data type"
    },
    {
        question: "The condition that goes through the while loop and if statements must return a(n): ",
        a: "Library book",
        b: "Boolean data type",
        c: "Turtle",
        d: "Object",
        ans: "Boolean data type"
    },
    {
        question: "To traverse each index of an array using JavaScript, you would use: ",
        a: "Your finger",
        b: "A donut",
        c: "If statement",
        d: "For loop",
        ans: "For loop"
    },
    {
        question: "DOM stands for: ",
        a: "DOra and a Monkey",
        b: "DOnkey kong and Mario",
        c: "Document Object Model",
        d: "Document Oriented Model",
        ans: "Document Object Model"
    },
    {
        question: "What is the time complexity of merge sort?",
        a: "O(Logn)",
        b: "O(nLogn)",
        c: "O(2^n)",
        d: "O(n^2)",
        ans: "O(nLogn)"
    }
]


/**
 * Creates elements inside the aside section.
 * The created elements are: a high score alerting button and the timer.
 */
var createAsideElements  = function() {
    var asideEl = document.createElement('aside');
    asideEl.className = 'flex';
    bodyEl.appendChild(asideEl);

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
 * Turns the highScoresArr to a string format. It retains the string and array with the number of MAX_HS scores. 
 * @returns alert with "No high score!" if there is no high score saved in the localstorage, or string of score board.
 */
var highScoreToStr = function() {
    highScores = localStorage.getItem('quiz hs');
    if (!highScores) {
        return alert(`No high score!`);
    }
    highScoresArr = highScores.split(',');

    // pick high scores
    if (highScoresArr.length > (MAX_HS * 2)){
        var min = parseInt(highScoresArr[1]);
        for (var i = 0; i < highScoresArr.length / 2; i++){
            var scoreIndex = ( 2 * i ) + 1;
            if (min > parseInt(highScoresArr[scoreIndex])) {
                min = parseInt(highScoresArr[scoreIndex]);
            }
        }
        lowScoreIndex = highScoresArr.indexOf(min.toString()) - 1;
        highScoresArr.splice(lowScoreIndex, 2);

        //update highScores string
        highScores = "";
        for (var i = 0; i < (highScoresArr.length / 2); i++){
            var initial = (2 * i);
            var scoreIndex = (2 * i) + 1;
            if (i === 0){
                highScores = highScoresArr[initial] + ',' + highScoresArr[scoreIndex];
            } else {
                highScores = highScores + ',' + highScoresArr[initial] + ',' + highScoresArr[scoreIndex];
            }
        }
        localStorage.setItem('quiz hs', highScores);
    }
    // concactenate the high scores
    var hsStr = "";
    for (var i = 0; i < highScoresArr.length / 2; i++){
        var initials = 2 * i;
        var score = initials + 1;
        hsStr += highScoresArr[initials] + ":   " + highScoresArr[score] + "\n";
    }
    return hsStr;
}


/**
 * Counts down the timer every second.
 * @param {document} timerEl The timer Element in the aside section
 */
function timer(timerEl) {
    var timeInterval = setInterval(function() {
        if( timeLeft < 0 || !onGoing ){
            clearInterval(timeInterval);
            var mainEl = bodyEl.querySelector('main');
            if (mainEl){
                mainEl.remove();
                createSubmitPage();
            }
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
    var mainEl = document.createElement('main');
    mainEl.className = 'flex start';
    bodyEl.appendChild(mainEl);

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
    startQuizBtnEl.className = 'btn sq-btn';
    mainEl.appendChild(startQuizBtnEl);
};


/**
 * Prints 'Correct!' if the user gets the question correct.
 * If the user gets the question wrong, this function will print 'Wrong!'
 * @param {boolean} correct True if correct. If not correct, false.
 */
var printResult = function(correct) {
    if (qCount > 0) {
        var h3El = document.createElement('h3');
        h3El.className = 'result';
        if (correct){
            h3El.textContent = "Correct!";
        } else {
            h3El.textContent = "Wrong!";
        }
        document.querySelector('main').appendChild(h3El);
        delayDelete(document.querySelector('.result'));
    } 
};


/**
 * Deletes the result of the answer after 2 seconds.
 * @param {document} resultEl The h3 element with the text content 'Wrong' or 'Correct'.
 */
function delayDelete(resultEl) {
    var deleteInterval = setInterval(function() {
        if(resultEl){
            resultEl.remove();
        }
        clearInterval(deleteInterval);
    }, 2000);
};


/**
 * Checks if the user chose the correct answer. If the user chose a wrong
 * answer, then the time will be deducted by 10 units.
 * @param {event} event The "click" event when an answer was chosen
 * @returns True if the user clicked on the correct answer. Otherwise false.
 */
var checkAnswer = function (event){
    var chosen = event.target.textContent;
    if (chosen === questions[qCount].ans) {
        score += 5;
        return true;
    }
    timeLeft -= 10;
    return false;
};

/**
 * Reset the global variable.
 */
var resetVars = function (){
    qCount = 0;
    score = 0;
    onGoing = true;
    timeLeft = TIME_TOTAL;
};


/**
 * Sets up to create the start page of the code quiz website
 */
function createStartPage() {
    createAsideElements();
    createStartMainEls();
};


/**
 * Creates the page that has the question and the multiple choice.
 */
var createQuestionPage = function() {
    var mainEl = document.createElement('main');
    mainEl.className = 'quiz';
    bodyEl.appendChild(mainEl);
    var h2El = document.createElement('h2');
    h2El.className = 'question';
    h2El.textContent = questions[qCount].question;
    mainEl.appendChild(h2El);

    //create ul element
    var ulEl = document.createElement('ul');
    //creates a list of buttons with choices
    for (var i = 0; i < NUM_CHOICE; i++){
        var liEl = document.createElement('li');
        var btnEl = document.createElement('button');
        btnEl.className = 'btn choice';
        btnEl.setAttribute('data-choice-id', i);
        if(i === 0){
            btnEl.textContent = questions[qCount].a
        } else if (i === 1){
            btnEl.textContent = questions[qCount].b
        } else if (i === 2) {
            btnEl.textContent = questions[qCount].c
        } else if (i === 3) {
            btnEl.textContent = questions[qCount].d
        }
        liEl.appendChild(btnEl);
        ulEl.appendChild(liEl);
    }
    mainEl.appendChild(ulEl);
};


var createSubmitPage = function (){
    var mainEl = document.createElement('main');
    mainEl.className = 'flex done';

    var h2El = document.createElement('h2');
    h2El.className = 'done-msg';
    h2El.textContent = "All done!";
    mainEl.appendChild(h2El);

    var scoreEl = document.createElement('span');
    scoreEl.className = 'score';
    scoreEl.textContent = "Your final score is " + score + ".";
    mainEl.appendChild(scoreEl);

    var wrapperEl = document.createElement('div');
    wrapperEl.className = 'form-wrap';
    
    var spanEl = document.createElement('span');
    spanEl.className = 'prompt-initials';
    spanEl.textContent = "Enter initials: ";
    var inputEl = document.createElement('input');
    inputEl.className = 'ini-form';
    var buttonEl = document.createElement('button');
    buttonEl.className = 'btn init-btn';
    buttonEl.textContent = "Submit";
    wrapperEl.appendChild(spanEl);
    wrapperEl.appendChild(inputEl);
    wrapperEl.appendChild(buttonEl);
    mainEl.appendChild(wrapperEl);

    bodyEl.appendChild(mainEl);
};

var createHSPage = function() {
    var mainEl = document.createElement('main');
    mainEl.className = 'flex hs';

    var h2El = document.createElement('h2');
    h2El.className = 'hs-msg';
    h2El.textContent = "High scores";
    mainEl.appendChild(h2El);

    var spanEl = document.createElement('span');
    spanEl.className = 'scores';
    spanEl.textContent = highScoreToStr();
    mainEl.appendChild(spanEl);

    var wrapperEl = document.createElement('div');
    wrapperEl.className = 'flex wrapper';
    var goBackBtn = document.createElement('button');
    goBackBtn.className = 'btn go-back';
    goBackBtn.textContent = "Go back";
    var clearBtn = document.createElement('button');
    clearBtn.className = 'btn clear';
    clearBtn.textContent = "Clear high scores";
    wrapperEl.appendChild(goBackBtn);
    wrapperEl.appendChild(clearBtn);
    mainEl.appendChild(wrapperEl);

    bodyEl.appendChild(mainEl);

};

/**
 * Handles all button clicks, then calls functions according to the button.
 * @param {event} event the "click" event that happens when a button is clicked
 */
var buttonHandler = function(event) {
    if (event.target.matches('.hs-btn')){
        var msg = highScoreToStr();
        if (highScores || highScores !== ''){
            alert(msg);
        }
    } else if (event.target.matches('.sq-btn')){
        document.querySelector('main').remove();
        createQuestionPage();
        timer(document.querySelector('.timer'));
    } else if (event.target.matches('.choice')){
        document.querySelector('main').remove();
        var correct = checkAnswer(event);
        qCount++;
        if (qCount < questions.length){
            createQuestionPage();
            printResult(correct);            
        } else {
            onGoing = false;
            createSubmitPage();
            printResult(correct);
        }
    } else if (event.target.matches('.init-btn')){
        event.preventDefault();
        var initials = document.querySelector('.ini-form').value;
        if (initials === '' || typeof initials !== 'string'){
            alert("Please enter valid initials");
            return;
        }
       
        highScores = localStorage.getItem('quiz hs')
        
        if (!highScores){
            localStorage.setItem('quiz hs', initials + ',' + score);
        } else {
            localStorage.setItem('quiz hs', highScores + ',' + initials + ',' + score);
        }
        document.querySelector('main').remove();
        document.querySelector('aside').remove();
        createHSPage();
    } else if (event.target.matches('.go-back')){
        document.querySelector('main').remove();
        resetVars();
        createStartPage();
    } else if (event.target.matches('.clear')){
        var scoreBoard = document.querySelector('.scores');
        scoreBoard.remove();
        highScores = '';
        localStorage.setItem('quiz hs', '');
    }
};

createStartPage();

bodyEl.addEventListener('click', buttonHandler);

//bodyEl.addEventListener('submit', )