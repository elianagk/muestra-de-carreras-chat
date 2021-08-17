import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/sgbu',
    name: 'Chat-Bienestar-Universitario',
    props: { department: "Secretaria-General-Binestar-Universitario", name: "Secretaría General de Binestar Universitario" },
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
    props: { department: "AGRONOMIA", name: "AGRONOMÍA" },
    component: Home
    },
    {
    path: '/oe',
    name: 'Chat-Orientacion-Educacional',
    props: { department: "Departamento-Orientacion-Educacional", name: "Departamento de Orientación Educacional" },
    component: Home
    },
    {
      path: '/bbf',
      name: 'Chat-BBF',
      props: { department: "BIOLOGIA-BIOQUIMICA-FARMACIA", name: "BIOLOGÍA, BIOQUÍMICA y FARMACIA" },
      component: Home
    },
    {
      path: '/administracion',
      name: 'Chat-Administracion',
      props: { department: "CIENCIAS-DE-LA-ADMINISTRACION", name: "CIENCIAS DE LA ADMINISTRACIÓN" },
      component: Home
    },
    {
      path: '/educacion',
      name: 'Chat-Educacion',
      props: { department: "CIENCIAS-DE-LA-EDUCACIÓN", name: "CIENCIAS DE LA EDUCACION" },
      component: Home
    },
    {
      path: '/salud',
      name: 'Chat-Salud',
      props: { department: "CIENCIAS-DE-LA-SALUD", name: "CIENCIAS DE LA SALUD" },
      component: Home
    },
    {
      path: '/dcic',
      name: 'Chat-DCIC',
      props: { department: "CIENCIAS-E-INGENIERIA-DE-COMPUTACION", name: "CIENCIAS E INGENIERÍA DE COMPUTACIÓN"},
      component: Home
    },
    {
      path: '/derecho',
      name: 'Chat-Derecho',
      props: { department: "DERECHO", name: "DERECHO" },
      component: Home
    },
    {
      path: '/economia',
      name: 'Chat-Economia',
      props: { department: "Departamento-Economia", name: "Departamento de Economía" },
      component: Home
    },
    {
      path: '/fisica',
      name: 'Chat-Fisica',
      props: { department: "FISICA", name: "FÍSICA" },
      component: Home
    },
    {
      path: '/geografia',
      name: 'Chat-Geografia',
      props: { department: "GEOGRAFIA-TURISMO", name: "GEOGRAFÍA Y TURISMO" },
      component: Home
    },
    {
      path: '/geologia',
      name: 'Chat-Geologia',
      props: { department: "GEOLOGIA", name: "GEOLOGÍA" },
      component: Home
    },
    {
      path: '/humanidades',
      name: 'Chat-Humanidades',
      props: { department: "Departamento-Humanidades", name: "Departamento de Humanidades" },
      component: Home
    },
    {
      path: '/ingenieria',
      name: 'Chat-Ingenieria',
      props: { department: "Departamento-Ingenieria", name: "Departamento de Ingeniería" },
      component: Home
    },
    {
      path: '/ingelectrica',
      name: 'Chat-Electrica',
      props: { department: "Departamento-Ingeniería-Eléctrica-y-Computadoras", name: "Departamento de Ingeniería Eléctrica y de Computadoras" },
      component: Home
    },
    {
      path: '/ingquimica',
      name: 'Chat-INGQuimica',
      props: { department: "INGENIERIA-QUIMICA", name: "INGENIERÍA QUÍMICA" },
      component: Home
    },
    {
        path: '/matematica',
        name: 'Chat-Matematica',
        props: { department: "Departamento-Matematica", name: "Departamento de Matemática" },
        component: Home
      },
      {
        path: '/quimica',
        name: 'Chat-Quimica',
        props: { department: "QUIMICA", name: "QUÍMICA" },
        component: Home
      },
    ]

    const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
      })
      
      export default router