# chat-muestra

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## **Setup de la base de datos con firebase**

Para configurar la base de datos y las notificaciones en el servicio de chat se deben seguir los siguientes pasos

En el proyecto de firebase se debe habilitar la opción “Authentication” y en la parte Sign-in method se debe configurar que los usuarios puedan acceder de forma anónima.

> firebase.js y firebase-messaging-sw.js

En las configuraciones de la base de datos se debe agregar el texto que se copia directamente desde las configuraciones del proyecto de firebase. Además se debe agregar el campo “databaseURL” el cual cumple con el formato “https://project -id.firebaseio.com”

```
var firebaseConfig = {
  apiKey: "AIzaSyCzRdX1OEAbq71JaiZd5Ihmw-5p3aLoA3s",
  authDomain: "chat1-7bd8c.firebaseapp.com",
  databaseURL: 'https://chat1-7bd8c.firebaseio.com',
  projectId: "chat1-7bd8c",
  storageBucket: "chat1-7bd8c.appspot.com",
  messagingSenderId: "629871516449",
  appId: "1:629871516449:web:341cfa12a2577a26ee3c60",
  measurementId: "G-36JT8EP2E5"
};
```
#
Para configurar las notificaciones se debe habilitar la opción Cloud Messaging en las configuraciones del proyecto, debería verse de la siguiente manera:

> room.service.js

En la función sendMessage se debe modificar la clase de autorización con la Server key que se obtiene de Cloud Messaging API

```
const requestOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json" ,
          'Authorization': "key=AAAAkqdEmyE:APA91bF70m7e607To7Y9dz6ZfLE3hk0qLN1a3NG7nStW4rvyS7mjUljHSoro_UFaWUSzucdMnPSGF1wT-nV5rtmQ_ue34LAe5X9Mf6xuUZ70dk9Adzpw-1UjRIyTdj9TZCADyxr6V_Yr",
      },
      body: JSON.stringify({
          to: tokenReceiver,
          notification: {
              "title": "Mensaje nuevo de " + senderName,
              "body": message
          }
      })
  };
```
#
> LoginDialog.vue

En la sección donde se obtiene el token la variable “vapidKey” por el key pair que se obtiene de los certificados web que se habilitaron en la parte Cloud Messaging

```
  ...mapActions('userModule', ['login']),
   async getToken(){
      fb.messaging.getToken({vapidKey: "BDA8pwAp8ESgD_acBLiv76f3sBWe51w6LqKKI_ppuGG3RkBRXOipNTp7Ua4OJ2IwrTLV9w_uE8pwncJyDJ_1J_k"})
          .then((currentToken) => {
          if (currentToken) {
              var data = {
                  username: this.username,
                  userToken: currentToken,
                  department: this.$department
              }

              this.login(data);
              return currentToken;
          } else {
              console.log('No registration token available. Request permission to generate one.');
              return null;
          }
          }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          })

  }
```
