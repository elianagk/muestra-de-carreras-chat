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
    methods: {
        ...mapActions('roomModule', ['sendMessage']),
        async submitHandler(e) {
            var resp =  null;
            if(this.message.length > 0) {
                const {message} = this;
                resp = this.sendMessage({message}); 
                
                
            }   
            this.resetMessage();  

            messaging.getToken({vapidKey: "BA8w-EHrjwdNdi8gehISa8Hr5vIsuvv2b0HG4q6XTzF-uvramgDS5QsWSH2wYtsxCWea2RI1BkT6vytdbYRFiVY"})
            .then((currentToken) => {
                if (currentToken) {
                    console.log('client token', currentToken)
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
                }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
                })

            // resp.then(value => this.notifyMessage(value)) ;   
            //disparar evento luego de llamar a submitHandler   
        },
        resetMessage() {
            this.message = '';
        },
        
        
    }
}
</script>