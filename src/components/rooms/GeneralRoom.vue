<template>
 <div >
        <div v-on:click="selectRoomHandler" class="room" >
        <v-list-item two-line class="px-0">
            <v-avatar size="38" class="mr-2" color="indigo">
                <v-icon  dark>mdi-account-circle</v-icon>
            </v-avatar>
            <v-list-item-content>
                <v-list-item-title class="body-2">General</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "GeneralRoom",
    props: ["room"],
    data() {
        return {
            userIDs: [],
        }
    },
    computed: {
        ...mapState('contactModule', {
            allUsers: state => state.users
        }),
        ...mapState('userModule', {
            user: state => state.user
        }),
        
    },
    methods: {
        ...mapActions('roomModule', ['createChatRoom', 'generalRoom', 'clearRoom']),
        async handleCreateChat(e) {
            const values = [];
            
            for(var i = 0; i < this.allUsers.length; i++) {
                var user = this.allUsers[i];
                if(user.id != this.user.ID) {
                    var value = user.id;
                    values.push(value);
                }
            }
            const userIDs = values;
            if(userIDs.length > 0) {                
                const resp = await this.createChatRoom({userIDs});
                console.log( " Room ID GR " + resp.roomID);

                if(resp.success) {
                    // Clear the room selection first
                    this.clearRoom();
                    // Select the room again
                    var data = {
                        room: this.room.id,
                        users: this.allUsers,
                    };
                    this.generalRoom(data);
                }
            }
            
            
        },
        ...mapActions('roomModule', ['selectRoom', 'clearRoom']),
        selectRoomHandler: function(e) {
            if(this.roomID != this.room.id) {
                // Clear the room selection first
                this.clearRoom();
                // Select the room again
                var data = {
                    room: this.room.id,
                    users: this.allUsers,
                };
                this.generalRoom(data);
            }
            
        }
        
    },
     created() {
        console.log(" created");
         
         this.handleCreateChat();
        // console.log(this.room.name + " creat room");
        
     } 
}
</script>
<style scoped>
.room {
    cursor: pointer;
}
.room.active, .room:hover {
    background-color: #eeeeee;
}
</style>