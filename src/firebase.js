import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/firebase-messaging'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCPeie3iIPNz57Mfg1wZE4wd6tAhHQzWBg",
  authDomain: "chat2-10a6d.firebaseapp.com",
  databaseURL: 'https://chat2-10a6d.firebaseio.com',
  projectId: "chat2-10a6d",
  storageBucket: "chat2-10a6d.appspot.com",
  messagingSenderId: "698867735794",
  appId: "1:698867735794:web:519495b1466438a558046b",
  measurementId: "G-5CTV9KP3NE"
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