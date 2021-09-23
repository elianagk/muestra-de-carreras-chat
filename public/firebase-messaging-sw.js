// [START initialize_firebase_in_sw]
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCzRdX1OEAbq71JaiZd5Ihmw-5p3aLoA3s",
  authDomain: "chat1-7bd8c.firebaseapp.com",
  databaseURL: 'https://chat1-7bd8c.firebaseio.com',
  projectId: "chat1-7bd8c",
  storageBucket: "chat1-7bd8c.appspot.com",
  messagingSenderId: "629871516449",
  appId: "1:629871516449:web:341cfa12a2577a26ee3c60",
  measurementId: "G-36JT8EP2E5"
});

const messaging = firebase.messaging();