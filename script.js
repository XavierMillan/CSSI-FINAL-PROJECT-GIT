// // import { initializeApp } from "firebase/app";
// // import { getStorage } from "firebase/storage";
// // const {Storage} = require('@google-cloud/storage');
// console.log('hello');

// const firebaseConfig = {
//   apiKey: "AIzaSyDeaWpE9wc6VvPEilrEAqhEnjKo8ik1Stw",
//   authDomain: "cssifinal-884f2.firebaseapp.com",
//   projectId: "cssifinal-884f2",
//   storageBucket: "cssi-images",
//   messagingSenderId: "331915175322",
//   appId: "1:331915175322:web:00e01867e9357b5e094623",
//   measurementId: "G-MW5G925TTN"
// };

// // firebase.initializeApp(firebaseConfig);

// const app = firebase.initializeApp(firebaseConfig);


// // Initialize Cloud Storage and get a reference to the service
// // const storage = firebase.getStorage(app);

// const storage = new Storage();

// var bucketName = 'posts-venge';
// var fileName = 'sfc.JPG';

// // Creates a client
// // const storage = new Storage();

// //upload local file to cloud storage
// uploadName = 'C:/Users/xavmi/OneDrive/Pictures/1Q.png';
// storage.bucket(bucketName).upload(uploadName, function(err, file) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('File uploaded: ' + file.name);
//         //get signed url from cloud storage
//         storage.bucket(bucketName).file(file.name).getSignedUrl({
//             action: 'read',
//             expires: '03-09-2491'
//         }, function(err, signedUrls) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(signedUrls);
//             }
//         }
//         );
//     }
// }
// );




// // Create a reference to the file to generate link
// var fileRef = storage.bucket(bucketName).file(fileName);

// fileRef.exists().then(function(data) {
//     console.log("File in database exists ");
// });

// const config = {
//     action: 'read',

//     // A timestamp when this link will expire
//     expires: '01-01-2026',
// };

// // Get the link to that file
// fileRef.getSignedUrl(config, function(err, url) {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     // The file is now available to
//     // read from this URL
//     console.log("Url is : " + url);
// });

// //add file to bucket
// // const bucket = storage.bucket(bucketName);

