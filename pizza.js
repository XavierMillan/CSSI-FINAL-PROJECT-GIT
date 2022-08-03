
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

    // console.log(firebase.auth().currentUser.displayName);


    
let defaultPizza={
  'pepperoni':[false,'red'],
  'cheese':[false,'orange'],
  'sauce':[false,'red'],
  'crust':[false,'tan']
};
let customerPizza={
  'pepperoni':[false,'red'],
  'cheese':[false,'orange'],
  'sauce':[false,'red'],
  'crust':[false,'tan']
};
let asked=0;
let defaultHTMLscreen1=`<div id='pepperoni2' class="circle hidden">
          <div id='p12' class="circle"></div>
            <div id='p22' class="circle"></div>
              <div id='p32' class="circle"></div>
                <div id='p42' class="circle"></div>
                  <div id='p52' class="circle"></div>
        </div>
        <div id='cheeseImg2' class="circle hidden"></div>
        <div id='cheese2' class="circle hidden"></div>
        <div id='sauce2' class='circle hidden'></div>
        <div id='crust2' class="circle hidden"></div>
      <img id='plate2'src='imgs/plate.png'class = ''>`;

let defaultHTMLscreen2=`<div id='pepperoni' class="circle hidden">
          <div id='p1' class="circle"></div>
            <div id='p2' class="circle"></div>
              <div id='p3' class="circle"></div>
                <div id='p4' class="circle"></div>
                  <div id='p5' class="circle"></div>
        </div>
        <div id='cheeseImg' class="circle hidden"></div>
        <div id='cheese' class="circle hidden"></div>
        <div id='sauce' class='circle hidden'></div>
        <div id='crust' class="circle hidden"></div>
      <img id='plate'src='imgs/plate.png'style=''>`;
let picky=false;
let yourPizza = {
  'pepperoni':[false,'red'],
  'cheese':[false,'orange'],
  'sauce':[false,'red'],
  'crust':[false,'tan']
}
let score=10;
let colorCoords={
  'editVal':['blockEdit','editValue'],
  'constFood':['blockConst','constVal','const'],
  'letFood':['blockLet','letVal','let']
};
let colors=['red','blue','purple','lime','green','yellow','pink','orange'];


//getting all answer HTML elements for the multiple choice
let answers=document.querySelectorAll('#answer')

//function runs after selecting easy/hard on start screen
function startGame() {

document.querySelector('#startPizzaGame').classList.add('hidden');
document.querySelector('#pizzaGame1').classList.remove('hidden');
};

function getCustomer(){
  document.getElementById('pizzaOrder').innerHTML+=`I'm here to order a pizza...`
  document.getElementById('getCustomerB').classList.add('hidden')
  document.getElementById('startOrderB').classList.remove('hidden')
  document.getElementById('bubble').classList.remove('hidden')
  for (const food in customerPizza) {
    let yes=[ `It should have ${food}.  `,`I want it to have ${food}.  `,`Give me some ${food}! `]
    let no=[`I don't want ${food}.  `,`can I skip the ${food}? `, `please no ${food}! `]
  console.log(food,customerPizza[food]);
    ingredient=food;
    let phrase=Math.floor(Math.random() * (2 - 0 + 1));
  let hasFood= Math.floor(Math.random() * (1 - 0 + 1));
  console.log('food,phrase',hasFood,phrase)
  if (hasFood===0){
    
     document.getElementById('pizzaOrder').innerHTML+=`${no[phrase]}`
  } else {
    customerPizza[food][0]=true;
  document.getElementById('pizzaOrder').innerHTML+=`${yes[phrase]}`};
  };
  console.log(customerPizza); 
};

function startOrder(){
  document.getElementById('pizzaGame1').classList.add('hidden')
  document.getElementById('pizzaGame2').classList.remove('hidden')
  if (picky==true){
    document.getElementById('finishedB').classList.add('hidden');
    document.getElementById('doneB').classList.remove('hidden');
    document.getElementById('fullPizza2').innerHTML=defaultHTMLscreen1;
  }
}

