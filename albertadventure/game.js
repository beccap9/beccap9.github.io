	const levels = [	


	
	
	//level 0
	["flag","","rock","fenceup","tree",
	"fenceside","fenceside","fenceside","fenceup","sentry",
	"","","","fenceside","",
	"animate","animate","animate","animate","animate",
	"badflag","tree","","horseup","fenceup"],
	
		//level 1
	["horsedown","","","water","badflag",
	"","rock","","tree","sentry",
	"","water","animate","animate","animate",
	"fenceside","water","","rock","",
	"flag","water","","",""],
	
	//level 2
	["flag","water","","","sentry",
	"fenceside","water","","rock","tree",
	"","water","","","",
	"","bridge","animate","animate","animate",
	"badflag","water","","horseup","rock"]
	
	
	
	];//end of levels
	
	
	
	//global variables
	const gridBoxes = document.querySelectorAll("#gameBoard div");
	const noPassObstacles = ["rock", "tree", "water"];
	const powerDown = ["badflag"];
	const startLevel = 0; //for html
	var currentLevel = 0; //set to starting level
	var riderOn = false; //if the rider is on
	var currentLocationOfHorse = 0;
	var currentAnimation; //allows 1 animation per level
	var widthOfBoard = 5;
	var horseDirection; //need for animate enemy 
	var testFlag; //to see if the rider ran onto bad flag
	var gameEnd = true; //checks if the game is over
	
	/**sounds**/
	var winnerSound = new sound("winner.mp3");
	var evilLaugh = new sound("evillaugh.mp3");
	var youLost = new sound("lose.mp3");

	
	
	
	
	//start game 
	window.addEventListener("load",function () {
			
		loadLevel(currentLevel);
		window.clearInterval(currentAnimation);
		
		gameEnd = false;
		document.getElementById("startscreen").style.display = "block";
	});
	
	
	
	//move horse
	document.addEventListener("keydown", function (e){
		
		switch(e.keyCode){
			case 37://left arrow
			if(currentLocationOfHorse % widthOfBoard !== 0){
				
				if(gameEnd){
				tryToMove("left");
				horseDirection = "left";
				}
			}
			break;
			case 38: //up arrow
			if(currentLocationOfHorse - widthOfBoard >= 0){
				if(gameEnd){
				tryToMove("up");
				horseDirection = "up";
				}
			}
			break;
			case 39://right arrow
			if(currentLocationOfHorse % widthOfBoard < widthOfBoard - 1){
				if(gameEnd){
				tryToMove("right");
				horseDirection = "right";
				}
			}
			break;
			case 40://down arrow
			if(currentLocationOfHorse + widthOfBoard < widthOfBoard * widthOfBoard){
				if(gameEnd){
				tryToMove("down");
				horseDirection = "down";
				}
			}
			
			break;
		}//switch
	});//key event listener
	
	
	
	
	
	
	//try to move horse
	function tryToMove(direction){
		
		//locatopn before movwe 
		let oldLocation = currentLocationOfHorse;
		
		//class of location before move
		let oldClassName = gridBoxes[oldLocation].className;
		
		let nextLocation = 0;//location we wish to move to
		let nextClass = "";// class of location we wish to move to
		
		let newClass = ""; //new class to switch if move successful
		
		//move two spaces
		let nextLocation2 = 0;
		let nextClass2 = "";

		switch (direction){
			case "left":
			nextLocation = currentLocationOfHorse - 1;
			break;
			case "right":
			nextLocation = currentLocationOfHorse + 1;
			break;
			case "up":
			nextLocation = currentLocationOfHorse - widthOfBoard;
			break;
			case "down":
			nextLocation = currentLocationOfHorse + widthOfBoard;
			break;
			
		}//switch
		
		
		nextClass = gridBoxes[nextLocation].className;
		// if the obstacles is not passable, don't move
		if(noPassObstacles.includes(nextClass)){ 
		return;
		}//if
		
		testFlag = nextClass; //assigns it to the next class to check for bad flag
			

		//if it's a fence, and there is no rider, don't move
		if(!riderOn && nextClass.includes("fence")){return;}
		
		//if there is a fence and the rider is on, move the horse two spaces w animation
		if(nextClass.includes("fence")){
			
		
			// if the direction does not match the way the horse if facing
			if((direction == "right" || direction == "left") && (oldClassName == "riderhorseup" || oldClassName == "riderhorsedown") ){
				return;
			}else if((direction == "up" || direction == "down") && (oldClassName == "riderhorseleft" || oldClassName == "riderhorseright")){
				
				return;
			}
		
	
			//rider must be on to jump
			if(riderOn){
			
				//set values according to direction
				if(direction == "left"){
					if((nextLocation - 1) % widthOfBoard < widthOfBoard - 1){
					nextClass = "jumpleft";
					nextClass2 = "riderhorseleft";
					nextLocation2 = nextLocation - 1;
					
					}else{
					return;}
				}else if(direction == "right"){
					if(((nextLocation + 1)%5) !== 0  ){
					nextClass = "jumpright";
					nextClass2 = "riderhorseright";
					nextLocation2 = nextLocation + 1;
					
					}else{
						return;
					}
					
				}else if(direction == "up"){
					if((nextLocation - widthOfBoard)>= 0){
					nextClass = "jumpup";
					nextClass2 = "riderhorseup";
					nextLocation2 = nextLocation - widthOfBoard;
					}else{
					return;}
				}else if(direction == "down"){
					if(nextLocation + widthOfBoard < widthOfBoard * widthOfBoard){
					nextClass = "jumpdown";
					nextClass2 = "riderhorsedown";
					nextLocation2 = nextLocation + widthOfBoard;
					}else{
						return;
					}
				}
				
			//error checking can't land on obstacle
			let errorCheck = gridBoxes[nextLocation2].className;
			if(noPassObstacles.includes(errorCheck)){
				return;
			}//if
			
			
			
			gridBoxes[currentLocationOfHorse].className = "";
			oldClassName = gridBoxes[nextLocation].className;
				
				
			//show horse jumping 
			gridBoxes[nextLocation].className = nextClass;
			
				
				
				setTimeout(function() {
					
					//back to normal fence w out horse
					gridBoxes[nextLocation].className = oldClassName;
					
					//update current location of hore to be two spaces past take off
					
					currentLocationOfHorse = nextLocation2;
					
					//get class of box after jump
					//will work for obstacles!!
					
					nextClass = gridBoxes[currentLocationOfHorse].className;
					
					
					//show horse and rider after landing
					gridBoxes[currentLocationOfHorse].className = nextClass2;
					
					//if next box is a flag, go up a level
					levelUp(nextClass);
					
				}, 350);
				return;
			} // if riderOn
			
		}// if class has fence
		
		
		
		//if there is a rider, add rider
		if(nextClass == "sentry"){
			riderOn = true;
		}
		//if there is a bridge in the old location keep it
		//don't put jump right after a bridge
		if(oldClassName.includes("bridge")){
			gridBoxes[oldLocation].className = "bridge";
		}else{
			gridBoxes[oldLocation].className = "";
		}
		
		
		//build the name of  new class - eg drawing w rider 
		newClass = (riderOn) ? "riderhorse" : "horse";
		newClass += direction;
		
		
		//if there os a bridge in the next location, keep it
		if(gridBoxes[nextLocation].classList.contains("bridge")){
			newClass += " bridge";
		}
		
		//move 1 spaces
		currentLocationOfHorse = nextLocation;
		gridBoxes[currentLocationOfHorse].className = newClass;
		
		
		
		
		
		//if it is an enemy end game
		if(nextClass.includes("enemy")){
				document.getElementById("lose").style.display = "block";
				youLost.play();
			stopGame();
			return;
		}
		
		
		
		
		//move up a level if needed
		levelUp(nextClass);
		
		
	}//tryToMove
	
	
	
	
	
	//move up a level
	function levelUp(nextClass) {
		if(nextClass == "flag" && riderOn){
			if(currentLevel < 2){
			document.getElementById("levelup").style.display = "block";
			}
			clearTimeout(currentAnimation);
			setTimeout (function () {
				document.getElementById("levelup").style.display = "none";
				if(currentLevel < 2){//if the game is over
				currentLevel++;
				}else{
				document.getElementById("gameover").style.display = "block";
				winnerSound.play();
				stopGame();
				return;
				}
				
				loadLevel(currentLevel);
			
			}, 1000);
		}
	}//levelUp
	




	//load levels 0 - maxlevel
	function loadLevel(currentLevel){
		
		let levelMap = levels[currentLevel];
		let animateBoxes;
		riderOn = false; //reset
		gameEnd = true;
	
		//load board
		for(i = 0; i < gridBoxes.length; i++){
			gridBoxes[i].className = levelMap[i];
			if(levelMap[i].includes("horseup")){
				currentLocationOfHorse = i;
			}//if
		}//for
		
		animateBoxes = document.querySelectorAll(".animate");
		
		animateEnemy(animateBoxes, 0, "right");
		
		//gets rid of displays
		document.getElementById("gameover").style.display = "none"; 
		document.getElementById("startscreen").style.display = "none";
		document.getElementById("lose").style.display = "none";
		
	}//loadLevel
	
	
	
	
	
	//animate enemy left to right
	function animateEnemy(boxes,index,direction){
		
		let newClass = (riderOn) ? "riderhorse" : "horse";
	
		if(boxes.length <= 0){
			return;
		}//if

		//update images 
		if(direction == "right"){
		boxes[index].classList.add("enemyright");
		}else{
			
			boxes[index].classList.add("enemyleft");
		}//else - add else if for up and down
	
		//remove images
		for(i = 0; i < boxes.length; i++){
			if(i != index){
				boxes[i].classList.remove("enemyright");
				boxes[i].classList.remove("enemyleft");
			}//if
		}//for
	
		//moving right
		if(direction == "right"){
		
		//if the enemy hits the horse
		if(boxes[index].classList.contains(newClass + horseDirection)){
			stopGame();
				document.getElementById("lose").style.display = "block";
				youLost.play();
			
			return;
		}//if
		
		//turn around if hit right side 
		if(index == boxes.length - 1){
			index--;
			direction = "left";
		} else {
			index++;
		}// inner else
	
		//moving left
		}else {
			if(boxes[index].classList.contains(newClass + horseDirection)){
				stopGame();
				document.getElementById("lose").style.display = "block";
				youLost.play();

			return;
			}//if 
		
			//turn if hit left side
			if(index == 0){
				index++;
				direction = "right";
			} else {
				index--;
			}//inner else	
	}//else
		
	
		// if run into the bad flag
		if(powerDown.includes(testFlag)){
			currentAnimation = setTimeout(function(){  
			document.body.style.backgroundColor = "red";
			animateEnemy(boxes,index,direction);
			evilLaugh.play();
			},300); //enemy moves faster
			return;
		}//if
	
		//set things back to normal
		document.body.style.backgroundColor = "black";
		currentAnimation = setTimeout(function(){  
			animateEnemy(boxes,index,direction);
		},750);

	}//animateEnemy
	
	
	
	
	
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





//stop game play
function stopGame() {
	currentLevel = startLevel;
	window.clearInterval(currentAnimation);
    gameEnd = false;
	

}//stopGame 


