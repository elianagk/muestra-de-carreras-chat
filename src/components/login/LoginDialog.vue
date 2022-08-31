<!--Componente que define la visualización del inicio de sesión en la interfaz-->
<template>
    <div class="container-fluid">
        <v-dialog v-model="dialog" class="mx-auto" persistent max-width="468">
        <v-card>
            <v-card-title class="headline">Ingrese su nombre</v-card-title>   
            <v-card-text>
            <div class="row">  
                <div class="col-12 col-sm-8">
                    <input type="text" class="form-control col-12" placeholder="Nombre de usuario" v-model="username">
                </div>
                <div class="col-12 col-sm-4">
                    <v-btn class="success" text @click="handleLogin">Confirmar</v-btn>
                </div>
            </div>
            <div> 
                <small style="color:red">Para entrar debe permitir las notificaciones</small>
            </div>
            </v-card-text>
        </v-card>
        </v-dialog>
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
    /**
     * @function mapActions Se inicializa la sesion del usuario y se lo agrega al chat general.
     * @param vapidKey leer Readme para cambiar el token necesario
     */
    methods: {
        ...mapActions('userModule', ['login']),
        ...mapActions('roomModule', ['addUserToGeneral']),
        async handleLogin(e) {
            if(this.username === "" || !this.username.trim()) {
                alert("Ingrese su nombre");
            }
            else {
                await this.getToken();
            }
        },
       
        ...mapActions('userModule', ['login']),
         async getToken(){
            fb.messaging.getToken({vapidKey: "BAcE-tMqzQymd3SVoFAw7FBw9ki83ZpDiXRSjPBuB2VmUjurR1407SzUCLB4TbTpKnDNZAKh5p_qxRXxbIYxh6s"})
                .then((currentToken) => {
                if (currentToken) {
                    var data = {
                        username: this.username,
                        userToken: currentToken,
                        department: this.$department
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
                department: this.$department
            };
            this.addUserToGeneral(data);
        });
    }
}
</script>