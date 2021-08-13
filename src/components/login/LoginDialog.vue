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
          <!-- <v-dialog v-model="loader"  persistent max-width="468">
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
                        <v-card-text>Please wait...</v-card-text>
                    </v-col>
                </v-row>
            </v-container>
            </v-card>
        </v-dialog> -->
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import fb from '@/firebase';
export default {
    name: "LoginDialog",
    props: [],
    data() {
        return {
            username: '',
            token: ''
        }
    },
    computed: {
        ...mapState('userModule', {
            userState: state => state.user,
            statusState: state => state.status,
        }),
        ...mapState('contactModule', {
            allUsers: state => state.users
        }),
        loader: function() {
            return this.statusState && this.statusState.loggingIn;
        },
        dialog: function() {
            return (!this.userState || Object.keys(this.userState).length === 0)
                    && !(this.statusState && this.statusState.loggingIn);
        }
    },
    methods: {
        ...mapActions('userModule', ['login']),
        ...mapActions('roomModule', ['addUserToGeneral']),
        async handleLogin(e) {
            if(this.username === "") {
                alert("Ingrese su nombre");
            }
            else {
                await this.getToken();
                
                    
                
                
            }
        },
       
        ...mapActions('userModule', ['login']),
         async getToken(){
            fb.messaging.getToken({vapidKey: "BA8w-EHrjwdNdi8gehISa8Hr5vIsuvv2b0HG4q6XTzF-uvramgDS5QsWSH2wYtsxCWea2RI1BkT6vytdbYRFiVY"})
                .then((currentToken) => {
                if (currentToken) {
                    var data = {
                        username: this.username,
                        userToken: currentToken,
                        departamento: this.$department
                    }
                    
                    this.login(data);
                    return currentToken;
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                    return null;
                }
                }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
                })

        }
    },
    created() {
        
        mapActions('roomModule', ['addUserToGeneral']),
        this.$vueEventBus.$on('mensaje de roomList', () => {
            var data = {
                user: this.userState.ID,
                users: this.allUsers,
            };
            //sacarlo a un metodo que se llame cuando el RoomList nos avisa que finalizo
            this.addUserToGeneral(data);
        });
    }
}
</script>