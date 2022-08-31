<!--Lista los chats activos de cada usuario. Incluye chat general y chats individuales-->
<template>
    <div class="room-list">        
        <v-skeleton-loader
            v-if="!isLoaded"
            ref="skeleton"
            type="list-item-avatar-two-line"
            class="mx-auto"
        >
        </v-skeleton-loader>
        <GeneralRoom v-if="this.finish" :room="this.generalRoom" />
        <Room v-for="room in sortedRooms" :key="room.id" :room="room" :active="room.active"  />  
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Room from './Room';
import GeneralRoom from './GeneralRoom'
import fb from '@/firebase';
export default {
    name: "RoomList",
    components: {
        Room,
        GeneralRoom
    },
    data() {
        return {
            isLoaded: false,
            rooms: {},
            generalRoom: null,
            finish: false,
        }
    },
    /**
     * @function sortedRooms Crea una lista con los chats, indentificando activos e inactivos.
     * Los nombres se componen de los nombres de cada usuario.
     */
    computed: {
        ...mapState('userModule', {
            userState: state => state.user
        }),
        ...mapState('contactModule', {
            contacts: state => state.users
        }),
        ...mapState('roomModule', {
            roomID: state => state.activeRoom
        }),
        sortedRooms() {
            var activeRooms = [];
            var inactiveRooms = [];
            var rooms = this.rooms;
            
            for(var i = 0; i < rooms.length; i++) {
                var room = rooms[i];
                // Preprocessing: Build the room name and photo
                var names = [];
                var contacts = this.contacts.filter(val => {
                    // Remove self and filter contacts that are in the room
                    return this.userState.ID != val.id && room.users.indexOf(val.id) >= 0;
                });
                
                for(var j = 0; j < contacts.length; j++) {
                    names.push(contacts[j].name);                        
                }
                room.name = names.join(', ');
                // For active room
                if(room.id == this.roomID) {
                    room.active = true;
                    activeRooms.push(room);
                } else {
                    // For inactive room
                    room.active = false;
                    inactiveRooms.push(room);
                }
            }
            return [...activeRooms, ...inactiveRooms];
        },
       
    },
    methods: {
        sendMessageToLogin() {
            this.$vueEventBus.$emit('mensaje de roomList');
        },
    },
    /**
     * Obtiene toda la informacion necesaria de la base de datos para poder crear la lista de chats.
     */
    created() {
        // Get all the individual rooms
        fb.firestore.collection("rooms-"+this.$department)
        .where("users", "array-contains", this.userState.ID)
        .onSnapshot((snapshot) => {
            const rooms = [];
            snapshot.forEach((doc) => {
                const room = doc.data();
                room.id = doc.id;
                if(room.isPrivate)
                    rooms.push(room);
                
            });
            this.rooms = rooms;
        });
        // Get the general if exist
        fb.firestore.collection("rooms-"+this.$department)
        .where("isPrivate", "==", false)
        .onSnapshot((snapshot) => {
            const rooms = [];
            snapshot.forEach((doc) => {
                const room = doc.data();
                room.id = doc.id;
                this.generalRoom = room;
                this.generalRoom.name = "General";
                
            });

            if(this.generalRoom === null) {
                this.generalRoom = null;
            }
            this.isLoaded = true;
            this.finish = true;
            this.sendMessageToLogin();
        });    
    }
}
</script>