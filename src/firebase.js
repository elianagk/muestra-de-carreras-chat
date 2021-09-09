import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/firebase-messaging'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCfDIMw1E8aWLe95CdRZJHrx0ujFg90ZF0",
  authDomain: "muestra-de-carreras.firebaseapp.com",
  databaseURL: 'https://muestra-de-carreras.firebaseio.com',
  projectId: "muestra-de-carreras",
  storageBucket: "muestra-de-carreras.appspot.com",
  messagingSenderId: "988332083741",
  appId: "1:988332083741:web:49b60b51304c4f55d794f4",
  measurementId: "G-QFTTJP229L"
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