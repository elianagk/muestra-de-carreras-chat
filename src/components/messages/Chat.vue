<template>
    <v-list-item :key="chat.id">
        <v-list-item-content>
            <v-list-item-title v-if="senderName != undefined">{{senderName}}</v-list-item-title>
            <v-list-item-subtitle v-html="chat.message"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>            
            <v-list-item-action-text v-text="datetime"></v-list-item-action-text>
        </v-list-item-action>
    </v-list-item>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
import fb from '@/firebase';
export default {
    name: "Chat",
    props: ["chat"],
    data(){
        return {
            usersDA: null
        }
    },
    computed: {
        ...mapState('roomModule', {
            users: state => state.users
        }),
        sender: function() {
            var users = this.usersDA.filter((val) => {
                return val.id == this.chat.senderID;
            });

            return users.length > 0 ? users[0] : {};
        },
        senderName: function() {
            console.log(fb.firestore.collection("users-"+this.$department).get());
            return this.sender ? this.sender.name : "Unknown";
        },
        datetime: function() {
            return moment(this.chat.timestamp.toDate()).format("h:mm a, Do MMM YYYY");
        }
    },
    methods: {
        getUsers() {
           fb.firestore.collection("users-"+this.$department)
            .onSnapshot((snapshot) => {
            const users = [];
            snapshot.forEach((doc) => {
                const user = doc.data();
                user.id = doc.id;
                
                users.push(user);
            });
            console.log(users);
            console.log(this.users);
            this.usersDA = users;
        });
        }
    },
    mounted() {
        var element = document.getElementById("chat-list-container");
        if (typeof(element) != 'undefined' && element != null) {
            element.scrollTop = element.scrollHeight;
        }


    }
}
</script>