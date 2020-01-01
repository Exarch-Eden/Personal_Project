function login() {

    var email = document.getElementById('emailField').value;
    var password = document.getElementById('passwordField').value;

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
    let firstName = document.getElementById('firstNameField').value;
    let lastName = document.getElementById('lastNameField').value;
    let email = document.getElementById('emailSignupField').value;
    let password = document.getElementById('passwordSignupField').value;

    if (email && password && firstName && lastName) {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function () {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        // User is signed in.
                        // location.href = 'home.html';
                        
                        let name = firstName + " " + lastName;
                        db.collection("user").doc(user.uid).set({
                            name: name,
                            email: email,
                            password: password,
                            reputation: 0
                        }, { merge: true });
                        console.log(user.uid);

                        user.updateProfile({
                            displayName: name
                        }).catch(function (error) {
                            // An error happened.
                            console.log(error.code, ' => ', error.message);
                        });

                        login();
                        // var user = firebase.auth().currentUser;

                        // if (user != null) {

                        //     var email_id = user.email;
                        //     document.getElementById('user_para').innerHTML = 'Welcome User : ' + email_id;

                        // }

                    } else {
                        // No user is signed in.
                        window.alert('no user signed in');
                        // document.getElementById('user_div').style.display = 'none';
                        // document.getElementById('login_div').style.display = 'block';

                    }
                });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode, ' =>', errorMessage);
                if (errorMessage.contains("email address is already in use")) {

                }
            });
    } else {
        alert('What happened?');
    }
}


function signupShow() {
    console.log('Show sign up form');
    var fields = "<p>Create your account</p>\
    <input type='text' class='form-control' name='firstNameField' id='firstNameField' aria-describedby='firstNameHelpId' placeholder='first name' required>\
    <input type='text' class='form-control' name='lastNameField' id='lastNameField' aria-describedby='lastNameHelpId' placeholder='last name' required>\
    <input type='email' class='form-control' name='emailField' id='emailSignupField' aria-describedby='emailHelpId' placeholder='email' required>\
    <input type='password' class='form-control' name='passwordSignupField' pattern='[A-Za-z0-9]{8,16}' id='passwordField' aria-describedby='passwordHelpId' placeholder='password' required>\
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
    console.log('Show login form');
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



