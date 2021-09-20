// [START initialize_firebase_in_sw]
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAb9AfeobXZGX7uC8VoPL0BvQRvuti8g7s",
  authDomain: "mainchat-5be17.firebaseapp.com",
  databaseURL: 'https://mainchat-5be17.firebaseio.com',
  projectId: "mainchat-5be17",
  storageBucket: "mainchat-5be17.appspot.com",
  messagingSenderId: "111819696762",
  appId: "1:111819696762:web:f76a28b405025c74f869c3",
  measurementId: "G-BZXHCRFYGJ"
});

const messaging = firebase.messaging();