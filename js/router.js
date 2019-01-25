function Router() {
  this.hideAll = () => {
    $("#loginForm").hide();
    $("#jokes").hide();
    $("#logoutBtn").hide();
    $("#sendJoke").hide();
    $("#changePassword").hide();
    $("#messages").hide();
    $("#messageDetails").hide();
    $("#messageDetailsInner").empty();
    $("#messages").empty();
    $("#joke").empty();
    hideLoginError();
  };
  this.loginPage = () => {
    this.hideAll();
    $("#loginForm").show();
  };
  this.jokePage = () => {
    this.hideAll();
    $("#logoutBtn").show();
    $("#jokes").show();
  };
  this.sendJokePage = () => {
    this.hideAll();
    $("#sendJoke").show();
  };
  this.changePassword = () => {
    this.hideAll();
    $("#changePassword").show();
  };
  this.home = () => {
    console.log("go home");
    if (sessionStorage.getItem("logged") === "true") {
      this.jokePage();
    }
  };
  this.messages = () => {
    if (sessionStorage.getItem("logged") === "true") {
      this.hideAll();
      $("#messages").show();
    }
  };
  this.detailMessage = () => {
    if (sessionStorage.getItem("logged") === "true") {
      this.hideAll();
      $("#messageDetails").show();
    }
  };
}

var showLoginError = () => {
  $("#loginErrorMsg").css("visibility", "inline");
};
var hideLoginError = () => {
  $("#loginErrorMsg").css("visibility", "hidden");
};
