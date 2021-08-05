<template>
<div>
    
    <div v-on:click="selectRoomHandler" :class="`${status} room`">
        <v-list-item two-line class="px-0">
            <v-avatar size="38" class="mr-2"  :color="this.color" >
                
                <v-icon v-if="!room.isPrivate" dark>mdi-account-circle</v-icon>
               
            </v-avatar>
            <v-list-item-content>
                <v-list-item-title class="body-2">{{room.name}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </div>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import GeneralRoom from './GeneralRoom';
import fb from '@/firebase';
export default {
    name: "Room",
    props: ["room", "active"],
    data() {
        return{
            color: "indigo"
        }

    },
    components: {
        GeneralRoom,
    },
    computed: {
        ...mapState('roomModule', {
            roomID: state => state.activeRoom
        }),
        ...mapState('userModule', {
            userState: state => state.user
        }),
        status() {
            return this.active ? "active" : "";
        }
    },
    methods: {        
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
            this.color = "indigo";
            
        },},
        created() {
            this.$notificacion.$on('NuevoMensaje', ( room, sender) => {
                console.log("escuche un mensaje nuevo")
                var receiver = null;
                fb.firestore.collection("rooms")
                .doc(room)
                .get()
                .then((doc) => {
                if (!doc.exists) {
                    receiver = null
                } else{
                    var roomData = doc.data();
                    roomData.users.forEach(element => {
                        if(element != sender){
                            receiver= element;
                            console.log(receiver + " recibe");
                        }
                    });
                } 
                
                  if (this.userState.ID === receiver){
                      this.color = "green";
                  }
                  else{
                      this.color = "indigo";
                  }
                
                
            })

        });
       
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