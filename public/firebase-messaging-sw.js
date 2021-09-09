// [START initialize_firebase_in_sw]
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCfDIMw1E8aWLe95CdRZJHrx0ujFg90ZF0",
  authDomain: "muestra-de-carreras.firebaseapp.com",
  databaseURL: 'https://muestra-de-carreras.firebaseio.com',
  projectId: "muestra-de-carreras",
  storageBucket: "muestra-de-carreras.appspot.com",
  messagingSenderId: "988332083741",
  appId: "1:988332083741:web:49b60b51304c4f55d794f4",
  measurementId: "G-QFTTJP229L"
});

const messaging = firebase.messaging();