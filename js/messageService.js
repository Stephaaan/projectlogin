var startMessageService = () => {
  setInterval(() => {
    if (sessionStorage.getItem("logged") === "true") {
      $.ajax({
        url: "http://itsovy.sk:1201/getmessages",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          login: sessionStorage.getItem("login"),
          token: sessionStorage.getItem("token")
        }),
        success: data => {
          var newMessages = [];
          data.messages.forEach((item, id) => {
            newMessages.push({ id, from: item.from, message: item.message });
          });
          if (messages.toString() !== newMessages.toString()) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
              width: 300,
              height: 100
            });
            Toast.fire({
              type: "success",
              title: "You have new message(s)"
            });
            console.log("fireeee");
            if(sessionStorage.getItem("inDetails") === "true"){
              console.log("new message trigger");
              handleNewMessage(sessionStorage.getItem("detailWith"));
            }
            messages = newMessages;
          }
        }
      });
    }
  }, 5000);
};