function makeChanges(data){
  let bubbleData=colorCoords[data][0];
  if (bubbleData== 'blockEdit'){
    return
  }
  let thing = document.getElementById(`${colorCoords[data][1]}`).value;
  if (!yourPizza.hasOwnProperty([thing])){
    document.getElementById(`${colorCoords[data][1]}`).value="";
    return};
  yourPizza[thing][0]=true
  let word = colorCoords[data][2];
  console.log('done',bubbleData,thing);
  yourPizza[thing].push(word);
  console.log(yourPizza[thing]);
  if (bubbleData != 'blockEdit'){
  let str=`<div id='modify_${thing}' ondrop="drop2(event)" ondragover="allowDrop(event)"><div class='${bubbleData}'>${word} ${thing} = true;</div></div>`
  console.log(str);
  document.getElementById('transcript').innerHTML+=`${str}`
    }
    document.getElementById(`${thing}`).classList.remove('hidden');
  if(thing=='cheese'){
    document.getElementById(`cheeseImg`).classList.remove('hidden');
  }
  document.getElementById(`${colorCoords[data][1]}`).value=""
 
  
}

function changeColor(thingId,data){
  console.log(thingId,data)
  let bubbleData=colorCoords[data][0];
   if (bubbleData!= 'blockEdit'){
    return
  }
  let arr= thingId.split('_');
  let thing = arr[1];
  console.log(thing)
  if (!yourPizza.hasOwnProperty(thing)){return}
  let color=document.getElementById(`${colorCoords[data][1]}`).value;
  console.log(color)
  yourPizza[thing][1]=color;
  if (!color in colors){
    alert('you entered an invalid color!')
    return
  }
  console.log('going')
  document.getElementById(`modify_${thing}`).innerHTML+=`<div class='${bubbleData}'>${thing}.style.setProperty('background-color',${color});</div>`;
  document.getElementById(`${thing}`).style.setProperty('background-color',`${color}`);
  document.getElementById(`${colorCoords[data][1]}`).value=""
};

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  makeChanges(data);
}

function drop2(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  console.log(ev.target.id);
  changeColor(ev.target.id,data)
}
function finished(){
  let finishedPizza=document.getElementById('fullPizza').innerHTML;
  document.getElementById('finishedB').classList.add('hidden');
  document.getElementById('pizzaGame1').classList.remove('hidden');
  document.getElementById('pizzaGame2').classList.add('hidden');
  document.getElementById('fullPizza2').innerHTML=finishedPizza;
  document.getElementById('bubble').classList.remove('hidden')
  document.getElementById('getCustomerB').classList.add('hidden');
  document.getElementById('startOrderB').classList.remove('hidden');
  let phrase=[['Wait I want my','to look','!'],['Ohhh, can my','be','?'],['Try making the','colored','...']];
  let str='';
  for (thing in customerPizza){
    if(customerPizza[thing][0]==false){continue}
    if(yourPizza[thing][0]==false){
      str+=`aren't you forgetting the ${thing}??`
      score-=1;
      asked+=1;
      continue
    }
    let difColor=Math.floor(Math.random() * (1 - 0 + 1));
    if (difColor== 0){
      continue};
    let randColor=Math.floor(Math.random() * (colors.length - 0 + 1));
    console.log(randColor)
    let randPhrase=Math.floor(Math.random() * (3 - 0 + 1));
    let color=colors[randColor];
    customerPizza[thing][1]=color;
    console.log(color)
    console.log(randPhrase,phrase[randPhrase][0])
    str+=`${phrase[randPhrase][0]} ${thing} ${phrase[randPhrase][1]} ${color} ${phrase[randPhrase][2]} `
  }
  if(str==''){
    document.getElementById('pizzaOrder').innerHTML='that looks good enough for me!';
    document.getElementById('startOrderB').classList.add('hidden');
    document.getElementById('doneB2').classList.remove('hidden');
    return
  }
  picky=true;
  document.getElementById('pizzaOrder').innerHTML=str;
  console.log(customerPizza)
}
function done(){
  let donePizza=document.getElementById('fullPizza').innerHTML;
  document.getElementById('pizzaGame1').classList.remove('hidden')
  document.getElementById('pizzaGame2').classList.add('hidden')
  document.getElementById('startOrderB').classList.add('hidden')
  document.getElementById('fullPizza2').innerHTML=donePizza;
  let str=`hmm...`
  for (food in yourPizza){
    if (yourPizza[food][0]!=customerPizza[food][0]){
      score-=2;
      if (yourPizza[food][0]==true){
      str+=`why did you add ${food}?`} else{str+=`I didn't get ${food}!`}
    }
    else{
      if (yourPizza[food][1]!==customerPizza[food][1]&& customerPizza[food][0]==true){
      score-=1;
      str+=`I wanted my ${food} ${customerPizza[food][1]} but its ${yourPizza[food][1]}! `
    }
      if(customerPizza[food][0]==true){
      str+=`${food} looks good. `;
      if(customerPizza[food].includes('let') && customerPizza[food].includes('const')){
        str+=`..wait, you added ${food} twice!  Did you think I wouldn't notice? `
        };
      };
    }
  }
  str+=` I had to ask you twice ${asked} times!  That's ${score} out of 10 stars for me!`
  document.getElementById('pizzaOrder').innerHTML=str;
  document.getElementById('gameOver').classList.remove('hidden')
}

