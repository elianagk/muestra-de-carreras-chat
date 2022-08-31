<!--Componente que define un unico mensaje, incluye nombre de usuario, mensaje y timestamps-->
<template>
    <v-list-item :key="chat.id">
        <v-list-item-content>
            <v-list-item-title>{{senderName}}</v-list-item-title>
            <v-list-item-subtitle v-html="chat.message" v-linkified></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>            
            <v-list-item-action-text v-text="datetime"></v-list-item-action-text>
        </v-list-item-action>
    </v-list-item>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
export default {
    name: "Chat",
    props: ["chat"],
    /**
     * @param sender -> Obtiene de la base de datos el usuario que envió el mensaje
     * @param senderName -> Obtiene el nombre del usuario que envió el mensaje
     * @param datetime -> Obtiene la fecha del mensaje enviado
     */
    computed: {
        ...mapState('roomModule', {
            users: state => state.users
        }),
        sender: function() {
            var users = this.users.filter((val) => {
                return val.id == this.chat.senderID;
            });
            return users.length > 0 ? users[0] : {};
        },
        senderName: function() {
            return this.sender ? this.sender.name : "Unknown";
        },
        datetime: function() {
            return moment(this.chat.timestamp.toDate()).format("h:mm a, Do MMM YYYY");
        }
    },
    /**
     * Inicializa la componente
     */
    mounted() {
        var element = document.getElementById("chat-list-container");
        if (typeof(element) != 'undefined' && element != null) {
            element.scrollTop = element.scrollHeight;
        }
    }
}
</script>
<style scoped>
.v-list-item__title, .v-list-item__subtitle {
    flex: 1 1 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}
</style>