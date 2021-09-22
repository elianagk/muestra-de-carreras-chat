// [START initialize_firebase_in_sw]
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

firebase.initializeApp({
  databaseURL: 'https://chat1-repuesto.firebaseio.com',
  apiKey: "AIzaSyBDzghvnjDkvGdtmEG-DWXAC78DWoPdK30",
  authDomain: "chat1-repuesto.firebaseapp.com",
  projectId: "chat1-repuesto",
  storageBucket: "chat1-repuesto.appspot.com",
  messagingSenderId: "722807632334",
  appId: "1:722807632334:web:2273e7954226493d58fb9f",
  measurementId: "G-CXGDZRTWM2"
});

const messaging = firebase.messaging();