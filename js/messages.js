/*<div class="message">
  <p class="messageFrom">Stefan:</p>
  <div class="messageInner">
    message jhbdlsabhsdbaflbasd fbhsdanasu jbsa jkbasdf jkbasdf jbasd fjbasdf
    jbasdf ôkbasd jbasdf bjkôasdf jkbasdf jkbôsdaf jkôasd jkbasd
  </div>
  <input class="response" type="text" />
  <input type="button" class="btn btn-primary btn-send" value="send" />
</div>;
*/
// TODO: vytvorit moznost odoslania fungel novej spravy!
// TODO: ked pride nova sprava tak menit title stranky jak na fb -> mozno aj vydat zvuk!
var messages = [];
var sortedMessages = [];
var sortedMessages = {};
var chat;
var handleMessages = () => {
  $.ajax({
    url: "http://itsovy.sk:1201/getmessages",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify({
      login: sessionStorage.getItem("login"),
      token: sessionStorage.getItem("token")
    }),
    success: data => {
      messages = data;
      getSendedMessages((sendeddata) => {
        chat = buildChat(data.messages, sendeddata);
        router.messages();
        renderChatElements(chat);
      });
    }
  });
};
var handleNewMessage = (inChatWith) => {
  $.ajax({
    url: "http://itsovy.sk:1201/getmessages",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify({
      login: sessionStorage.getItem("login"),
      token: sessionStorage.getItem("token")
    }),
    success: data => {
      messages = data;
      getSendedMessages((sendeddata) => {
        chat = buildChat(data.messages, sendeddata);
        router.messages();
        detailWith(inChatWith);
      });
    }
  });
}
var buildChat = (recieved, sended) => {
  var messagesObject = {};
  recieved = recieved.reduce((acc, { from, message, date }) => {
    if (!acc.hasOwnProperty(from) && date !== undefined) {
      acc[from] = [];
    }

    if (date !== undefined) {
      return { ...acc, [from]: [...acc[from], { author: from, message, date }] };
    } else {
      return { ...acc };
    }
  }, {});
  sended = sended.reduce((acc, { to, message, date }) => {
    if (!acc.hasOwnProperty(to) && date !== undefined) {
      acc[to] = [];
    }

    if (date !== undefined) {
      return { ...acc, [to]: [...acc[to], { author: sessionStorage.getItem("login"), message, date }] };
    } else {
      return { ...acc };
    }
  }, {});
  var finished = false;
  Object.keys(recieved).forEach(item => {
    if (!messagesObject.hasOwnProperty(item)) {
      messagesObject[item] = [];
    }
    messagesObject[item] = [...messagesObject[item], ...recieved[item]];
  });
  Object.keys(sended).forEach(item => {
    if (!messagesObject.hasOwnProperty(item)) {
      messagesObject[item] = [];
    }
    messagesObject[item] = [...messagesObject[item], ...sended[item]];
  });
  Object.keys(messagesObject).forEach(item => messagesObject[item] = messagesObject[item].sort((item1, item2) => {
    var firstDate1 = item1.date.split(" ");
    var secondDate1 = [...firstDate1[0].split(":"), ...firstDate1[1].split(":")];
    var firstDate2 = item2.date.split(" ");
    var secondDate2 = [...firstDate2[0].split(":"), ...firstDate2[1].split(":")];
    var d1 = new Date(secondDate2[0], secondDate2[1] - 1, secondDate2[2], secondDate2[3], secondDate2[4], secondDate2[5]);
    var d2 = new Date(secondDate1[0], secondDate1[1] - 1, secondDate1[2], secondDate1[3], secondDate1[4], secondDate1[5]);
    return d2 - d1;
  }));
  return messagesObject;
}
var renderChatElements = (chat) => {
  Object.keys(chat).forEach(item => $("#messages").append(buildMessageBox(item, chat[item][chat[item].length - 1])));
}
/*
//sorting data by user
var sortMessagesByUser = messages =>
  
  messages.reduce((acc, { from, message, date }) => {
  console.log(acc);
  if (!acc.hasOwnProperty(from) && date !== undefined) {
    acc[from] = [];
  }
  
  if (date !== undefined) {
    console.log(date);
    return { ...acc, [from]: [...acc[from], {message, date}]};
  } else {
    return {...acc};console.log(data);
  }
}, {});

var sortSendedMessagesByUser = messages =>
  
  messages.reduce((acc, { to, message, date }) => {
  console.log(acc);
  if (!acc.hasOwnProperty(to) && date !== undefined) {
    acc[to] = [];
  }
  
  if (date !== undefined) {
    console.log(date);
    return { ...acc, [to]: [...acc[to], {message, date}]};
  } else {
    return {...acc};
  }
}, {});
*/
var buildMessageBox = (chatWith, message) => {
  
  var outerDiv = $("<div>").attr({ class: "message" });
  var from = $("<p>")
    .attr({ class: "messageFrom" })
    .text(chatWith + ":");
  var innerDiv = $("<p>")
    .attr({ class: "messageInner" })
    .text(message.message);
  if (message.author === sessionStorage.getItem("login")) {
    innerDiv.attr({ class: "messageInnerFromMe" });
  }
  var buttonResponse = $("<input>").attr({
    type: "button",
    class: "btn btn-primary btn-send",
    value: "Show more",
    onclick: `detailWith("${chatWith}")`
  });
  outerDiv
    .append(from)
    .append(innerDiv)
    .append(buttonResponse);
  return outerDiv;
};

