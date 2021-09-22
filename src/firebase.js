import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/firebase-messaging'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBDzghvnjDkvGdtmEG-DWXAC78DWoPdK30",
  authDomain: "chat1-repuesto.firebaseapp.com",
  databaseURL: 'https://chat1-repuesto.firebaseio.com',
  projectId: "chat1-repuesto",
  storageBucket: "chat1-repuesto.appspot.com",
  messagingSenderId: "722807632334",
  appId: "1:722807632334:web:2273e7954226493d58fb9f",
  measurementId: "G-CXGDZRTWM2"
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