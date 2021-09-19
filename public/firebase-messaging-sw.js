// [START initialize_firebase_in_sw]
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCPeie3iIPNz57Mfg1wZE4wd6tAhHQzWBg",
  authDomain: "chat2-10a6d.firebaseapp.com",
  databaseURL: 'https://chat2-10a6d.firebaseio.com',
  projectId: "chat2-10a6d",
  storageBucket: "chat2-10a6d.appspot.com",
  messagingSenderId: "698867735794",
  appId: "1:698867735794:web:519495b1466438a558046b",
  measurementId: "G-5CTV9KP3NE"
});

const messaging = firebase.messaging();