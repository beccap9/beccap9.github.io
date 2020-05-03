// change the visibility of divID


function changeVisibility(divID){
	var element = document.getElementById(divID);
	
	
	//if element exists toggle it's class 
	//between hidden and unhidden
	if(element){
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
		
		
	}//if
	
	
}// changeVisibility


//display light box with bigImage in it
function displayLightbox(imageFile,alt){
	var image = new Image();//construct new Image element
	var bigImage = document.getElementById("bigImage");
	
	
	image.src = "images/" + imageFile;
	image.alt = alt;
	
	image.onload = function(){
	//force big image to preload
	//before we change the visibility so we can access width and be centered
	var width = image.width;
	document.getElementById("boundaryBigImage").style.width = width + "px";
};
	
	
	
	bigImage.src=image.src;
	bigImage.alt=image.alt;
	
	changeVisibility('lightbox');
	changeVisibility('boundaryBigImage');
	
}// displayLighbox