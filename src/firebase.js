import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/firebase-messaging'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB6DfKbesGx3sDvO_QhVmPixlLVJgE1ADk",
  authDomain: "doe-database.firebaseapp.com",
  databaseURL: 'https://doe-database.firebaseio.com',
  projectId: "doe-database",
  storageBucket: "doe-database.appspot.com",
  messagingSenderId: "441707312159",
  appId: "1:441707312159:web:07b81aa2fbe4ab0f94912a",
  measurementId: "G-LZK6YJ34H3"
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