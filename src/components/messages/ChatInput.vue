<!--Componente que permite la introduccion de mensajes y su envio-->
<template>
    <v-container class="chat-input">
        <v-textarea
          v-model.trim="message"
          v-on:keyup.enter.exact="submitHandler"
          class="message"
          solo
          no-resize
          rows="2"
          name="message"
          label="Presione 'Enter' para enviar su mensaje"
        ></v-textarea>
    </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "ChatInput",
    data () {
        return {
            message: ''
        }
    },
    /**
     * @function submitHandler envia el mensaje que se ingreso en campo de texto 
     * y lo almacena en la base de datos.
     * 
     * @function resetMessage resetea el campo de texto.
     */
    methods: {
        ...mapActions('roomModule', ['sendMessage']),
        async submitHandler(e) {
            var resp =  null;
            if(this.message.length > 0) {
                const {message} = this;
                
                var data={
                    message: message,
                    department: this.$department
                }
                resp = this.sendMessage(data); 
                
            }   
            this.resetMessage();  
        },
        resetMessage() {
            this.message = '';
        },

    }
}
</script>