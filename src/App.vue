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
          :src="require('./assets/logo.png')"
          alt="Real time chat"
          class="shrink mr-2"
          contain
          transition="scale-transition"
          width="30"
        />
        <h4>Chat -NOMBRE STAND-</h4>
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
            <RoomList v-if="!isRequiresLogin "/>
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
              label="Search"
              prepend-inner-icon="search"
              class="mt-2"
          ></v-text-field>
          <ContactList :searchInput="search" />            
      </div>
    </v-navigation-drawer>

    <LoginDialog />

    <v-content>
      <MessageContainer />
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LoginDialog from './components/login/LoginDialog'
import ContactContainer from  './components/contacts/ContactContainer'
import MessageContainer from './components/messages/MessageContainer'
import Avatar from './components/Avatar'
import RoomList from './components/rooms/RoomList'
import ContactList from './components/contacts/ContactList'
import  fb  from './firebase'; 
import "firebase/messaging";
import firebase from "firebase/app";

export default {
  name: 'App',
  components: {
    LoginDialog,
    ContactContainer,
    MessageContainer,
    Avatar, 
    RoomList,
    ContactList,
  },
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
    this.messaging.onMessage(payload => {
      console.log(payload);
        const notif = new Notification(payload.notification.title, {
          body: payload.notification.body,
          tag: "Dummy"
        });
        console.log(notif);
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
</style>
