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
	var counter = 0;
	$(".bottomMessagesPanel").empty();
	openedBoxes.slice().reverse().forEach((element)=>{
		if(counter < countOnScreen){
			var msg = getMessageById(element);
			var deleteBtn = $("<button>").attr({class:"close-msg-box"}).append($("<img>").attr({src:"gfx/dialog_close.png"}));
			$(".bottomMessagesPanel").append($("<div>").attr({class:"chatbox"}).text(getMessageById(element).from)).append(deleteBtn);
		}
		counter++;
	});
}