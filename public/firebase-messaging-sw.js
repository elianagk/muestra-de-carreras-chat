// [START initialize_firebase_in_sw]
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAH0Ase4QWtwT8xdFp0c3bvK98UI6j0bnY",
  authDomain: "chat-muestra.firebaseapp.com",
  databaseURL: 'https://chat-muestra.firebaseio.com',
  projectId: "chat-muestra",
  storageBucket: "chat-muestra.appspot.com",
  messagingSenderId: "502634347735",
  appId: "1:502634347735:web:72ec28fbb394d3d791c492",
  measurementId: "G-7V8Z7K2W1Q"
});

const messaging = firebase.messaging();