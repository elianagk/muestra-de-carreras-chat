import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../Home.vue'

Vue.use(VueRouter);

const routes = [
    {
      path: '/dcic',
      name: 'Chat-DCIC',
      props: { department: "DCIC" },
      component: Home
    },
    {
        path: '/matematica',
        name: 'Chat-Matematica',
        props: { department: "Matematica" },
        component: Home
      },
    ]

    const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
      })
      
      export default router