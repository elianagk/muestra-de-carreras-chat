import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/firebase-messaging'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDbrCf_cXiappAjWUO7fpBLcFFdftxOQeI",
  authDomain: "muestradecarreras-4013c.firebaseapp.com",
  databaseURL: 'https://muestradecarreras-4013c.firebaseio.com',
  projectId: "muestradecarreras-4013c",
  storageBucket: "muestradecarreras-4013c.appspot.com",
  messagingSenderId: "193516897466",
  appId: "1:193516897466:web:6beade313f4779eb39ae83",
  measurementId: "G-6GR4KHFESY"
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