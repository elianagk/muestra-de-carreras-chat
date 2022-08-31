<!--Componente que identifica al usuario-->
<template>
    <div>
        <v-skeleton-loader
            v-if="isRequiresLogin"
            type="list-item-avatar-two-line"
            class="mx-auto"
        ></v-skeleton-loader>
            <v-list-item v-if="!isRequiresLogin" two-line class="px-0">
                <v-list-item-content>
                    <v-list-item-title>{{name}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        <v-divider></v-divider>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "Avatar",
    data() {
        return {            
        }
    },
    computed: {
        ...mapState('userModule', {
            userState: state => state.user
        }),
        name: function() {
            return this.userState ? this.userState.Name : "";
        },
        isRequiresLogin: function() {
            return !this.userState || Object.keys(this.userState).length === 0;
        }
    },
}
</script>
<style scoped>
    .item {
        min-height: 0;
    }
</style>