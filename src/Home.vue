<!--Componente principal que determina la estructura del chat-->
<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      clipped-right
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-app-bar-nav-icon class="mr-2" @click.stop="leftdrawer = !leftdrawer"></v-app-bar-nav-icon>
        <v-img
          :src="require('./assets/boton-texto-29.png')"
          alt="Chat Muestra Carrera UNS"
          class="shrink mr-2 mt-2"
          contain
          transition="scale-transition"
          width="60"
        />
        <h4 class="myText">{{this.name}}</h4>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightdrawer = !rightdrawer">
          <v-icon>contacts</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
        v-model="leftdrawer"
        app
        clipped
        light
    >
        <v-list
            dense
            nav
            class="py-0"
            >
            <Avatar />
            <div class="overline mt-2 mb-2">Chats recientes</div>
            <RoomList v-if="!isRequiresLogin"/>
        </v-list>
        
    </v-navigation-drawer>

    <v-navigation-drawer
        v-model="rightdrawer"
        app
        clipped
        right
        light
    >
      <div class="contacts-container">
          <h3 class="overline">Todos los contactos</h3>

          <v-text-field
              v-model="search"
              outlined
              dense
              label="Buscar"
              prepend-inner-icon="search"
              class="mt-2"
          ></v-text-field>
          <ContactList :searchInput="search"/>            
      </div>
    </v-navigation-drawer>

    <LoginDialog />

    <v-main>
      <MessageContainer />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LoginDialog from './components/login/LoginDialog'
import MessageContainer from './components/messages/MessageContainer'
import Avatar from './components/Avatar'
import RoomList from './components/rooms/RoomList'
import ContactList from './components/contacts/ContactList.vue'
import "firebase/messaging";
import Vue from 'vue'
import firebase from "firebase/app";
export default {
  name: 'App',
  components: {
    LoginDialog,
    MessageContainer,
    Avatar, 
    RoomList,
    ContactList
  },
  props: ["department", "name"],
  computed: {
    ...mapState('userModule', {
        userState: state => state.user
    }),
    ...mapState('contactModule', {
            allUsers: state => state.users
        }),
    isRequiresLogin: function() {
        return !this.userState || Object.keys(this.userState).length === 0;
    }, 
  },
  created() {
    Vue.prototype.$department = this.department;
    this.messaging.onMessage(payload => {
      console.log("notificaciones?");
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          tag: "Dummy"
        });
      });
  },
  data: () => ({
    leftdrawer: null,
    rightdrawer: null,
    search: '',
    general: false,
    messaging: firebase.messaging()
  }),
};
</script>
<style scoped>
  .contacts-container {
      padding: 12px 18px;
  }
  @media screen and (max-width: 376px) {
  .myText {
    font-size: 12px;
  }
  @media screen and (min-width: 375px) {
  div.example {
    font-size: 16px;
  }
}
}
</style>