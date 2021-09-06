// [START initialize_firebase_in_sw]
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDbrCf_cXiappAjWUO7fpBLcFFdftxOQeI",
  authDomain: "muestradecarreras-4013c.firebaseapp.com",
  databaseURL: 'https://muestradecarreras-4013c.firebaseio.com',
  projectId: "muestradecarreras-4013c",
  storageBucket: "muestradecarreras-4013c.appspot.com",
  messagingSenderId: "193516897466",
  appId: "1:193516897466:web:6beade313f4779eb39ae83",
  measurementId: "G-6GR4KHFESY"
});

const messaging = firebase.messaging();