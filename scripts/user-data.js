// firebase user authorization
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // testing purposes 
        console.log("name is", user.displayName);

        if (user.displayName) {
            $('#headerCont').html("Welcome back " + user.displayName);
        }

        // check is user is subscribed to any threads
        db.collection('user').doc(user.uid).get()
        .then(function(doc) {
            if(doc.exists) {
                if(doc.data().subscriptions.length <= 0) {
                    location.href = 'force-subscription.html';
                } else {
                    $('#screenCover').hide();
                }
            } else {

            }
        });

    } else {
        // No user is signed in.
        console.log('no user signed in');

    }
});