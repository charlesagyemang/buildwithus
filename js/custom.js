// Declare function
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


$(document).ready(function(){
  var userData = $.parseJSON(getCookie("user")).profile;
  console.log("===customjs===", "hey Im here");
  console.log("===UserFirstName===",userData.first_name);
  $("#link-register").html("<i class='fa fa-user'></i> Hi " + userData.first_name);
  $("#link-register").attr("href", "#");
  $("#link-login").addClass("hide");
})
