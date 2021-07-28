<template>
 <div >
       
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
                

                if(resp.success) {
                    // Clear the room selection first
                    this.clearRoom();
                    // Select the room again
                    var data = {
                        room: resp.roomID,
                        users: this.allUsers,
                        currentUser: null
                    };
                    this.generalRoom(data);
                }
            }
            
            
        },
        
    },
     created() {
         console.log(" created");
        this.handleCreateChat();
        
     } 
}
</script>