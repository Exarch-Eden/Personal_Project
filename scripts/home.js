
// var testHomeData = [
//     { title: 'Thread Title', datePosted: 'Posted 7 days ago', threadUser: 'Jon Dork', threadInfo: 'Some thread info here' },
//     { title: 'Thread Title', datePosted: 'Posted 7 days ago', threadUser: 'Jon Dork', threadInfo: 'Some thread info here' },
//     { title: 'Thread Title', datePosted: 'Posted 7 days ago', threadUser: 'Jon Dork', threadInfo: 'Some thread info here' },
//     { title: 'Thread Title', datePosted: 'Posted 7 days ago', threadUser: 'Jon Dork', threadInfo: 'Some thread info here' },
//     { title: 'Thread Title', datePosted: 'Posted 7 days ago', threadUser: 'K Milan', threadInfo: 'All hope is lost' },
//     { title: 'Thread Title', datePosted: 'Posted 7 days ago', threadUser: 'Jon Dork', threadInfo: 'Some thread info here' },
//     { title: 'Thread Title', datePosted: 'Posted 7 days ago', threadUser: 'Jon Dork', threadInfo: 'Some thread info here' },
//     { title: 'Thread Title', datePosted: 'Posted 7 days ago', threadUser: 'Jon Dork', threadInfo: 'Some thread info here' }
// ];

var testHomeData = [];

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
            for(let i = 0; i < doc.data().posts; i++){
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
    var postData = userData.collection("posts").doc(threadID);

    console.log(userData, " sent");
    console.log(threadData, " sent");
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

function getRecentThreads() {
    var now = new Date();
    console.log("date now is " + now);
    var nowTime = now.getTime();
    console.log("time now is " + nowTime);

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection('recent_threads').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, "=> ", doc.data());
                var data = getThreadFromUser(doc.data().postedBy, doc.data().threadInfo);
                testHomeData.push(data);
            })
        });
    })
}

$(document).ready(function() {
    getRecentThreads();
})