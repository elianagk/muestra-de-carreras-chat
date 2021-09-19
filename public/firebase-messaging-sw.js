// [START initialize_firebase_in_sw]
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAV-PYKQjfjudiMicmvvcV2tfD1Ijqnm5I",
  authDomain: "main-chat-b37ad.firebaseapp.com",
  databaseURL: 'https://main-chat-b37ad.firebaseio.com',
  projectId: "main-chat-b37ad",
  storageBucket: "main-chat-b37ad.appspot.com",
  messagingSenderId: "463499231090",
  appId: "1:463499231090:web:49c4691adca2ad04d5a7eb",
  measurementId: "G-P6QEX1XSQ3"
});

const messaging = firebase.messaging();