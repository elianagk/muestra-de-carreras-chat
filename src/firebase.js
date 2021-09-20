import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/firebase-messaging'

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyAb9AfeobXZGX7uC8VoPL0BvQRvuti8g7s",
  authDomain: "mainchat-5be17.firebaseapp.com",
  databaseURL: 'https://mainchat-5be17.firebaseio.com',
  projectId: "mainchat-5be17",
  storageBucket: "mainchat-5be17.appspot.com",
  messagingSenderId: "111819696762",
  appId: "1:111819696762:web:f76a28b405025c74f869c3",
  measurementId: "G-BZXHCRFYGJ"
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