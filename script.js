
//100 points
var points = 0;
//60 seconds
var sec = 60;

//start button element
var buttonSQ = document.querySelector("#SQbtn");
//question slide show class selected
var slides = document.getElementsByClassName("mySlides");
//slideshow container element
var slideShowCon = document.querySelector(".slideShowContainer");
//homescreen selection element
var homeScreen = document.querySelector('.homescreen');
//enter score screen selection element
var scoreScreen = document.querySelector('.enterScore');
//save user score and initials to score screen
var savebtn = document.querySelector("#savebtn");
//initials input
var initials = document.querySelector("#int-input");
//high scores screen selection element
var highScores = document.querySelector(".ScoreBoard");
//score board take quiz btn
var takeQuizAgain = document.querySelector(".restartQuiz");
var pullHighScores = document.querySelector('#pullHighScores');

let highscore = [];

//Start quiz again
takeQuizAgain.addEventListener("click", function(){
        //start slide show of questions
        sec = 60;
        points = 0;
        startQuiz();
        //have the first section display none
        highScores.setAttribute("style", "display: none");
})

function viewScoreBoard(){
    //remove current scores
    while(pullHighScores.firstChild){
        pullHighScores.removeChild(pullHighScores.firstChild);
    }
    //set timer
    document.getElementById("timer").innerHTML = "Time";

    //load task from JSON
    var loadScore = JSON.parse(localStorage.getItem("highscore"));
    highscore = loadScore;
    var placement = 1;

    //if no score is loaded
    if(loadScore == null){
        var newPElement = document.createElement('p');
        newPElement.innerHTML = "No Score Submitted";
        pullHighScores.append(newPElement);
    }
    else{
        for(i=0; i<loadScore.length; i++){
            if( i == undefined){
                var newPElement = document.createElement('p');
                newPElement.innerHTML = placement + "No Score Submitted";
            }
            else{
                var newPElement = document.createElement('p');
                newPElement.innerHTML = placement +". " + loadScore[i].initial +":"+ loadScore[i].score;
            }
            placement += 1;
            pullHighScores.append(newPElement);
        }
    }
    
    //hide slide-show question section
    highScores.setAttribute("style", "display: block");
    //hide all other scores
    scoreScreen.setAttribute("style", "display: none");
    slideShowCon.setAttribute("style", "display: none");
    homeScreen.setAttribute("style", "display: none");
}


//store the initials and score to localstorage on submit 
savebtn.addEventListener("click", function(event){
    event.preventDefault();

    //create user object for submission
    var user = {
        initial: initials.value.trim(),
        score: points
    };

    //set new submission to local storage
    highscore.push(user);
    localStorage.setItem('highscore', JSON.stringify(highscore));

    //hide slide-show question section
    highScores.setAttribute("style", "display: block");
    //call quiz section
    scoreScreen.setAttribute("style", "display: none");
});


//goes to next slideshow funtion
function showSlides(n){
    var i;
    // if slide show is ended
    if ( n == 7 ){
        //hide slide-show question section
        slideShowCon.setAttribute("style", "display: none");
        //call quiz section
        document.getElementById("displayScore").innerHTML = "Your Final Score " + points;
        scoreScreen.setAttribute("style", "display: block");       
    }
    //else display next block and hide rest
    
    if (n <= 6){
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
    slides[slideIndex-1].style.display = "block"; 
    }      
}


//checks if answer was wrong 
function checkAnswer(event){
    
    var button = event.target;
    //get that buttons value
    if(button.matches(".questionbtn")){
        var Answer = button.getAttribute("value");
    }

    // if that value is false, subtract from score
    if (Answer == "false"){
        sec -= 10;
    }    

    if(Answer == "true"){
        points += 16;
    }
}


//question button class element 
btns = document.getElementsByClassName("questionbtn");
//iterates through so multiple buttons with same class can be selected
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (event) {  
        checkAnswer(event);
        showSlides(slideIndex += 1);
    });
}


//start quiz and timer 
function startQuiz() {
    points = 0;
    //start timer countdown funtion
    var time = setInterval(timerStart, 1000);
    function timerStart(){
        document.getElementById("timer").innerHTML = sec + "secs left";
        sec--;
    
        if(sec < 0){
            clearInterval(time);
            document.getElementById("timer").innerHTML = "Time";
            //hide slide-show question section
            slideShowCon.setAttribute("style", "display: none");
            //call quiz section
            document.getElementById("displayScore").innerHTML = "Your Final Score " + points;
            scoreScreen.setAttribute("style", "display: block");
        }
    }
    //display slideshow block if hidden
    slideShowCon.setAttribute("style","display:block");
    //go to first question in slideshow
    showSlides(slideIndex = 1);
}



//start button element with funtion
buttonSQ.addEventListener("click", function() {
    //have the first section display none
    homeScreen.setAttribute("style", "display: none");
    //start slide show of questions
    startQuiz();
});