var router = new Router();
var jokesID = 0;
var jokes = [];
$(() => {
  sessionStorage.setItem("logged", false);
  router.loginPage();
  startMessageService();
  $("#loginBtn").on("click", () => {
    handleLogin();
  });
  $("#bmp").width();
});
var handleGetJoke = () => {
  $.ajax({
    url: "http://itsovy.sk:1201/joke",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify({
      login: sessionStorage.getItem("login"),
      token: sessionStorage.getItem("token")
    }),
    success: data => {
      jokes.push({ id: jokesID, text: data });
      var jokeObj = JSON.parse(data);
      $("#joke")
        .append(
          $("<div>")
            .attr({ class: "jokeDynamic" })
            .text(jokeObj.joke)
        )
        .append(
          $("<button>")
            .text("Delete this joke")
            .attr({
              class: "btn btn-primary",
              style: "margin-bottom:10px",
              onclick: "deleteJoke(" + jokesID + ")"
            })
        );
      jokesID++;
    }
  });
};

var deleteJoke = id => {
  $("#joke").empty();
  var idToDelete;
  jokes.forEach((item, index) => {
    if (item.id === id) {
      idToDelete = index;
    }
  });
  jokes.splice(idToDelete, 1);
  jokes.forEach((item, index) => {
    $("#joke")
      .append(
        $("<div>")
          .attr({ class: "jokeDynamic" })
          .text(JSON.parse(item.text).joke)
      )
      .append(
        $("<button>")
          .text("Delete this joke")
          .attr({
            class: "btn btn-primary",
            onclick: "deleteJoke(" + item.id + ")"
          })
      );
  });
};
var handleLogin = () => {
  console.log(
    JSON.stringify({
      login: $("#login-uname").val(),
      password: $("#login-psswd").val()
    })
  );
  $.ajax({
    url: "http://itsovy.sk:1201/login",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify({
      login: $("#login-uname").val(),
      password: $("#login-psswd").val()
    }),
    success: function(data, textStatus, jQxhr) {
      console.log("OK");
      sessionStorage.setItem("logged", true);
      data = JSON.parse(data);
      sessionStorage.setItem("login", data.login);
      sessionStorage.setItem("token", data.token);
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
        title: "Signed in successfully"
      });
      router.jokePage();
    },
    error: function(jqXhr, textStatus, errorThrown) {
      /*  	const Toast = Swal.mixin({
						toast:true,
						position:"center",
						timer:2000,
						showConfirmButton:true
					});
					Toast.fire({
						type:"error",
						title:"Something went wrong :("
					}); */
      Swal.fire("Error!", "Something went wrong :(", "error");
    }
  });
  /*
		sessionStorage.setItem("logged", true);
		router.jokePage();
		*/
};
var handleLogout = () => {
  if (sessionStorage.getItem("logged") === "true") {
    $.ajax({
      url: "http://itsovy.sk:1201/logout",
      type: "post",
      contentType: "application/json",
      data: JSON.stringify({
        login: sessionStorage.getItem("login"),
        token: sessionStorage.getItem("token")
      }),
      success: data => {
        console.log("logged out");
        sessionStorage.clear();
        router.loginPage();
      }
    });
  }
};
var handleUploadJoke = () => {
  //login token joke
  $.ajax({
    url: "http://itsovy.sk:1201/addJoke",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify({
      login: sessionStorage.getItem("login"),
      token: sessionStorage.getItem("token"),
      joke: $("#addJokeTextArea").val()
    }),
    success: data => {
      router.jokePage();
    }
  });
};

var sendJoke = () => {
  if (sessionStorage.getItem("logged") === "true") {
    router.sendJokePage();
  }
};
var handleUserSettingsHover = () => $("#userSettingsContent").toggle();

var handleChangePassword = () => {
  router.changePassword();
};
var handleSendChangePassword = () => {
  if ($("#password-reset-new").val().length < 8) {
    Swal.fire(
      "Error!",
      "New password must have at least 8 characters",
      "error"
    );
    $("#password-reset-new").css({ borderColor: "red" });
    return;
  }
  $.ajax({
    url: "http://itsovy.sk:1201/changePassword",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify({
      login: sessionStorage.getItem("login"),
      token: sessionStorage.getItem("token"),
      oldpassword: $("#password-reset-old").val(),
      newpassword: $("#password-reset-new").val()
    }),
    success: data => {
      router.jokePage();
      Swal.fire("Done!", "Password changed successfully", "success");
    },
    error: data => {
      Swal.fire("Error!", "Something went wrong :(", "error");
    }
  });
};
var handleHome = () => {
  router.home();
};

//TODO
// 1.) premenovat wifi na kotlebajekkt
// 2.) isť spať
