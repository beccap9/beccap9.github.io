const levels = [	

	
	
	
	//level 0
	["flag","rock","","","",
	"fenceside","rock","","","sentry",
	"","tree","animate","animate","animate",
	"","water","","","",
	"","fenceup","","horseup",""],
	
	//level 1
	["horsedown","","","water","flag",
	"","rock","","tree","",
	"","water","animate","animate","animate",
	"","water","","","",
	"sentry","fenceup","","",""],
	
	//level 2
	["flag","water","","","sentry",
	"fenceside","water","","","tree",
	"","water","","","",
	"","bridge","animate","animate","animate",
	"","water","","horseup",""]
	
	
	
	
	
	
	];//end of levels
	
	//global variables
	const gridBoxes = document.querySelectorAll("#gameBoard div");
	const noPassObstacles = ["rock", "tree", "water"];
	var currentLevel = 0; //starting level
	var riderOn = false; //if the rider is on
	var currentLocationOfHorse = 0;
	var currentAnimation; //allows 1 animation per level
	var widthOfBoard = 5;
	
	
	
	//start game 
	window.addEventListener("load",function () {
		loadLevel();
	});
	
	//move horse
	document.addEventListener("keydown", function (e){
		switch(e.keyCode){
			case 37://left arrow
			if(currentLocationOfHorse % widthOfBoard !== 0){
				tryToMove("left");
			}
			break;
			case 38: //up arrow
			if(currentLocationOfHorse - widthOfBoard >= 0){
				tryToMove("up");
			}
			break;
			case 39://right arrow
			if(currentLocationOfHorse % widthOfBoard < widthOfBoard - 1){
				tryToMove("right");
			}
			break;
			case 40://down arrow
			if(currentLocationOfHorse + widthOfBoard < widthOfBoard * widthOfBoard){
				tryToMove("down");
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
		
		
		//if it's a fence, and there is no rider, don't move
		if(!riderOn && nextClass.includes("fence")){return;}
		
		//if there is a fence and the rider is on, move the horse two spaces w animation
		
		if(nextClass.includes("fence")){
			
			//rider must be on to jump
			if(riderOn){
				gridBoxes[currentLocationOfHorse].className = "";
				oldClassName = gridBoxes[nextLocation].className;
				
				
				//set values according to direction
				if(direction == "left"){
					nextClass = "jumpleft";
					nextClass2 = "riderhorseleft";
					nextLocation2 = nextLocation - 1;
				}else if(direction == "right"){
					nextClass = "jumpright";
					nextClass2 = "riderhorseright";
					nextLocation2 = nextLocation + 1;
				}else if(direction == "up"){
					nextClass = "jumpup";
					nextClass2 = "riderhorseup";
					nextLocation2 = nextLocation - widthOfBoard;
				}else if(direction == "down"){
					nextClass = "jumpdown";
					nextClass2 = "riderhorsedown";
					nextLocation2 = nextLocation + widthOfBoard;
				}
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
				if(currentLevel < 2){
				currentLevel++;
				}else{
				document.getElementById("gameover").style.display = "block";
				return;
				}
				//if statement here when no more levels and game over screen
				loadLevel();
			
			}, 1000);
		}
	}//levelUp
	
	
	
	
	
	
	
	
	
	
	
	
	
	//load levels 0 - maxlevel
	function loadLevel(){
		let levelMap = levels[currentLevel];
		let animateBoxes;
		riderOn = false; //reset
	
		
		//load board
		for(i = 0; i < gridBoxes.length; i++){
			gridBoxes[i].className = levelMap[i];
			if(levelMap[i].includes("horseup")){
				currentLocationOfHorse = i;
			}//if
		}//for
		
		animateBoxes = document.querySelectorAll(".animate");
		
		animateEnemy(animateBoxes, 0, "right");
		
	}//loadLevel
	
	
	
	
	//animate enemy left to right (could add up and down to this)
	function animateEnemy(boxes,index,direction){
		if(boxes.length <= 0){
			return;
		}//if

	//update images 
	if(direction == "right"){
		boxes[index].classList.add("enemyright");
	}else{
		boxes[index].classList.add("enemyleft");
	}//else - add else if for up and down
	
	//remove 
	for(i = 0; i < boxes.length; i++){
		if(i != index){
			boxes[i].classList.remove("enemyright");
			boxes[i].classList.remove("enemyleft");
		}//if
	}//for
	
	//moving right
	if(direction == "right"){
		//turn around if hit right side 
		if(index == boxes.length - 1){
			index--;
			direction = "left";
	} else {
		index++;
	}// inner else}
	
	//moving left
	}else {
		//turn if hit left side
		if(index == 0){
			index++;
			direction = "right";
		} else {
			index--;
		}//inner else
			
	}//else
		
	
	currentAnimation = setTimeout(function(){  
		animateEnemy(boxes,index,direction);
	},750);
	
	

	}//animateEnemy