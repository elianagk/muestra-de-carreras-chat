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
    props: { department: "AGRONOMIA", name: "Agronomía" },
    component: Home
    },
    {
    path: '/doe',
    name: 'Chat-Orientacion-Educacional',
    props: { department: "Departamento-Orientacion-Educacional", name: "Departamento de Orientación Educacional" },
    component: Home
    },
    {
      path: '/biologia',
      name: 'Chat-Biologia',
      props: { department: "BIOLOGIA", name: "Biologia" },
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
      path: '/geografia',
      name: 'Chat-Geografia',
      props: { department: "GEOGRAFIA-TURISMO", name: "Geografía y Turismo" },
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
        path: '/ups',
        name: 'Chat-UPS',
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
    ]

    const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
      })
      
      export default router