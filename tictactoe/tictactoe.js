let currentPlayer = "X"; //global variable visible to entire page
let gameStatus =""; //"" - continue game, "Tie, "X Wins, "O wins"
let counter = 0;



// take player turn
function playerTakeTurn(e){
	
	if(e.innerHTML ==""){
		e.innerHTML = currentPlayer;
		changeGameStatus();
	} else{
		showLightBox("This box is already selected.", "Please try another.");
		
		return;
	}// else
	
	if(gameStatus != ""){
		showLightBox(gameStatus, "Game Over.");
		
	}




}//playerTakeTurn



//after each turn, check for a winner, tie or continue game
function changeGameStatus(){
	counter++; // count turns
	
	// check Win
	if(checkWin()){
		gameStatus = currentPlayer + " wins!";
		return gameStatus;
	}
	
	//check for tie 
	if(counter == 9){
		gameStatus="Tie Game";
		
	}// counter
	
	// switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X");
	
	
	
}// checkGameStatus


//Check for a win, there 8 win paths
function checkWin() {
	
	let cb = []; // current board
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
	if (cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]){
		return true;
	}
	//second row 
	if (cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]){
		return true;
	}
	//third row 
	if (cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]){
		return true;
	}
	//first vertical row 
	if (cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]){
		return true;
	}
	//second vertical row 
	if (cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]){
		return true;
	}
	//third vertical row 
	if (cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]){
		return true;
	}
	//diagnol row pointing left
	if (cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]){
		return true;
	}
	//diagnol row pointing right
	if (cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]){
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
	
}// continueGame














