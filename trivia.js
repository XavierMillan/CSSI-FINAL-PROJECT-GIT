// const firebaseConfig = {
//     apiKey: "AIzaSyDeaWpE9wc6VvPEilrEAqhEnjKo8ik1Stw",
//     authDomain: "cssifinal-884f2.firebaseapp.com",
//     projectId: "cssifinal-884f2",
//     storageBucket: "cssifinal-884f2.appspot.com",
//     messagingSenderId: "331915175322",
//     appId: "1:331915175322:web:ab968dfdccc693e2094623",
//     measurementId: "G-LB249TWWMB"
//   };

// firebase.initializeApp(firebaseConfig);


//defining variables
let triviaQuestions = [];
let correctAnswer = '';
let triviaPoints=0;
let firstTry=true;
let gameQuestion;
let score=500;
//getting all answer HTML elements for the multiple choice
let answers=document.querySelectorAll('#answer')

//function runs after selecting easy/hard on start screen
async function getQuestion(level) {

document.querySelector('.rect').classList.add('hidden');
document.querySelector('#triviaGame').classList.remove('hidden');

const response = await fetch(`https://opentdb.com/api.php?amount=30&category=18&difficulty=${level}&type=multiple`);
 const json = await response.json();
triviaQuestions.push(json);
setUpScreen(triviaQuestions);

};

//run each time a new question is shown
function setUpScreen(array){
  //index of random question in api fetch
  let questionIndex= Math.floor(Math.random() * (31 - 0 + 1));
  gameQuestion=array[0].results[questionIndex];
  console.log(gameQuestion);
  
  document.querySelector('#question').innerHTML=`<div class="typewriter">${gameQuestion.question}</div>`

  //putting the correct answer in a random answer slot (so its not always the first answer on the multiple choice or something)
  let correct = (Math.floor(Math.random() * (3 - 0 + 1)));
  correctAnswer=gameQuestion.correct_answer;
  console.log('correct',correct);
let incorrectIndex=0
  for (i in answers){
    if (i == correct) {
      answers[i].innerHTML=`${correctAnswer}`
      
    } else {
      answers[i].innerHTML=`${gameQuestion.incorrect_answers[incorrectIndex]}`
      incorrectIndex++
    }
    if(i==3){
      break
    }
  };
};

answers.forEach((answer) => {

  //when answer clicked, will highlight either green or red.  Only add a point if got answer right on first try.  Can continue when correct answer guessed
  answer.addEventListener("click", () => {
    if (answer.innerHTML===`${correctAnswer}`){
      answer.style.setProperty('background-color','green');
      document.querySelector('#continue').classList.remove('hidden');
      if(firstTry==true){
        triviaPoints+=1;
       score+=100; document.querySelector('#triviaPoints').innerHTML=`Points: ${triviaPoints}/3`;
        if(triviaPoints==3){
          document.querySelector('#continue').classList.add('hidden');
          document.querySelector('#finish').classList.remove('hidden');
        }
      } else{
        score+=75;
      }
    } else {
      firstTry=false;
      score-=75;
      answer.style.setProperty('background-color','red');
    }
    });
  });

//runs when continue button clicked
function continueGame(){
  firstTry=true;
   console.log(score);
  document.querySelector('#continue').classList.add('hidden');
  for (let answer of answers){
    answer.style.setProperty('background-color','transparent')
  }
  setUpScreen(triviaQuestions);
}

function restartGame(){
   firstTry=true;
  triviaPoints=0;
  score=500;
  document.querySelector('#finish').classList.add('hidden');
  document.querySelector('#continue').classList.add('hidden');
  for (let answer of answers){
    answer.style.setProperty('background-color','transparent')
  }
  document.querySelector('.rect').classList.remove('hidden');
  document.querySelector('#triviaGame').classList.add('hidden');
}

function finish(){
  addToLeaderboard(score);
  alert(`you got 3 questions right and scored ${score} points!`);
  restartGame();
}
let leaderboardMap = new Map();
getLeaderboard = async () => {
  const querySnapshot = await firebase.firestore()
    .collectionGroup('trivialeaderboard')
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
 // addToLeaderboard(8);
getLeaderboard();

// let time = Date.now() +"";
  // addToLeaderboard(10);
async function addToLeaderboard(score) {
  console.log('SCORE: ' +score)
  if(isNaN(score)){
    console.log('score is not a number');
    return;
  }

  
  // let user = firebase.auth().currentUser;
  // console.log(user.uid);
  

   const querySnapshot = await firebase.firestore()
    .collectionGroup('trivialeaderboard')
    .get()

  if (!querySnapshot.empty) {
   
  }

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    
     let userScore = parseFloat(score);
    let userName = user.displayName;
    let userGames = 1;
    console.log("round score" + userScore);
    
    for(doc of querySnapshot.docs){
      console.log(doc.id);
      console.log(user.uid);
      if(doc.id == user.uid){
        console.log("match found");
        console.log("previous score" + parseFloat(doc.data().score));
           userScore += (parseFloat(doc.data().score) * parseFloat(doc.data().games)) ;
        
       console.log( parseFloat(doc.data().games));
          userGames += parseFloat(doc.data().games);
        console.log(userGames);
        
      }
      else{
         console.log("match NOT found");
      }
    }
    
    
  
 
  
  console.log("new total score" + userScore);
     console.log(userGames);
  userScore = userScore/(userGames);
  console.log(userScore);
  
  
  
  
  firebase.firestore().collection('trivialeaderboard').doc(user.uid).set({
    user: userName,
    score: userScore,
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
  });
  
}