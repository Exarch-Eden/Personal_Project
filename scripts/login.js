function login() {

    var email = document.getElementById('emailField').value;
    var password = document.getElementById('passwordField').value;

    if (email && password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
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
    firstName = firstName.charAt(0).toUpperCase() + firstName.substring(1).toLowerCase();
    let lastName = document.getElementById('lastNameField').value;
    lastName = lastName.charAt(0).toUpperCase() + lastName.substring(1).toLowerCase();
    let email = document.getElementById('emailSignupField').value;
    let password = document.getElementById('passwordSignupField').value;
    let name = firstName + " " + lastName;

    // Check for errors in inputs
    if (!(firstName === "") && !(lastName === "") && !(email === "") && !(password === "")) {
        // Check if email is the right format
        if (email.includes('@gmail.com')) {

            // Create user with email and pass.
            // [START createwithemail]
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function () {
                    // Sign in newly created user
                    firebase.auth().signInWithEmailAndPassword(email, password)
                        .then(function () {
                            // get current user
                            var user = firebase.auth().currentUser;

                            // add initial data to firebase database
                            var userDoc = db.collection('user').doc(user.uid);
                            console.log(user);
                            userDoc.set({
                                first_name: firstName,
                                last_name: lastName,
                                email: user.email,
                                userID: user.uid,
                                reputation: 0,
                                subscriptions: []
                            }, { merge: true })
                                .then(function () {
                                    // for testing purposes
                                    alert("Profile creation done");

                                    // update main profile data
                                    user.updateProfile({
                                        displayName: name,
                                    }).then(function () {

                                        // enter home page
                                        location.href = 'home.html';


                                    }).catch(function (error) {
                                        // an error occured
                                    });
                                });
                        }).catch(function (error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            // [START_EXCLUDE]
                            if (errorCode === 'auth/wrong-password') {
                                alert('Wrong password.');
                            } else {
                                alert(errorMessage);
                            }
                            console.log(error);
                            document.getElementById('quickstart-sign-in').disabled = false;
                            // [END_EXCLUDE]
                        });
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // [START_EXCLUDE]
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too weak.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                    // [END_EXCLUDE]
                });
            // [END createwithemail]

        } else {

            // testing
            alert('email must end with @gmail.com');
        }


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

    // var cont = $('#formCont');
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

    // var cont = $('#formCont');
    cont.empty();
    cont.append(fields);
}



