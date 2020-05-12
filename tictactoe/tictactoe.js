let currentPlayer = "X"; //global variable visible to entire page
let gameStatus =""; //"" - continue game, "Tie, "X Wins, "O wins"
let counter = 0;
let idNames = ["one", "two", "three", "four", "five", "six",
"seven", "eight", "nine"];

let cb = [];

	
	
	

// reset board and all variables
function newGame() {
	
	// reset the board
	for(var i = 0; i < idNames.length; i++){
		document.getElementById(idNames[i]).innerHTML = "";
		
	}//for 
	
counter = 0;
gameStatus = 0;	
currentPlayer = "X";
	
changeVisibility("controls");
	
}//newGame






//chooses box for computer to go in
function computerTakeTurn(){

	let idName = "";
	cb = []; // current board
	cb[0] = ""; //not going to use
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;

		
		do{
	
		
		if(cb[5] == ""){
			
		idName = idNames[4];
		document.getElementById(idName).innerHTML = currentPlayer;
		break;
		
		}else if((cb[1] == ("X" || "O")) && (cb[2] == cb[1]) && (cb[3] == "")){
			
		idName = idNames[2];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else if((cb[3] == ("X" || "O")) && (cb[2] == cb[3]) && (cb[1] == "")){
			
		idName = idNames[0];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else if((cb[4] == ("X" || "O")) && (cb[5] == cb[4]) && (cb[6] == "")){
			
		idName = idNames[5];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else if((cb[6] == ("X" || "O")) && (cb[6] == cb[5]) && (cb[4] == "")){
			
		idName = idNames[3];
		
		document.getElementById(idName).innerHTML = currentPlayer;

		
		break;
		
		}else if((cb[7] == ("X" || "O")) && (cb[8] == cb[7]) && (cb[9] == "")){
			
		idName = idNames[8];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else if((cb[9] == ("X" || "O")) && (cb[8] == cb[9]) && (cb[7] == "")){
			
		idName = idNames[6];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else if((cb[1] == ("X" || "O")) && (cb[4] == cb[1]) && (cb[7] == "")){
			
		idName = idNames[6];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else if((cb[7] == ("X" || "O")) && (cb[4] == cb[7]) && (cb[1] == "")){
			
		idName = idNames[0];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else if((cb[2] == ("X" || "O")) && (cb[5] == cb[2]) && (cb[8] == "")){
			
		idName = idNames[7];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else if((cb[8] == ("X" || "O")) && (cb[5] == cb[8]) && (cb[2] == "")){
			
		idName = idNames[1];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else if((cb[3] == ("X" || "O")) && (cb[6] == cb[3]) && (cb[9] == "")){
			
		idName = idNames[8];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else if((cb[9] == ("X" || "O")) && (cb[6] == cb[9]) && (cb[3] == "")){
			
		idName = idNames[2];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
	
		}else if((cb[1] == ("X" || "O")) && (cb[5] == cb[1]) && (cb[9] == "")){
			
		idName = idNames[8];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else if((cb[9] == ("X" || "O")) && (cb[5] == cb[9]) && (cb[1] == "")){
			
		idName = idNames[0];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else if((cb[3] == ("X" || "O")) && (cb[5] == cb[3]) && (cb[7] == "")){
			
		idName = idNames[6];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else if((cb[7] == ("X" || "O")) && (cb[5] == cb[7]) && (cb[3] == "")){
			
		idName = idNames[2];
		
		document.getElementById(idName).innerHTML = currentPlayer;
		
		
		break;
		
		}else{
		
		let rand = parseInt(Math.random()*9)+1;
		idName = idNames[rand-1];
		if(document.getElementById(idName).innerHTML == "" ) {
		
		document.getElementById(idName).innerHTML = currentPlayer;
		break;
		}//if
		
		
		
		}//else
	
		}while(true);
}// computerTakeTurn





// take player turn
function playerTakeTurn(e){
	
	if(e.innerHTML ==""){
		e.innerHTML = currentPlayer;
		changeGameStatus();
		
		
		//if game not over computer goes
		if(gameStatus == "") {
			setTimeout(function() {
				computerTakeTurn();
				changeGameStatus();
				}, 500
			);
		}//if
		
	} else{
		showLightBox("This box is already selected.", "Please try another.");
		
		return;
	}// else
	





}//playerTakeTurn



//after each turn, check for a winner, tie or continue game
function changeGameStatus(){
	counter++; // count turns
	
	// check Win
	if(checkWin()){
		gameStatus = currentPlayer + " wins!";
	}else if(counter == 9){
		gameStatus= "Tie Game";
		
	}// counter
	
	// switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X");
	
	if(gameStatus != ""){
	setTimeout(function() {showLightBox(gameStatus, "Game Over.");},500
	);
	}
	
}// checkGameStatus


//Check for a win, there 8 win paths
function checkWin() {
	
	cb = []; // current board
	cb[0] = ""; //not going to use
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;
	
	
	//top row 
	if (cb[1] == currentPlayer && cb[1] == cb[2] && cb[2] == cb[3]){
		return true;
	}
	//second row 
	if (cb[4] == currentPlayer && cb[4] == cb[5] && cb[5] == cb[6]){
		return true;
	}
	//third row 
	if (cb[7] == currentPlayer && cb[7] == cb[8] && cb[8] == cb[9]){
		return true;
	}
	//first vertical row 
	if (cb[1] == currentPlayer && cb[1] == cb[4] && cb[4] == cb[7]){
		return true;
	}
	//second vertical row 
	if (cb[2] == currentPlayer && cb[2] == cb[5] && cb[5] == cb[8]){
		return true;
	}
	//third vertical row 
	if (cb[3] == currentPlayer && cb[3] == cb[6] && cb[6] == cb[9]){
		return true;
	}
	//diagnol row pointing left
	if (cb[1] == currentPlayer && cb[1] == cb[5] && cb[5] == cb[9]){
		return true;
	}
	//diagnol row pointing right
	if (cb[3] == currentPlayer && cb[3] == cb[5] && cb[5] == cb[7]){
		return true;
	}
	
	
	
}// checkWin







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
	
	//if the game is over, show controls 
	// play game again
	if (gameStatus != "") {
		changeVisibility("controls");
	}//if
	
}// continueGame


