<!--Componente que permite visualizar todos los mensajes de la sala-->
<template>
    <div class="chat-list">        
        <ChatLoader v-if="!isLoaded" />
        <v-list v-if="isLoaded">
            <Chat v-for="chat in chats" :key="chat.id" :chat="chat" />
        </v-list>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import fb from '@/firebase';
import ChatLoader from './ChatLoader';
import Chat from './Chat';
export default {
    name: "ChatList",
    components: {
        ChatLoader, Chat
    },
    data() {
        return {
            isLoaded: false,
            chats: []
        }
    },
    computed: {
        ...mapState('roomModule', {
            roomID: state => state.activeRoom
        })
    },
    /**
     * Obtiene todo el historial de mensajes de esa sala
     */
    created() {
        if(this.roomID) {            
            fb.firestore.collection("rooms-"+this.$department).doc(this.roomID).collection("messages").orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => {
                const newChats = [];
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === "added") {
                        var chat = {
                            id: change.doc.id,
                            message: change.doc.data().message,
                            timestamp: change.doc.data().timestamp,
                            senderID: change.doc.data().sender
                        };
                        newChats.push(chat);
                    }
                });
                
                this.chats = this.chats.concat(newChats);
                this.isLoaded = true;
            });
        }
    },
    /**
     * Inicializa la componente
     */
    mounted() {
        var element = document.getElementById("chat-container");
        function resize() {
            var bodyheight = window.innerHeight - 64;
            
            if (typeof(element) != 'undefined' && element != null) {
                element.style.height = bodyheight + "px";
            }
        }
        
        window.addEventListener("resize", resize);
        resize();  
    }
}
</script>
<style scoped>
.chat-list {
    height: inherit;
}
</style>