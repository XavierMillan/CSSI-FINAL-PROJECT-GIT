console.log('hello');


const firebaseConfig = {
    apiKey: "AIzaSyDeaWpE9wc6VvPEilrEAqhEnjKo8ik1Stw",
    authDomain: "cssifinal-884f2.firebaseapp.com",
    projectId: "cssifinal-884f2",
    storageBucket: "cssifinal-884f2.appspot.com",
    messagingSenderId: "331915175322",
    appId: "1:331915175322:web:ab968dfdccc693e2094623",
    measurementId: "G-LB249TWWMB"
  };

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
  if(user){
    

let leaderboardMap = new Map();
getLeaderboard = async () => {
  const querySnapshot = await firebase.firestore()
    .collectionGroup('pizzaleaderboard')
    .get()

  if (!querySnapshot.empty) {
    let leaderMap = new Map();
    for(doc of querySnapshot.docs){
      console.log(doc.data().user + " " + doc.data().score);
      leaderMap.set(doc.data().user, doc.data().score);
    }
    const sorted = new Map([...leaderMap.entries()].sort((a, b) => b[1] - a[1]));
    console.log(leaderMap);
    console.log(sorted);

    let names = Array.from(sorted.keys());
    let scores = Array.from(sorted.values());
    console.log(sorted.values());
    console.log(sorted.values());
    console.log(names[0]);
    console.log(scores[0]);

    for(let i=0; i<5; i++){
      let domID = 'score'+i;
      document.getElementById(domID).innerHTML = (i+1) + ") "+names[i] + ": " + scores[i];
    }
    
    return leaderMap;
    
  }
  else {
    console.log('empty')
    return null;
  }
}

getLeaderboard();

let time = Date.now() +"";
async function addToLeaderboard(score) {
  if(isNaN(score)){
    console.log('score is not a number');
    return;
  }

   const querySnapshot = await firebase.firestore()
    .collectionGroup('pizzaleaderboard')
    .doc(user.uid)
     .get()

  let userScore = parseFloat(score);
    let userName = user.displayName;
  let userGames = 1;
   if (!querySnapshot.empty) {
    userScore += parseFloat(querySnapshot.data().score);
    // userName = querySnapshot.data().user;
    userGames += parseFloat(querySnapshot.data().games);
     userScore = userScore/userGames;
   }

  
  
  
  
  firebase.firestore().collection('pizzaleaderboard').doc(user.uid).set({
    user: userName,
    score: score,
    games: userGames
  })
    .then(function(){
    console.log(score + " updated");
    getLeaderboard();
  })
    .catch(function(error){
    console.log(error);
  });
  
}

  }
});
                                   
