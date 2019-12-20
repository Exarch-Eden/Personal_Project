var contents = $("#content");

function include(file) { 
  
    var script  = document.createElement('script'); 
    script.src  = file; 
    script.type = 'text/javascript'; 
    script.defer = true; 
    
    document.getElementsByTagName('body').item(0).appendChild(script); 
    
} 

// page format data
include("scripts/data.js");


// navigation click events
function goToProfile() {
    console.log("profile clicked");
    
}

function goToHome() {
    console.log("home clicked");
}

function goToThreads() {
    console.log("threads clicked");
    
}

function goToNotes() {
    console.log("notes clicked");
    
}

function goToSettings() {
    console.log("settings clicked");
    
}

// add click events to navigation buttons

// PROFILE
$("#profItem").click(function() {
    goToProfile();
});

// HOME
$("#homeItem").click(function() {
    goToHome();
});

// THREAD
$("#threadItem").click(function() {
    goToThreads();
});

// NOTES
$("#noteItem").click(function() {
    goToNotes();
});

// SETTINGS
$("#settingsItem").click(function() {
    goToSettings();
});