var detailWith = username => {
  console.log("called render detail");
  sessionStorage.setItem("detailWith", username);
  router.detailMessage(username);
  chat[username].forEach(item => {
    console.log("iteration");
    var css = "messageInner";
    if(item.author === sessionStorage.getItem("login")){
      console.log("me");
      css+="FromMe";
    }
    $("#messageDetailsInner").append(
      $("<div>")
        .attr({class:"userNameInChat"})
        .text(item.author + ":")
    )
    $("#messageDetailsInner").append(
      $("<p>")
        .attr({ class: "messageDetail "+css })
        .text(item.message)
    )
    
  });
  $("#messageDetailsInner").append(
    $("<input>").attr({
      class: "response",
      id: "responseInput"
    })
  );
  $("#messageDetailsInner").append(
    $("<input>").attr({
      type: "button",
      class: "btn btn-primary",
      value: "Send",
      onclick: `sendMessage("${username}")`
    })
  );
  
}
/*

var detailMessage = username => {
  console.log(sortSendedMessagesByUser(getSendedMessages()));
  router.detailMessage(username);
  //prerobit tak aby to davalo s datumom
  sortedMessages[username].forEach(item => {
    console.log(item);
    $("#messageDetailsInner").append(
      $("<p>")
        .attr({ class: "messageDetail messageInner" })
        .text(item.message)
    )
  }
  );
  $("#messageDetailsInner").append(
    $("<input>").attr({
      class: "response",
      id: "responseInput"
    })
  );
  $("#messageDetailsInner").append(
    $("<input>").attr({
      type: "button",
      class: "btn btn-primary",
      value: "Send",
      onclick: `sendMessage("${username}")`
    })
  );
}; */
//!!!ID === USERNAME!!!!
var sendMessage = id => {
  var message = $("#responseInput").val();
  $.ajax({
    url: "http://itsovy.sk:1201/sendmessage",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify({
      login: sessionStorage.getItem("login"),
      token: sessionStorage.getItem("token"),
      user: id,
      message: message
    }),
    success: data => {
      Swal.fire("Sucess", `Message send to ${id}`, "success");
      if(sessionStorage.getItem("inDetails") === true){
        router.detailMessage(id);
      }
      $("#messageResponse").val("");
    }
  });
};
var getSendedMessages = (callback) => {
  $.ajax({
    url: "http://itsovy.sk:1201/getsendedmessages",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify({ login: sessionStorage.getItem("login"), token: sessionStorage.getItem("token") }),
    success: data => {
      callback(data.messages.filter(item => item.date));
    }
  });
}
