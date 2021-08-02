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
            <div class="overline mt-2 mb-2">Recent chats</div>
            <RoomList v-if="!isRequiresLogin && existGeneral" />
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
          <h3 class="overline">All contacts</h3>

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
import fb from '@/firebase'
export default {
  name: 'App',
  components: {
    LoginDialog,
    ContactContainer,
    MessageContainer,
    Avatar, 
    RoomList,
    ContactList
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
    
    existGeneral: function(){
    //   var ids = [];
    //   this.allUsers.forEach(element => {
    //     ids.push(element.id);
    //   });
    //     fb.firestore.collection("rooms")
    //     .where("users", "array-contains", ids)
    //     .get()
    //     .then(snapshot => {
    //             if (snapshot.empty) {
    //               console.log("false");
    //                 return false;
    //             }  else{
    //               console.log("true");
    //               return true;
    //             }
    // });
     return fb.firestore.collection("rooms")
            .where("isPrivate", "==", false)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    return {success: false, error: "No chat room(s)"};
                }  
                var roomId;
                var success = false;
                for(var i = 0; i < snapshot.docs.length; i++) {
                    // Workaround as multiple array-contains filter is not allowed
                    console.log(snapshot.docs[i].data().users);
                    if(this.allUsers.every(user => snapshot.docs[i].data().users.includes(user))) {
                        roomId = snapshot.docs[i].id;
                        success = true;
                        break;
                    
                    }
                    
                }
                return {success: success, roomID: roomId};
            });
  },
  
},
data: () => ({
    leftdrawer: null,
    rightdrawer: null,
    search: ''
  }),
};
</script>
<style scoped>
    .contacts-container {
        padding: 12px 18px;
    }
</style>
