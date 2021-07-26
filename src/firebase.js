import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

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
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);