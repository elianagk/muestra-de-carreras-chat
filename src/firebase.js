import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/firebase-messaging'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCPA2dn-gYwNONAm-x_IXfweHnUvPANfGM",
  authDomain: "doe2-ef06f.firebaseapp.com",
  projectId: "doe2-ef06f",
  storageBucket: "doe2-ef06f.appspot.com",
  messagingSenderId: "382189918236",
  appId: "1:382189918236:web:4ede3b931bb7b3541fe7d9",
  measurementId: "G-HTT9F94MMS"
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