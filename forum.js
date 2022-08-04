function changeCardView(location,remove1){
  document.getElementById(location).style.display = 'block';
  document.getElementById(location+"nav").classList.add('active');

   document.getElementById(remove1).style.display = 'none';
  document.getElementById(remove1+"nav").classList.remove('active');
  
}



/*

<br>
<div class="card" style="width: 60%; margin-left: 20% ;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <small class="text-muted">Xavier - xavmillan@gmail.com</small>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    
    <button type="button" class="btn btn-primary">Comments</button>
    <br>
    <small class="text-muted">Last updated 3 mins ago</small>
  </div>
</div>

*/

// let docid =10+"";
// let uid= 1111+"";
// let title = "hello";
// let user ="xavi";
// let email = "xavmillan@gmail.com";
// let content = "jkqasmsa";
// let timestamp = "111222333";

// var xmlString = `
// <br>
// <div class="card" style="width: 60%; margin-left: 20%;" id="${docid}" data-uid="${uid}">
//   <div class="card-body">
//     <h5 class="card-title">${title}</h5>
//     <small class="text-muted">${user} - ${email}</small>
//     <p class="card-text">${content}</p>
//     <button type="button" class="btn btn-primary">Comments</button>
//     <br>
//     <small class="text-muted">${timestamp}</small>
//   </div>
// </div>
// `;

// var d1 = document.getElementById('posts');
// d1.insertAdjacentHTML('afterbegin', xmlString);


// var doc = new DOMParser().parseFromString(xmlString, "text/xml");
// console.log(doc.firstChild.innerHTML); // => <a href="#">Link...
// console.log(doc.firstChild.firstChild.innerHTML); // => Link

// var card = "div";
// var cardbody = "div";
// var cardtitle = "h5";
// var contact = "small";
// var cardtext = "p";
// var button = "button";
// var br = "br";
// var time = "small";

//     // Creating the elements 
//     var elem = document.createElement(card);
//     elem.class = "card";
//     var elem2 = document.createElement(str2);
  
//     // Insert text in the element
//     elem.innerText =
//       "This is the new heading element";
//     elem2.innerText =
//       "This is the new paragraph element";
