// const firebaseConfig = {
//     apiKey: "AIzaSyDeaWpE9wc6VvPEilrEAqhEnjKo8ik1Stw",
//     authDomain: "cssifinal-884f2.firebaseapp.com",
//     projectId: "cssifinal-884f2",
//     storageBucket: "cssifinal-884f2.appspot.com",
//     messagingSenderId: "331915175322",
//     appId: "1:331915175322:web:ab968dfdccc693e2094623",
//     measurementId: "G-LB249TWWMB"
//   };

firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
     console.log("logged in");
  }
  else{
    window.location.href = "index.html";
    console.log("logged out");
  }
      });