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

    var email = document.getElementById('emailField').value;
    var password = document.getElementById('pass wordField').value;

    if (email && password) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
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
    var firstName = document.getElementById('firstNameField').value;
    var lastName = document.getElementById('lastNameField').value;
    var email = document.getElementById('emailField').value;
    var password = document.getElementById('passwordField').value;

    if (email && password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            alert("Sign in successful");
            login();
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode, ' =>', errorMessage);
            if (errorMessage.contains("email address is already in use")) {
                
            }
        });
    }

    console.log('logged in');
}

function addData(dataType, data) {
    firebase.auth().onAuthStateChanged(function (user) {

        // if the current user logged in user
        // is authenticated, then grab "uid" "displayName" and "email"
        // use "set()" with merge (if document did not exist it will be created)
        if (user) {
            console.log("Signed in");
            db.collection("users").doc(user.uid).set({
                dataType : data
            }, { merge: true });

        } else {
            console.log("Not signed in");
        }
    });
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
      <a onclick='loginShow()' href='#login'>Sign in to an existing account</a>\
    </div>";

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
    </div>";

    var cont = $('#formCont');
    cont.empty();
    cont.append(fields);
}

function logout() {
    firebase.auth().signOut();
}

