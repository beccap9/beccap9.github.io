//global variables

var speedOfPaddle1 = 0; //direction
var speedOfPaddle2 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop; //where on the board the paddle is vertically
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop; //where on the board the paddle is vertically
const paddleHeight = document.getElementById("paddle1").offsetHeight; //height of paddle 
const paddleWidth = document.getElementById("paddle1").offsetWidth; //width of paddle
const startPositionOfPaddle2 =  document.getElementById("paddle2").offsetTop; //where on the board the paddle is vertically
const startPositionOfPaddle1 =  document.getElementById("paddle1").offsetTop; //where on the board the paddle is vertically


var score1 = document.getElementById("score1");
var score2 = document.getElementById("score2");


var controlPlay;//used to control game start/stop

const gameboardHeight = document.getElementById("gameBoard").offsetHeight; //height of game board
const gameboardWidth = document.getElementById("gameBoard").offsetWidth; //width of game board


const ballHeight = document.getElementById("ball").offsetHeight;//height of ball
const startTopPositionOfBall = document.getElementById("ball").offsetTop; //where the ball is on game board vertically
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;//where the ball is on game board horizontally
var topPositionOfBall = startTopPositionOfBall; //being modified
var leftPositionOfBall = startLeftPositionOfBall; //being modified
var topSpeedOfBall = 0; //direction of ball going up
var leftSpeedOfBall = 0; //direction of ball going across


/**sounds**/
var bounce = new sound("paddle.mp3");
var hitBoard = new sound("board.mp3");
var winnerSound = new sound("winner.mp3");




	



//start ball motion
//window.addEventListener('load',function() {
	//startBall();
//});



/** keys **/

//Move paddles
document.addEventListener('keydown', function(e){
	//console.log("key down" + e.keyCode);
	
	if(e.keyCode == 87 || e.which == 87) { //W
		speedOfPaddle1 = -10;
	}//if
	if(e.keyCode == 83 || e.which == 83) { //S
	speedOfPaddle1 = 10;
	}//if
	
	
	if(e.keyCode == 38 || e.which == 38) { //Up arrow
		speedOfPaddle2 = -10;
	
	}//if
	if(e.keyCode == 40 || e.which == 40) { //Down arrow
		speedOfPaddle2 = 10;

	}//if

		
});

//Stop Paddles
document.addEventListener('keyup', function(e){
	
	if(e.keyCode == 87 || e.which == 87) { //W
		speedOfPaddle1 = 0;
	}//if

	
	if(e.keyCode == 83 || e.which == 83) { //S
		speedOfPaddle1 = 0;
	}//if

	
	if(e.keyCode == 38 || e.which == 38) { //Up arrow
		speedOfPaddle2 = 0;
	
	}//if

	
	if(e.keyCode == 40 || e.which == 40) { //Down arrow
		speedOfPaddle2 = 0;

	}//if

		
});

//Move paddles
document.addEventListener('keydown', function(e){

	let randColour = Math.floor(Math.random()*16777215).toString(16);
	if(e.keyCode == 80 || e.which == 80) { //P
	

		
		document.getElementById("ball").style.backgroundColor =  "#" + randColour;
	
	}
	
});

/** end of keys**/














function startBall() {
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
	
	//50% chance of starting in either direction
	if(Math.random() < 0.5){
		direction = 1;
		
	}else{
		direction = -1;
	}//else
		
	topSpeedOfBall = Math.random() * 2 + 3; //3-4
	leftSpeedOfBall = direction * (Math.random() * 2 + 3); //3-4
	
	
	
}//startBall




