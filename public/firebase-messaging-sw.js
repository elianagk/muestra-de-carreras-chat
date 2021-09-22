// [START initialize_firebase_in_sw]
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

firebase.initializeApp({
  databaseURL: 'https://doe2-ef06f.firebaseio.com',
  apiKey: "AIzaSyCPA2dn-gYwNONAm-x_IXfweHnUvPANfGM",
  authDomain: "doe2-ef06f.firebaseapp.com",
  projectId: "doe2-ef06f",
  storageBucket: "doe2-ef06f.appspot.com",
  messagingSenderId: "382189918236",
  appId: "1:382189918236:web:4ede3b931bb7b3541fe7d9",
  measurementId: "G-HTT9F94MMS"
});

const messaging = firebase.messaging();