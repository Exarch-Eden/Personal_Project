const firebaseConfig = {
    apiKey: "AIzaSyDSq-a2gwAwXXlfuie7znEcYoNBtEld3vw",
    authDomain: "bcitmemo.firebaseapp.com",
    databaseURL: "https://bcitmemo.firebaseio.com",
    projectId: "bcitmemo",
    storageBucket: "bcitmemo.appspot.com",
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();