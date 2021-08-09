/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js');

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAH0Ase4QWtwT8xdFp0c3bvK98UI6j0bnY",
  authDomain: "chat-muestra.firebaseapp.com",
  databaseURL: 'https://chat-muestra.firebaseio.com',
  projectId: "chat-muestra",
  storageBucket: "chat-muestra.appspot.com",
  messagingSenderId: "502634347735",
  appId: "1:502634347735:web:72ec28fbb394d3d791c492",
  measurementId: "G-7V8Z7K2W1Q"
};

// messaging.getToken({vapidKey: "BA8w-EHrjwdNdi8gehISa8Hr5vIsuvv2b0HG4q6XTzF-uvramgDS5QsWSH2wYtsxCWea2RI1BkT6vytdbYRFiVY"});
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

