// [START initialize_firebase_in_sw]
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyB6DfKbesGx3sDvO_QhVmPixlLVJgE1ADk",
  authDomain: "doe-database.firebaseapp.com",
  databaseURL: 'https://doe-database.firebaseio.com',
  projectId: "doe-database",
  storageBucket: "doe-database.appspot.com",
  messagingSenderId: "441707312159",
  appId: "1:441707312159:web:07b81aa2fbe4ab0f94912a",
  measurementId: "G-LZK6YJ34H3"
});

const messaging = firebase.messaging();