import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/sgbu',
    name: 'Chat-Bienestar-Universitario',
    props: { department: "Secretaria-General-Bienestar-Universitario", name: "Secretaría General de Bienestar Universitario" },
    component: Home
    },
    {
      path: '/pens',
      name: 'Chat-Profesorados-Escuela-Normal-Superior',
      props: { department: "Profesorados-Escuela-Normal-Superior", name: "Profesorados Escuela Normal Superior" },
      component: Home
      },
    {
    path: '/agronomia',
    name: 'Chat-Agronomia',
    props: { department: "AGRONOMIA", name: "Agronomía" },
    component: Home
    },
    {
    path: '/doe',
    name: 'Chat-DOE',
    props: { department: "DOE", name: "Departamento de Orientación Educacional" },
    component: Home
    },
    {
      path: '/biologia',
      name: 'Chat-Biologia',
      props: { department: "BIOLOGIA", name: "Biologia, Bioquimica y Farmacia" },
      component: Home
    },
    {
      path: '/administracion',
      name: 'Chat-Administracion',
      props: { department: "CIENCIAS-DE-LA-ADMINISTRACION", name: "Ciencias de la Administración" },
      component: Home
    },
    {
      path: '/isft',
      name: 'Chat-ISFT',
      props: { department: "INSTITUTO-SUPERIOR-FORMACION-TECNICA", name: "Instituto Superior de Formación Técnica Nª191" },
      component: Home
    },
    {
      path: '/spec',
      name: 'Chat-SPEC',
      props: { department: "SECRETARIA-POSGRADO-EDUCACION-CONTINUA", name: "Secretaria de Posgrado y Eduación Continua" },
      component: Home
    },
    {
      path: '/comercio',
      name: 'Chat-Comercio',
      props: { department: "ESCUELA-DE-COMERCIO", name: "Escuela Superior de Comercio" },
      component: Home
    },
    {
      path: '/salud',
      name: 'Chat-Salud',
      props: { department: "CIENCIAS-DE-LA-SALUD", name: "Ciencias de la Salud" },
      component: Home
    },
    {
      path: '/educacion',
      name: 'Chat-Educacion',
      props: { department: "CIENCIAS-DE-LA-EDUCACION", name: "Ciencias de la Educación" },
      component: Home
    },
    {
      path: '/unsregion',
      name: 'Chat-UNS-Region',
      props: { department: "UNS-EN-LA-REGION", name: "UNS en la Región" },
      component: Home
    },
    
    ]

    const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
      })
      
      export default router