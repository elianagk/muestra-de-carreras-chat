import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/firebase-messaging'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAH0Ase4QWtwT8xdFp0c3bvK98UI6j0bnY",
    authDomain: "chat-muestra.firebaseapp.com",
    projectId: "chat-muestra",
    storageBucket: "chat-muestra.appspot.com",
    messagingSenderId: "502634347735",
    appId: "1:502634347735:web:72ec28fbb394d3d791c492",
    measurementId: "G-7V8Z7K2W1Q"
  };
 
  // messaging.getToken({vapidKey: "BA8w-EHrjwdNdi8gehISa8Hr5vIsuvv2b0HG4q6XTzF-uvramgDS5QsWSH2wYtsxCWea2RI1BkT6vytdbYRFiVY"});
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

 const fb = {
  auth: firebase.auth(),
  messaging: firebase.messaging(),
  firestore: firebase.firestore(),
  async login() {
      return firebase.auth().signInAnonymously()
              .then(function(result) {
                  return {success: true, data: result};
              })
              .catch(function(error){
                  return {success: false, error: error.message};
              });
  },
  // async logout() {
  //     return firebase.auth().signOut()
  //         .then(function() {
  //             return {success: true};
  //         })
  //         .catch(function(error) {
  //             return {success: false, error: error};
  //         });
  // }
}


export default fb