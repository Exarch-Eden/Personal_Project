// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         // User is signed in.

//         document.getElementById("user_div").style.display = "block";
//         document.getElementById("login_div").style.display = "none";

//         var user = firebase.auth().currentUser;

//         if (user != null) {

//             var email_id = user.email;
//             document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

//         }

//     } else {
//         // No user is signed in.

//         document.getElementById("user_div").style.display = "none";
//         document.getElementById("login_div").style.display = "block";

//     }
// });

function login() {

    var userEmail = document.getElementById("emailField").value;
    var userPass = document.getElementById("passwordField").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
        location.href = 'home.html';
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        // window.alert("Error : " + errorMessage);
        document.getElementById("loginHelp").innerText = "Error : " + errorMessage;
        // ...
    });

}

function signup() {
    var email = $('#emailSignUp').value;
    var password = $('#passwordSignUp').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, " =>", errorMessage);
    });
}
function logout() {
    firebase.auth().signOut();
}
