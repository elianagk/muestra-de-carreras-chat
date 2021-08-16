import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/agronomia',
    name: 'Chat-Agronomia',
    props: { department: "Agronomia" },
    component: Home
    },
    {
      path: '/bbf',
      name: 'Chat-BBF',
      props: { department: "BIOLOGÍA-BIOQUÍMICA-FARMACIA" },
      component: Home
    },
    {
      path: '/administracion',
      name: 'Chat-Administracion',
      props: { department: "CIENCIAS-DE-LA-ADMINISTRACIÓN" },
      component: Home
    },
    {
      path: '/educacion',
      name: 'Chat-Educacion',
      props: { department: "CIENCIAS-DE-LA-EDUCACIÓN" },
      component: Home
    },
    {
      path: '/salud',
      name: 'Chat-Salud',
      props: { department: "CIENCIAS-DE-LA-SALUD" },
      component: Home
    },
    {
      path: '/dcic',
      name: 'Chat-DCIC',
      props: { department: "CIENCIAS-E-INGENIERÍA-DE-COMPUTACIÓN" },
      component: Home
    },
    {
      path: '/derecho',
      name: 'Chat-Derecho',
      props: { department: "DERECHO" },
      component: Home
    },
    {
      path: '/economia',
      name: 'Chat-Economia',
      props: { department: "ECONOMIA" },
      component: Home
    },
    {
      path: '/fisica',
      name: 'Chat-Fisica',
      props: { department: "FISICA" },
      component: Home
    },
    {
      path: '/geografia',
      name: 'Chat-Geografia',
      props: { department: "GEOGRAFIA-TURISMO" },
      component: Home
    },
    {
      path: '/geologia',
      name: 'Chat-Geologia',
      props: { department: "GEOLOGIA" },
      component: Home
    },
    {
      path: '/humanidades',
      name: 'Chat-Humanidades',
      props: { department: "HUMANIDADES" },
      component: Home
    },
    {
      path: '/ingenieria',
      name: 'Chat-Ingenieria',
      props: { department: "INGENIERIA" },
      component: Home
    },
    {
      path: '/electronica',
      name: 'Chat-Electrica',
      props: { department: "INGENIERIA-ELECTRONICA-Y-DE-COMPUTADORAS" },
      component: Home
    },
    {
      path: '/ingquimica',
      name: 'Chat-INGQuimica',
      props: { department: "INGENIERIA-QUIMICA" },
      component: Home
    },
    {
        path: '/matematica',
        name: 'Chat-Matematica',
        props: { department: "Matematica" },
        component: Home
      },
      {
        path: '/quimica',
        name: 'Chat-Quimica',
        props: { department: "QUIMICA" },
        component: Home
      },
    ]

    const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
      })
      
      export default router