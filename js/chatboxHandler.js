var openedBoxes = [];
var countOnScreen = 0;
window.onload = () => {
	console.log($("#bmp").width());
}
$(window).resize(() => {
	countOnScreen = Math.floor(parseInt($(".bottomMessagesPanel").width())/220);
	repaintBoxes();

});
var repaintBoxes = () => {
	console.log("repainting...");
	var counter = 0;
	$(".bottomMessagesPanel").empty();
	openedBoxes.slice().reverse().forEach((element)=>{
		if(counter < countOnScreen){
			$(".bottomMessagesPanel").append($("<div>").attr({class:"chatbox"}).text("random sprava?"));
		}
		counter++;
	});
}