//updates locations of the paddle and the ball
function show(){
	

	//positions of ALL elements
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	
	//stop paddle from leaving top of gameboard
	if(positionOfPaddle1 <= 0){
		positionOfPaddle1 = 0;
	}//if
	

	//stop paddle from leaving top of gameboard
	if(positionOfPaddle2 <= 0){
		positionOfPaddle2 = 0;
	}//if
	
	//stop paddle from leaving bottom of the geame board
	if(positionOfPaddle1 >= gameboardHeight - paddleHeight){
		positionOfPaddle1 = gameboardHeight - paddleHeight;
	}//if
	
	
	
	//stop paddle from leaving bottom of the game board
	if(positionOfPaddle2 >= gameboardHeight - paddleHeight){
		positionOfPaddle2 = gameboardHeight - paddleHeight;
	}//if
	
	
	//if ball hits top or bottom of game board change direction - vertical
	if(topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight) {
		topSpeedOfBall *= -1;//change of direction
	}//if

	//if the ball on the left edge of the game board 
	if(leftPositionOfBall <= paddleWidth){
		
		//if ball hits left paddle, chnage direction
		if(topPositionOfBall > positionOfPaddle1 && 
		topPositionOfBall < positionOfPaddle1 + paddleHeight){
			
			leftSpeedOfBall *= -1;	
			bounce.play();
		}else{
			//if the ball goes to the left side of the screen but doesn't hit the paddle
			startBall();
			changeScore(score2);
			hitBoard.play();
			gameEnd();
		
			
			
			
		}//else
	
	}//if



	//if the ball goes off the right edge of the board
	if(leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight){
		//if ball hits left paddle, chnage direction
		if(topPositionOfBall > positionOfPaddle2 &&
		topPositionOfBall < positionOfPaddle2 + paddleHeight){
			
			leftSpeedOfBall *= -1;	
			bounce.play();
		}else{
			//if the ball goes to the right side of the screen but doesn't hit the paddle
			startBall();
			changeScore(score1);
			hitBoard.play();
			gameEnd();
			
			
			
			
		}//else
	}//if



	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";

	
}//show


/** my own added functions **/

function gameEnd(){
	if(score1.textContent == 10 || score2.textContent == 10){
		stopGame();
	}//if
	
	
		
	
}//gameEnd




//change the inside of span
function changeScore(e){
	
	e.textContent = parseInt(e.textContent) + 1;
			
}//changeScore

/** end of my own functions **/





/** controls **/

//resume game play
function resumeGame(){
	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}
	
	
}//resumeGame



//pause game play
function pauseGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;
	
	let message1 = "The game is paused";
	let message2 = "The current score is Player 1 with " + score1.textContent + " points and Player 2 with " +  score2.textContent + " points. Close to continue.";
	
	
	showLightBox(message1,message2);
}//pauseGame



//start game play
function startGame(){
	//reset score,ball,paddle location

	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;
	startBall();
	score1.textContent = 0;
    score2.textContent = 0;
	
	
	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}
}//startGame



//stop game play
function stopGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;
	
	// shwo lightbox with score 
	let message1 = "Tie Game";
	let message2 = "Close to continue";
	
	if(score2.textContent > score1.textContent){
		message1 = "Player 2 wins the game with " + score2.textContent + " points";
	message2 = "Player 1 has " + score1.textContent + " points";
	winnerSound.play();
		
	}else if (score1.textContent > score2.textContent){
		message1 = "Player 1 wins the game with " + score1.textContent + " points";
	message2 = "Player 2 has " + score2.textContent + " points";
	winnerSound.play();
	}
	
	showLightBox(message1,message2);
}//stopGame

/** end controls **/



/** light box code **/

function changeVisibility(divID){
	var e = document.getElementById(divID);
	
	
	//if element exists toggle it's class 
	//between hidden and unhidden
	if(e){
		e.className = (e.className == 'hidden')? 'unhidden' : 'hidden';
		
		
	}//if
	
	
}// changeVisibility



// display message in lightbox
function showLightBox(message, message2){
	//set messages
	document.getElementById("message").innerHTML = message;
    document.getElementById("message2").innerHTML = message2;
	
	
	//show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
}



//close light box
function continueGame(){
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	
}// continueGame

/** end of lightbox code **/







/** sounds **/

//https://www.w3schools.com/graphics/game_sound.asp

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}//sound
