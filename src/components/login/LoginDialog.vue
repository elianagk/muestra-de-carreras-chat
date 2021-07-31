<template>
    <div>   
        <v-dialog v-model="dialog" persistent max-width="468">
        <v-card>
            <v-card-title class="headline">Ingrese su nombre</v-card-title>        
            <v-card-actions>
            <input type="text" class="form-control px-4" placeholder="Nombre de usuario" v-model="username">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="handleLogin">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <v-dialog persistent max-width="468">
            <v-card>
            <v-container fill-height fluid>
                <v-row align="center"
                    justify="center">
                    <v-col align="center">
                        <v-progress-circular
                        :size="75"
                        color="primary"                
                        indeterminate
                        ></v-progress-circular>
                    </v-col>
                </v-row>
                <v-row align="center"
                    justify="center">
                    <v-col align="center">
                        <v-card-text>Por favor espere...</v-card-text>
                    </v-col>
                </v-row>
            </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "LoginDialog",
    props: [],
    data() {
        return {
            username: ''
        }
    },
    computed: {
        ...mapState('userModule', {
            userState: state => state.user,
            statusState: state => state.status,
        }),
        loader: function() {
            return this.statusState && this.statusState.loggingIn;
        },
        dialog: function() {
            return (!this.userState || Object.keys(this.userState).length === 0)
                    && !(this.statusState && this.statusState.loggingIn);
        }
    },
    created() {
    },
    methods: {
        ...mapActions('userModule', ['login']),
        async handleLogin(e) {
            if(this.username === "") {
                alert("Ingrese su nombre");
            }
            else {
                this.login(this.username);
            }
        }
    }
}
</script>