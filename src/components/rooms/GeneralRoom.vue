<template>
 <div >
        <v-list-item two-line class="px-0">
            <v-avatar size="38" class="mr-2" color="indigo">
                <v-icon v-if="!room.isPrivate" dark>mdi-account-circle</v-icon>
            </v-avatar>
           
                <v-list-item-title class="body-2">General</v-list-item-title>
            
        </v-list-item>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "GeneralRoom",
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
    created: {
        ...mapActions('roomModule', ['createChatRoom', 'generalRoom', 'clearRoom']),
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
                        users: this.allUsers
                    };
                    this.generalRoom(data);
                }
            }
            this.clearSelection();
            
        },
        clearSelection() {
            this.userIDs = [];
        }
    }
}
</script>