<template>
    <div v-on:click="selectRoomHandler" :class="`${status} room`">
        <v-list-item two-line class="px-0">
            <v-avatar size="38" class="mr-2" color="indigo">
               
                
            </v-avatar>
            <span handleCreateChat/>
            <v-list-item-content>
                <v-list-item-title class="body-2">GeneralRoom</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>




<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "GeneralRoom",
    props: ["room", "active"],
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
        ...mapState('roomModule', {
            roomID: state => state.activeRoom
        }),
        status() {
            return this.active ? "active" : "";
        },
        userValues() {
            const values = [];
            if(this.user) {
                for(var i = 0; i < this.allUsers.length; i++) {
                    var user = this.allUsers[i];
                    var value = {text: user.name, value: user.id};
                    values.push(value);
                    
                }
            }            
            
            return values;
        }
    },
    methods: {
        ...mapActions('roomModule', ['createChatRoom', 'selectRoom', 'clearRoom']),
        async handleCreateChat(e) {
            const {userIDs} = this;
            if(userIDs.length > 0) {                
                const resp = await this.createChatRoom({userIDs});
                if(resp.success) {
                    // Clear the room selection first
                    this.clearRoom();
                    // Select the room again
                    var data = {
                        room: resp.roomID,
                        targetUser: null,
                        currentUser: null
                    };
                    this.selectRoom(data);
                }
            }
            this.clearSelection();
            this.roomDialog = false;
        },
        clearSelection() {
            this.userIDs = [];
        },
        ...mapActions('roomModule', ['selectRoom', 'clearRoom']),
        selectRoomHandler: function(e) {
            if(this.roomID != this.room.id) {
                // Clear the room selection first
                this.clearRoom();
                // Select the room again
                var data = {
                    room: this.room.id,
                    targetUser: null,
                    currentUser: null
                };
                this.selectRoom(data);
            }
            
        }
    }
}
</script>