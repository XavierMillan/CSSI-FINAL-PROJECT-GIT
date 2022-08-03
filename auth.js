

    //sign in and sign up ui element button to switch between views
let signUpCon = document.getElementById('signUp');
let signInCon = document.getElementById('signIn');
let container = document.getElementById('container');
    signUpCon.addEventListener('click', () => {
        setMessage("");
        document.getElementById("sign-in-view").style.display = "none";
        document.getElementById("sign-up-view").style.display = "block";
        container.classList.add("right-panel-active");
    });
    signInCon.addEventListener('click', () => {
        setMessage("");
        document.getElementById("sign-in-view").style.display = "block";
        //show password field
        document.getElementById("pass").style.display = "block";
        //show sign in button
        document.getElementById("signinbutton").style.display = "block";
        //hide reset password button
        document.getElementById("resetpassword").style.display = "none";
        //show forgot password button
        document.getElementById("forgotpassword").style.display = "block";
        document.getElementById("sign-up-view").style.display = "none";
        container.classList.remove("right-panel-active");
    });

    //buttons to sign in or sign up
const signUpButton = document.getElementById('signupbutton');
const signInButton = document.getElementById('signinbutton');
    signUpButton.addEventListener('click', (e) => {
        signUp();
    });
    signInButton.addEventListener('click', (e) => {
        signIn();
    });

    //got to reset password view
let forgotPassword = document.getElementById('forgotpassword');
    forgotPassword.addEventListener('click', (e) => {
        console.log('forgot password');
        forgotPassword.style.display = "none";
        //hide password field
        document.getElementById("pass").style.display = "none";
        setMessage("Input your email to reset your password");
        document.getElementById("resetpassword").style.display = "block";

        //hide sign in button
        document.getElementById("signinbutton").style.display = "none";
        //hide google sign in button
        document.getElementById("googlesigninbutton").style.display = "none";
        //hide orSi
        document.getElementById("orSI").style.display = "none";


    });

    //button to send reset password email
let resetPasswordButton = document.getElementById('resetpassword');
    resetPasswordButton.addEventListener('click', (e) => {
        var email = document.getElementById("email").value;
        //if email has an @ and .
        if(email.includes("@") && email.includes(".")){
            resetPassword();
            document.getElementById("resetpassword").style.display = "none";
            forgotPassword.style.display = "block";
            document.getElementById("orSI").style.display = "block";
            document.getElementById("googlesigninbutton").style.display = "block";

        }
        else{
            setMessage("Invalid email");
        }
    });

    // let linksigninButton = document.getElementById('linksignin');
    // linksigninButton.addEventListener('click', (e) => {
    //     sendEmailLogin();
    // });

    //button to sign in with google
// let googleSignInButton = document.getElementById('googlesigninbutton');
//     googleSignInButton.addEventListener('click', (e) => {
//         googleSignIn();
//     });

    //button to sign up with google
// let googleSignUpButton = document.getElementById('googlesignupbutton');
//     googleSignUpButton.addEventListener('click', (e) => {
//         googleSignIn();
//     });

    //fucntion to set the error message field
function setMessage(message) {
    let divs = document.getElementsByClassName( 'message' );

    [].slice.call( divs ).forEach(function ( div ) {
        div.innerHTML = message;
    });
}

function signIn() {
    console.log('sign in');
    var emailV = document.getElementById("email").value;
    var password = document.getElementById("pass").value;

    firebase.auth().signInWithEmailAndPassword(emailV, password).catch(function (error) {
        setMessage(error.message);
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('user signed in');
            window.location.href = "loggedin.html";



        }
        else {
            setMessage("No user signed in.");
        }
    });
}


function googleSignIn() {
    console.log('google sign in');
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('user signed in');
            window.location.href = "loggedin.html";
        } else {
            setMessage("No user signed in.");
        }
    });
}

    //sign out
function signOut() {
    firebase.auth().signOut();
        setMessage("No user signed in.");
    localStorage.setItem("firstlogin", "false");
}

function signUp(){
  let studentClasslist = document.getElementById("student").classList.contains("active");
  let teacherClasslist = document.getElementById("teacher").classList.contains("active");
  let demoClasslist = document.getElementById("demo").classList.contains("active");
  console.log(studentClasslist);
   console.log(teacherClasslist);
  console.log(demoClasslist);

  
    console.log('sign up');
    var emailV = document.getElementById("emailSU").value;
    var password = document.getElementById("passSU").value;
    let name = document.getElementById("nameSU").value;

    //set name to local storage
    localStorage.setItem("name", name);

  
  
  let role = 'Student';
  if(teacherClasslist){
    role = 'Teacher';
  }
  if(demoClasslist){
    role = 'Demo';
  }
    localStorage.setItem("role", role);

    firebase.auth().createUserWithEmailAndPassword(emailV, password)
        .then(function(result) {
            // alert("Account created successfully");
          
            return result.user.updateProfile({
            displayName: name
            });
        })
        .catch(function (error) {
            setMessage(error.message);
        });
    firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      
        window.location.href = "loggedin.html";
    }
    else {
        setMessage("No user signed in.");
    }
    //set a local stoarge variable called firstlogin session to true
    localStorage.setItem("firstlogin", "true");
});

}




    //reset pasword
function resetPassword(){
    var email = document.getElementById("email").value;
    firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
    setMessage("Email Sent");
    }).catch(function(error) {
    // An error happened.
        setMessage(error.message);
    // document.getElementById("message").innerHTML = error.message;
});
        forgotPassword.innerHTML = "Forgot Password?";
        //hide password field
        document.getElementById("pass").style.display = "block";
        document.getElementById("signinbutton").style.display = "block";
}

function verifyEmail(){
    const auth =  firebase.auth();
    const user = auth.currentUser;
    if(user.emailVerified==false)
    {
        firebase.auth().currentUser.sendEmailVerification();
        return false;
    }
    return true;
}

function addDocument(){
  
  let role = localStorage.getItem("role");

  let level = 1;
  if(role == "Teacher" || role =="Demo"){
    level =100;
  }
            //get user
            var user = firebase.auth().currentUser;
            //get name from textfield
            var name = user.displayName;
            //get email from textfield
            var email = user.email;
            //get user id
            var userid = user.uid;
            //get current time
            var currentTime = new Date().getTime();
            //get current date
            var currentDate = new Date(currentTime);
            //get current date and time
            var date = (currentDate.getMonth()+1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
            //add document to database
            firebase.firestore().collection("user-data").doc(userid).set({
                name: name,
                email: email,
                date: date,
                role: role,
                level: level
            }).then(function(){
                //document added
               alert("document added");
            }).catch(function(error){
                //error
                console.log(error);
            });
        }

