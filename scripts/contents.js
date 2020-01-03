
var contents = $("#mainContent");
var headerCon = $("#headerCont");
function include(file) {

    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;

    document.getElementsByTagName('body').item(0).appendChild(script);

}

// page format data
include("scripts/data.js");
include("scripts/thread-manager.js");
include("scripts/user-data.js");
include("scripts/notes.js");

// navigation click events
function goToProfile() {
    console.log("profile clicked");
    headerCon.html("Profile");
    contents.empty();
}

function goToHome() {
    console.log("home clicked");
    headerCon.html("Home");
    contents.empty();
    console.log(homeData);

    // code to show the post creation modal
    showModal();

    // post all subscribed threads recent posts
    for (var i = 0; i < homeData.length; i++) {
        var template = "<div class='card'>\
    <div class='card-body'>\
        <!-- title of thread -->\
        <h5 class='card-title'>" + homeData[i]["title"] + "</h5>\
        <!-- posted by ... -->\
        <h6 class='card-subtitle text-muted'>Posted by " + homeData[i]["threadUser"] + "</h6>\
        <!-- content of thread -->\
        <p class='card-text'>" + homeData[i]["threadInfo"] + "</p>\
        </div>\
    </div>"
        contents.append(template);
    }

    getRecentThreads();
}

function goToThreads() {
    console.log("threads clicked");
    headerCon.html("Threads");
    contents.empty();

    // code to show the post creation modal
    showModal();

    // show a specific subscribed thread's recent posts
    getSubscribedThreads();
}

function goToNotes() {
    console.log("notes clicked");
    headerCon.html("Notes");
    contents.empty();

    // add code here to show notes posted by the user

    
}

function goToSettings() {
    console.log("settings clicked");
    headerCon.html("Settings");
    contents.empty();
}

// add click events to navigation buttons

// PROFILE
$("#profItem").click(function () {
    goToProfile();
});

// HOME
$("#homeItem").click(function () {
    goToHome();
});

// THREAD
$("#threadItem").click(function () {
    goToThreads();
});

// NOTES
$("#noteItem").click(function () {
    goToNotes();
});

// SETTINGS
$("#settingsItem").click(function () {
    logout();
});

