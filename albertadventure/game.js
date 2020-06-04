const levels = [	
	//level 0
	["flag","rock","","","",
	"fenceside","rock","","","sentry",
	"","tree","animate","animate","animate",
	"","water","","","",
	"","fenceup","","horse",""]//add comma here
	
	//level 1
	];//end of levels
	
	//global variables
	const gridBoxes = document.querySelectorAll("#gameBoard div");
	var currentLevel = 0; //starting level
	var riderOn = false; //if the rider is on
	var currentLocationOfHorse = 0;
	var currentAnimation; //allows 1 animation per level

	
	
	
	//start game 
	window.addEventListener("load",function () {
		loadLevel();
	});
	
	
	
	
	
	//load levels 0 - maxlevel
	function loadLevel(){
		let levelMap = levels[currentLevel];
		let animateBoxes;
		riderOn = false; //reset
	
		
		//load board
		for(i = 0; i < gridBoxes.length; i++){
			gridBoxes[i].className = levelMap[i];
			if(levelMap[i].includes("horse")){
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
		index++
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