import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    
    
    path: '/doe',
    name: 'Chat-DOE',
    props: { department: "DOE", name: "Departamento de Orientación Educacional" },
    component: Home
    },
    
    
    ]

    const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
      })
      
      export default router