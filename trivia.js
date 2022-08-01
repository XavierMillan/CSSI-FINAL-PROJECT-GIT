//defining variables
let triviaQuestions = [];
let correctAnswer = '';
let triviaPoints=0;
let firstTry=true;
let gameQuestion;

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
        document.querySelector('#triviaPoints').innerHTML=`Points: ${triviaPoints}/3`;
      }
    } else {
      firstTry=false;
      answer.style.setProperty('background-color','red');
    }
    });
  });

//runs when continue button clicked
function continueGame(){
  firstTry=true;
  document.querySelector('#continue').classList.add('hidden');
  for (let answer of answers){
    answer.style.setProperty('background-color','transparent')
  }
  setUpScreen(triviaQuestions);
}

function restartGame(){
   firstTry=true;
  triviaPoints=0
  document.querySelector('#continue').classList.add('hidden');
  for (let answer of answers){
    answer.style.setProperty('background-color','transparent')
  }
  document.querySelector('.rect').classList.remove('hidden');
  document.querySelector('#triviaGame').classList.add('hidden');
}