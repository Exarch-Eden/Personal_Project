// home.js
// version 0.0.1

var homeData = [];
var threadsData = [];
/*
    get a thread from a certain user
    - userID to get the user who owns the thread
    - threadID to get the specific thread from the user
 */
function getThreadFromUser(userID, threadID) {


    var userData = db.collection("user").doc(userID);
    var threadData = userData.collection("threads").doc(threadID);
    console.log(userData, " sent");
    console.log(threadData, " sent");
    var data = {
        title: "",
        datePosted: "",
        threadUser: "",
        threadInfo: "",
        posts: []
    };

    userData.get().then(function (doc) {
        if (doc.exists) {
            console.log('document data: ', doc.data());
            data.threadUser = doc.data().firstName + " " + doc.data().lastName
        } else {
            console.log('document does not exist');
        }
    })

    threadData.get().then(function (doc) {
        if (doc.exists) {
            console.log('document data sending... ', doc.data());
            data.title = doc.data().threadTitle;
            data.datePosted = doc.data().datePosted;
            data.threadInfo = doc.data().threadInfo;
            for (let i = 0; i < doc.data().posts; i++) {
                data.posts.push(doc.data().posts[i]);
            }
        } else {
            console.log('document does not exist');
        }
    })

    return data;
}

function getPostFromUser(userID, postID) {
    var userData = db.collection("user").doc(userID);
    var postData = userData.collection("posts").doc(postID);

    console.log(userData, " sent");
    console.log(postData, " sent");
    var data = {
        postUser: "",
        postInfo: ""
    };

    userData.get().then(function (doc) {
        if (doc.exists) {
            console.log('document data: ', doc.data());
            data.postUser = doc.data().firstName + " " + doc.data().lastName
        } else {
            console.log('document does not exist');
        }
    })

    postData.get().then(function (doc) {
        if (doc.exists) {
            console.log('document data sending... ', doc.data());
            data.postInfo = doc.data().postInfo;
        } else {
            console.log('document does not exist');
        }
    })

    return data;
}

// presets the current 100 posts
function getRecentThreads() {
    var now = new Date();
    console.log("date now is " + now);
    var nowTime = now.getTime();
    console.log("time now is " + nowTime);

    homeData = [];

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection('recent_threads').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, "=> ", doc.data());
                var data = getThreadFromUser(doc.data().postedBy, doc.data().threadInfo);
                homeData.push(data);
            })
        });
    })
}

/* 
    gets threads from the user's subscriptions
*/
function getSubscribedThreads() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userData = db.collection("user").doc(user.uid);
            var subscriptions = [];

            userData.get().then(function (doc) {
                if (doc.exists) {
                    console.log('document data: ', doc.data());
                    if (doc.data().subscriptions > 0) {
                        for (let i = 0; i < doc.data().subscriptions; i++) {
                            subscriptions[i] = doc.data().subscriptions[i];
                        }
                    } else {
                        console.log('no current subscriptions');   
                    }
                } else {
                    // html for button to redirect to unsubbed threads page
                    var redirectButton = "<button type='button' id='redirectButton' class='btn btn-primary'>Let's look for some threads!</button>";

                    // card to indicate the user has no subbed threads
                    var noSubs = "<div id='noSubsCard' class='card'>\
                    <div class='card-body'>\
                        <!-- title of thread -->\
                        <h5 class='card-title'>" + "Uh oh!" + "</h5>\
                        <!-- content of thread -->\
                        <p class='card-text'>" + "It appears you aren't subscribed to any threads!" + "</p>\
                        </div>\
                        <button type='button' id='redirectButton' class='btn btn-primary'>\
                        Let's look for some threads!\
                        </button>\
                    </div>";

                    contents.append(noSubs);
                    console.log('document does not exist');
                }
            }).catch(function(error) {
                console.log("error getting document:", error);
            });


        } else {
            console.log("no user logged in");
            alert("No user is logged in. Please login to access you subscriptions.");
        }

    })
}

$(document).ready(function () {
    getRecentThreads();
})