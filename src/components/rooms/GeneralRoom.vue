<!--Espacio de chat general para cada departamento-->
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
    props: ['room'],
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
    /**
     * @param allUsers referencia a todos los usuarios en la lista de contactos del departamento.
     * @function handleCreateChat inicializa el chat general, agregando todos los usuarios que corresponden al departamento.
     * Si el chat general se inicializa de cero, se le agrega toda la información, asignandole un ID nuevo.
     * Si el chat ya estaba creado, solo se le agrega la nueva información, los nuevos usuarios.
     * @function selectRoomHandler es usado para seleccionar el chat general.
     * Si el usuario se encuentra en un chat inidividual y desea volver al general, se utiliza esta funcion.
     */
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
            var roomReturn;
            if(this.room == null){
                if(userIDs.length >= 0) {   
                    var data = {
                        userIDs: userIDs,
                        department: this.$department
                    }             
                const resp = await this.createChatRoom(data);
                    if(resp.success) {
                        // Clear the room selection first
                        this.clearRoom();
                        // Select the room again
                        var data = {
                            room: resp.roomID,
                            users: this.allUsers,
                            department: this.$department
                        };
                        this.generalRoom(data);
                        roomReturn = resp.room;
                    }
                }
                roomReturn = null;
            }else{
                var data = {
                        room: this.room.id,
                        users: this.allUsers,
                        department: this.$department
                    };
                    this.generalRoom(data);
                roomReturn = this.room;
            }
            return roomReturn;
 
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
                    department: this.$department
                };
                this.generalRoom(data);
            }
            
        }       
    },
    watch: { 
      	room: {
            deep: true,
            immediate: true,
            handler: function(newVal, oldVal) {
                if(newVal == null) {
                    this.handleCreateChat();
                }
            }
        }
    },
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