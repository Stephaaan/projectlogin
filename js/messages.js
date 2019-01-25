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
var messages = [];
var sortedMessages = [];
var sortedMessages = {};
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
      sortedMessages = sortMessagesByUser(data.messages);
      sorted = 0;
      Object.keys(sortedMessages)
        .reverse()
        .forEach(item => {
          console.log(item);
          $("#messages").append(buildMessageBox(item));
        });
      messages = [];
      data.messages.forEach((item, id) => {
        messages.push({ id, from: item.from });
      });
    }
  });
  router.messages();
};

//sorting data by user
var sortMessagesByUser = messages =>
  messages.reduce((acc, { from, message }) => {
    if (!acc.hasOwnProperty(from)) {
      acc[from] = [];
    }
    return { ...acc, [from]: [...acc[from], message] };
  }, {});

var buildMessageBox = username => {
  var outerDiv = $("<div>").attr({ class: "message" });
  var from = $("<p>")
    .attr({ class: "messageFrom" })
    .text(username + ":");
  //console.log(sortedMessages[username].lastIndex);
  var innerDiv = $("<p>")
    .attr({ class: "messageInner" })
    .text(sortedMessages[username][sortedMessages[username].length - 1]);
  var buttonResponse = $("<input>").attr({
    type: "button",
    class: "btn btn-primary btn-send",
    value: "Show more",
    onclick: `detailMessage("${username}")`
  });
  outerDiv
    .append(from)
    .append(innerDiv)
    .append(buttonResponse);
  return outerDiv;
};

var detailMessage = username => {
  router.detailMessage(username);
  sortedMessages[username].forEach(item =>
    $("#messageDetailsInner").append(
      $("<p>")
        .attr({ class: "messageDetail messageInner" })
        .text(item)
    )
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
};
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
      $("#messageResponse" + id).val("");
    }
  });
};
