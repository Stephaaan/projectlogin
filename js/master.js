var router = new Router();
var jokesID = 0;
var jokes = [];
$(()=>{
	sessionStorage.setItem("logged", false);
	router.loginPage();
	$("#loginBtn").on("click", () => {
		handleLogin();
	});
	$("#bmp").width()
});
var handleGetJoke = () => {
	$.ajax({
		url: "http://itsovy.sk:1201/joke",
		type: "post",
		contentType: "application/json",
		data: JSON.stringify({login:sessionStorage.getItem("login"), token:sessionStorage.getItem("token")}),
		success:(data)=>{
			jokes.push({id:jokesID,text:data});
			var jokeObj = JSON.parse(data);
			$("#joke").append($("<div>").attr({class:"jokeDynamic"}).text(jokeObj.joke)).append($("<button>").text("Delete this joke").attr({class:"btn btn-primary", style:"margin-bottom:10px", onclick:"deleteJoke("+jokesID+")"}));
			jokesID++;
		}
	});
}
var deleteJoke = (id) => {
	$("#joke").empty();
	var idToDelete;
	jokes.forEach((item, index)=>{
		if(item.id===id){
			idToDelete = index;
		}
	});
	jokes.splice(idToDelete, 1);
	jokes.forEach((item, index)=> {
		$("#joke").append($("<div>").attr({class:"jokeDynamic"}).text(JSON.parse(item.text).joke)).append($("<button>").text("Delete this joke").attr({class:"btn btn-primary", onclick:"deleteJoke("+item.id+")"}));
	});
}
var handleLogin = () => {
	$.ajax({
        url: 'http://itsovy.sk:1201/login',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({login:$("#login-uname").val(),password:$("#login-psswd").val()}),
        success: function( data, textStatus, jQxhr ){
            console.log("OK");
            sessionStorage.setItem("logged", true);
            data = JSON.parse(data);
            sessionStorage.setItem("login", data.login);
            sessionStorage.setItem("token", data.token);
        	router.jokePage();
        },
        error: function( jqXhr, textStatus, errorThrown ){
        	console.log("should call error");
            showLoginError();
        }
    }); 
}
var handleLogout = () => {
	if(sessionStorage.getItem("logged") === "true"){
		$.ajax({
			url: "http://itsovy.sk:1201/logout",
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({login:sessionStorage.getItem("login"),token:sessionStorage.getItem("token")}),
			success:(data)=>{
				console.log("logged out");
				sessionStorage.clear();
				router.loginPage();	
			}
		});
	}
}
var handleUploadJoke = () => {
	console.log("run cyka");
	//login token joke
	$.ajax({
		url:"http://itsovy.sk:1201/addJoke", 
		type:"post",
		contentType: "application/json",
		data:JSON.stringify({login:sessionStorage.getItem("login"),token:sessionStorage.getItem("token"),joke:$("#addJokeTextArea").val()}),
		success:(data)=>{
			router.jokePage();
		}
	});
}

var sendJoke = () => {
	if(sessionStorage.getItem("logged") === "true"){
		router.sendJokePage();
	}
}

var openMessageBox = () => {
	$("#messages").hide();
	$("#me").show();
	$("#me-inner").scrollTop(400);
}
var closeMessageBox = () => {
	$("#messages").show();
	$("#me").hide();
}

//TODO
// 1.) premenovat wifi na kotlebajekkt
// 2.) isť spať

var messageID = 0;
var messages = [];
messages.push({id:messageID,from:"Stefan",text:"Hello you nigga skusk", time:"16:21"});
messageID++;
messages.push({id:messageID,from:"rothmajers",text:"skuska sprava c 3", time:"16:28"});
messageID++;
messages.push({id:messageID,from:"rothmajers",text:"skuska sprava c 3", time:"16:28"});
messageID++;
messages.push({id:messageID,from:"rothmajers",text:"skuska sprava c 3", time:"16:28"});
messageID++;
messages.push({id:messageID,from:"rothmajers",text:"skuska sprava c 3", time:"16:28"});
messageID++;
messages.push({id:messageID,from:"rothmajers",text:"skuska sprava c 3", time:"16:28"});
messageID++;
messages.push({id:messageID,from:"rothmajers",text:"skuska sprava c 3", time:"16:28"});
messageID++;
messages.push({id:messageID,from:"rothmajers",text:"skuska sprava c 3", time:"16:28"});
messageID++;
messages.push({id:messageID,from:"rothmajers",text:"skuska sprava c 3", time:"16:28"});
messageID++;
messages.push({id:messageID,from:"rothmajers",text:"skuska sprava c 3", time:"16:28"});
messageID++;
messages.push({id:messageID,from:"rothmajers",text:"skuska sprava c 3", time:"16:28"});

var getMessageById = (id) => {
	var elementToReturn;
	messages.forEach(element=>{
		console.log(element.id === id);
		if(element.id === id){
			elementToReturn = element;
		}
	});
	return elementToReturn;
}

var renderMessages = () => {
	messages.forEach((element)=>{
		var msg = "";
		if(element.text.length > 20){
			msg = element.text.substring(0, 17);
			msg+="...";
		}else{
			msg = element.text;
		}
		var div = $("<div>").attr({class:"singleMessage", onclick:"openMessage("+element.id+")"});
		var userIcon = $("<img>").attr({src:"gfx/user.png",class:"user-ico-chat"});
		var userName = $("<p>").text(element.from+":")
		var userMessage = $("<p>").text(msg).attr({class:"user-message-chat"});
		var userMessageTime = $("<p>").text(element.time).attr({class:"user-message-chat-time"})
		div.append(userIcon).append(userName).append(userMessage).append(userMessageTime);
		$("#me-inner").append(div);
	});
	
}
var openMessage = (id) => {
	console.log("should open:" + id);
	openedBoxes.forEach((element, index)=>{
		if(element === id){
			openedBoxes.splice(index, 1);
		}
	});
	openedBoxes.push(id);
	repaintBoxes();
	console.log("should repaint");
}



/*
	TODO: prerobit scroll system
*/