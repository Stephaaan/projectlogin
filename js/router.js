
function Router() {
	this.hideAll = ()=>{
		$("#loginForm").hide();
		$("#jokes").hide();
		$("#logoutBtn").hide();
		$("#sendJoke").hide();
		$("#joke").empty();
		hideLoginError();
	}
	this.loginPage = ()=>{
		this.hideAll(); 
		$("#loginForm").show();
	}
	this.jokePage = () => {
		this.hideAll();
		$("#logoutBtn").show();
		$("#jokes").show();
		closeMessageBox();
		renderMessages();
	}
	this.sendJokePage = () => {
		this.hideAll();
		$("#sendJoke").show();
	}
}

var showLoginError = () => {
	$("#loginErrorMsg").css("visibility", "inline");
}
var hideLoginError = () => {
	$("#loginErrorMsg").css("visibility", "hidden");
}
