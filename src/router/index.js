import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../Home.vue'

Vue.use(VueRouter);

const routes = [
    {
      path: '/geografia',
      name: 'Chat-Geografia',
      props: { department: "GEOGRAFIA-TURISMO", name: "Geografía y Turismo" },
      component: Home
    },
    {
        path: '/matematica',
        name: 'Chat-Matematica',
        props: { department: "Departamento-Matematica", name: "Matemática" },
        component: Home
      },
      {
        path: '/quimica',
        name: 'Chat-Quimica',
        props: { department: "QUIMICA", name: "Química" },
        component: Home
      },
      {
        path: '/sga',
        name: 'Chat-SGA',
        props: { department: "SECRETARIA-GENERAL-ACADEMICA", name: "Secretaria General Académica" },
        component: Home
      },
      {
        path: '/salesiana',
        name: 'Chat-Salesiana',
        props: { department: "UNIVERSIDAD-SALESIANA", name: "Universidad Salesiana" },
        component: Home
      },
      {
        path: '/juan23',
        name: 'Chat-Juan',
        props: { department: "JUAN-XXIII", name: "Juan XXIII" },
        component: Home
      },
      {
        path: '/utn',
        name: 'Chat-UTN',
        props: { department: "UNIVERSIDAD-TECNOLOGICA-NACIONAL", name: "Universidad Tecnológica Nacional" },
        component: Home
      },
      {
        path: '/upso',
        name: 'Chat-UPSO',
        props: { department: "UNIVERSIDAD-PROVINCIAL-DEL-SUDOESTE", name: "Universidad Provincial del Sudoeste" },
        component: Home
      },
      {
        path: '/ieme',
        name: 'Chat-IEME',
        props: { department: "INSTITUTO-EZEQUIEL-MARTINEZ-ESTRADA", name: "Instituto Ezequiel Martinez Estrada" },
        component: Home
      },
      {
        path: '/ucalp', 
        name: 'Chat-UCALP',
        props: { department: "UNIVERSIDAD-CATOLICA-DE-LA-PLATA", name: "Universidad Católica de la Plata" },
        component: Home
      },
      {
        path: '/isfd',
        name: 'Chat-FormacionDocente',
        props: { department: "INSTITUTO-SUPERIOR-DE-FORMACION-DOCENTE", name: "Instituto Superior de Formación Docente Nª86" },
        component: Home
      },
      {
        path: '/ifctma',
        name: 'Chat-MariaAuxiliadora',
        props: { department: "Maria-Auxiliadora", name: "Instituto de Formación Docente y Técnica María Auxiliadora" },
        component: Home
      },
    ]

    const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
      })
      
      export default router