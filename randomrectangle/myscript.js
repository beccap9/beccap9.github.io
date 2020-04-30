	

	
	
	function changeDisplay(){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	for(var i = 0; i<20; i++){
	var w = Math.random() * (60 - 20) + 20;
	var h = Math.random() * (60 - 20) + 20;
	var x = Math.random() * (700 - 0) + 10;
    var y = Math.random() * (700 - 0) + 10;
	var randColour = Math.floor(Math.random()*16777215).toString(16);
	ctx.fillStyle = "#" + randColour;
	ctx.fillRect(x, y, w, h);
	}
	

	}