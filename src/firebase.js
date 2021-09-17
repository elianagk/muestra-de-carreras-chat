import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/firebase-messaging'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAV-PYKQjfjudiMicmvvcV2tfD1Ijqnm5I",
  authDomain: "main-chat-b37ad.firebaseapp.com",
  databaseURL: 'https://main-chat-b37ad.firebaseio.com',
  projectId: "main-chat-b37ad",
  storageBucket: "main-chat-b37ad.appspot.com",
  messagingSenderId: "463499231090",
  appId: "1:463499231090:web:49c4691adca2ad04d5a7eb",
  measurementId: "G-P6QEX1XSQ3"
};

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

}
export default fb