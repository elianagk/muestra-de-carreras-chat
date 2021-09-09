import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../Home.vue'

Vue.use(VueRouter);

const routes = [
    {
      path: '/cfp',
      name: 'Chat-Centro-Formacion-Profesional',
      props: { department: "CENTRO-DE-FORMACION-PROFESIONAL", name: "Centro de formación Profesional 403" },
      component: Home
    },
    {
      path: '/dcic',
      name: 'Chat-DCIC',
      props: { department: "CIENCIAS-E-INGENIERIA-DE-COMPUTACION", name: "Ciencias e Ingienería de la Computación"},
      component: Home
    },
    {
      path: '/derecho',
      name: 'Chat-Derecho',
      props: { department: "DERECHO", name: "Derecho" },
      component: Home
    },
    {
      path: '/economia',
      name: 'Chat-Economia',
      props: { department: "Departamento-Economia", name: "Economía" },
      component: Home
    },
    {
      path: '/fisica',
      name: 'Chat-Fisica',
      props: { department: "FISICA", name: "Física" },
      component: Home
    },
    {
      path: '/geologia',
      name: 'Chat-Geologia',
      props: { department: "GEOLOGIA", name: "Geología" },
      component: Home
    },
    {
      path: '/humanidades',
      name: 'Chat-Humanidades',
      props: { department: "Departamento-Humanidades", name: "Humanidades" },
      component: Home
    },
    {
      path: '/ingenieria',
      name: 'Chat-Ingenieria',
      props: { department: "Departamento-Ingenieria", name: "Ingeniería" },
      component: Home
    },
    {
      path: '/ingelectrica',
      name: 'Chat-Electrica',
      props: { department: "Departamento-Ingeniería-Eléctrica-y-Computadoras", name: "Ingeniería Eléctrica y de Computadoras" },
      component: Home
    },
    {
      path: '/ingquimica',
      name: 'Chat-INGQuimica',
      props: { department: "INGENIERIA-QUIMICA", name: "Ingeniería Química" },
      component: Home
    },
    ]

    const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
      })
      
      export default router