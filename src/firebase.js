import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/firebase-messaging'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCzRdX1OEAbq71JaiZd5Ihmw-5p3aLoA3s",
  authDomain: "chat1-7bd8c.firebaseapp.com",
  databaseURL: 'https://chat1-7bd8c.firebaseio.com',
  projectId: "chat1-7bd8c",
  storageBucket: "chat1-7bd8c.appspot.com",
  messagingSenderId: "629871516449",
  appId: "1:629871516449:web:341cfa12a2577a26ee3c60",
  measurementId: "G-36JT8EP2E5"
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