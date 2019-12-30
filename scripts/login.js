// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         // User is signed in.

//         document.getElementById('user_div').style.display = 'block';
//         document.getElementById('login_div').style.display = 'none';

//         var user = firebase.auth().currentUser;

//         if (user != null) {

//             var email_id = user.email;
//             document.getElementById('user_para').innerHTML = 'Welcome User : ' + email_id;

//         }

//     } else {
//         // No user is signed in.

//         document.getElementById('user_div').style.display = 'none';
//         document.getElementById('login_div').style.display = 'block';

//     }
// });


function login() {

    var userEmail = document.getElementById('emailField').value;
    var userPass = document.getElementById('passwordField').value;

    if(userEmail != null && userPass != null) {
        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function () {
            location.href = 'home.html';
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
    
            // window.alert('Error : ' + errorMessage);
            // document.getElementById('loginHelp').innerText = 'Error : ' + errorMessage;
            // ...
        });
    }  

}

function signup() {
    var email = document.getElementById('emailField').value;
    var password = document.getElementById('passwordField').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, ' =>', errorMessage);
    });

    console.log('logged in');
    
}

function signupShow() {
    var fields = "<p>Create your account</p>\
    <input type='text' class='form-control' name='firstNameField' id='firstNameField' aria-describedby='firstNameHelpId' placeholder='first name' required>\
    <input type='text' class='form-control' name='lastNameField' id='lastNameField' aria-describedby='lastNameHelpId' placeholder='last name' required>\
    <input type='email' class='form-control' name='emailField' id='emailField' aria-describedby='emailHelpId' placeholder='email' required>\
    <input type='password' class='form-control' name='passwordField' pattern='[A-Za-z0-9]{8,16}' id='passwordField' aria-describedby='passwordHelpId' placeholder='password' required>\
    <small id='loginHelp' class='form-text text-muted'></small>\
    <div>\
      <button onclick='signup()'>Signup</button>\
    </div>\
    <div id='register'>\
      Already have an account?\
      <a onclick='loginShow()' href='#login'>Login</a>\
    </div>"

    var cont = $('#formCont');
    cont.empty();
    cont.append(fields);
}

function loginShow() {
    var fields = "<p>Welcome back</p>\
    <input type='email' class='form-control' name='emailField' id='emailField' aria-describedby='emailHelpId' placeholder='email' required>\
    <input type='password' class='form-control' name='passwordField' pattern='[A-Za-z0-9]{8,16}' id='passwordField' aria-describedby='passwordHelpId' placeholder='password' required>\
    <small id='loginHelp' class='form-text text-muted'></small>\
    <div>\
      <button onclick='login()'>Login</button>\
    </div>\
    <div id='register'>\
      Already have an account?\
      <a onclick='signupShow()' href='#signup'>Login</a>\
    </div>"

    var cont = $('#formCont');
    cont.empty();
    cont.append(fields);
}

function logout() {
    firebase.auth().signOut();
}

