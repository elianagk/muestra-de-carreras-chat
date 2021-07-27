<template>
    <v-container fluid class="fill-height message-container" v-if="!isRequiresLogin">
        <v-row
            justify="center"
            align="center"
            v-if="!isRoomSelected"
        >
            <v-col class="col-xs-12"><GeneralRoom /></v-col>
        </v-row>
        <ChatContainer v-if="isRoomSelected" />
        
    </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import GeneralRoom from '../rooms/GeneralRoom';
import ChatContainer from './ChatContainer';
export default {
    name: "MessageContainer",
    components: {
        ChatContainer, GeneralRoom
    },
    computed: {
        ...mapState('userModule', {
            userState: state => state.user
        }),
        ...mapState('roomModule', {
            roomID: state => state.activeRoom
        }),
        isRequiresLogin: function() {
            return !this.userState || Object.keys(this.userState).length === 0;
        },
        isRoomSelected: function() {
            return this.roomID;
        }
    },
    methods: {
        ...mapActions('roomModule', ['clearRoom'])
    },
    created() {
        // Clear room selection
        this.clearRoom();
    }
}
</script>
<style scoped>
.message-container {
    padding: 0;
}
</style>