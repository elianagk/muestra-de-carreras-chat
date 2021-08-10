<template>
    <div id="chat-container" class="chat-container">
        <div id="name-chat" class="px-2 py-2 font-weight-bold">
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
            const  roomData = await fb.firestore.collection("rooms").doc(this.roomID).get();
                if (!roomData.data().isPrivate){
                    this.name = "General";
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
    height: calc(100% - 120px);  
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

</style>