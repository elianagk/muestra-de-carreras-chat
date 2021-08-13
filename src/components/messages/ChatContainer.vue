<template>
    <div id="chat-container" class="chat-container">
        <div id="chat-name" class="overline py-3 myClass">
            {{this.name}}
        </div>
        <div id="chat-list-container" class="chat-list-container">
            <ChatList />
        </div>
        <div class="chat-input-container">
            <ChatInput />
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import fb from '@/firebase';
import ChatInput from './ChatInput';
import ChatList from './ChatList';
export default {
    name: "ChatContainer",
    data() {
        return{
            name: ''
        }
    },
    components: {
        ChatInput, ChatList
    },
    computed: {
        ...mapState('roomModule', {
            roomID: state => state.activeRoom
        })
    },
    created() {
        // Get room name
       this.roomName()
    },
    methods:{
         roomName: async function(e){
            if(this.roomID) {            
            const  roomData = await fb.firestore.collection("rooms-"+this.$department).doc(this.roomID).get();
                if (!roomData.data().isPrivate){
                    this.name = "General";
                }
                else {
                    this.name = "Privado";
                }
            
        }
        }
    }
}
</script>
<style scoped>
.chat-container {
    width: 100%;
}
.chat-list-container {
    height: calc(100% - 170px);  
    width: inherit;
    overflow-y: auto;
}
.chat-input-container {
    background-color: #eeeeee;
    width: inherit;
    height: 120px;
    position: absolute;
    bottom: 0;
}
.myClass {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    width: 97%;
    margin: 0 auto;
    height: 50px;
}
</style>