function done2(){
  document.getElementById('startOrderB').classList.add('hidden')
   document.getElementById('doneB2').classList.add('hidden');
  let str=`hmm...`
  for (food in yourPizza){
    if (yourPizza[food][0]!=customerPizza[food][0]){
      score-=2;
      if (yourPizza[food][0]==true){
      str+=`why did you add ${food}?`} else{str+=`I didn't get ${food}!`}
    }
    else{
      if(customerPizza[food][0]==true){
      str+=`${food} looks good. `;
      if(customerPizza[food].includes('let') && customerPizza[food].includes('const')){
        str+=`..wait, you added ${food} twice!  Did you think I wouldn't notice? `
        };
      };
    }
    if (yourPizza[food][1]!==customerPizza[food][1]&& customerPizza[food][0]==true){
      score-=1;
      str+=`I wanted my ${food} ${customerPizza[food][1]} but its ${yourPizza[food][1]}! `
    }
  }
  str+=` I had to ask you twice ${asked} times!  That's ${score} out of 10 stars for me!`
  document.getElementById('pizzaOrder').innerHTML=str;
  document.getElementById('gameOver').classList.remove('hidden')
}

function gameOver() {
  //score is under variable score-
  addToLeaderboard(score);
  console.log('running')
  document.querySelector('#pizzaGame1').classList.remove('hidden');
document.getElementById('fullPizza2').innerHTML=defaultHTMLscreen1;
  document.querySelector('#pizzaGame1').classList.add('hidden');
  document.querySelector('#pizzaGame2').classList.remove('hidden');
  document.getElementById('transcript').innerHTML="";
  document.getElementById('finishedB').classList.remove('hidden');
  document.getElementById('doneB').classList.add('hidden');
document.getElementById('fullPizza').innerHTML=defaultHTMLscreen2;
  document.querySelector('#pizzaGame2').classList.add('hidden');
document.querySelector('#startPizzaGame').classList.remove('hidden');

  for (food in defaultPizza){
    yourPizza[food]=defaultPizza[food];
    customerPizza[food]=defaultPizza[food];
    console.log(yourPizza,customerPizza)
  };
  score=10;
  asked=0;
  picky=false;
  document.getElementById('gameOver').classList.add('hidden');
  document.getElementById('pizzaOrder').innerHTML='';
  document.getElementById('bubble').classList.add('hidden');
  document.getElementById('getCustomerB').classList.remove('hidden');
  // $('#pizzaGame1').load('#pizzaGame1 > *');
  // $('#pizzaGame2').load('#pizzaGame2 > *');
}




  // if(user){
    

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
    .collectionGroup('pizzaleaderboard')
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
  
  
  
  
  firebase.firestore().collection('pizzaleaderboard').doc(user.uid).set({
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

  // }
// });
             

