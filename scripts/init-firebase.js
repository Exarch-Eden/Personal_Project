// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDSq-a2gwAwXXlfuie7znEcYoNBtEld3vw",
    authDomain: "bcitmemo.firebaseapp.com",
    databaseURL: "https://bcitmemo.firebaseio.com",
    projectId: "bcitmemo",
    storageBucket: "bcitmemo.appspot.com",
    messagingSenderId: "439118604332",
    appId: "1:439118604332:web:b2430321112eb732e24989"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();