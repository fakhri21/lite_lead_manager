const base_url='https://leadmanager123.000webhostapp.com/rest-lead-manager/'

const routes = [
  //front
  {
    name: 'login',
    path: '/',
    component: httpVueLoader('assets/page/front/login.vue'),
    meta: {
      login: true
    },
  },
  {
    name: 'register',
    path: '/register',
    component: httpVueLoader('assets/page/front/register.vue'),
    meta: {
      login: true
    },
  },
  {
    name: 'lupa_password',
    path: '/lupa_password',
    component: httpVueLoader('assets/page/front/lupa_password.vue'),
    meta: {
      login: true
    },
  },
  {
    name: 'reset_password',
    path: '/reset_password',
    component: httpVueLoader('assets/page/front/reset_password.vue'),
    meta: {
      login: true
    },
  },

  //home
  {
    name: 'home',
    path: '/home',
    component: httpVueLoader('assets/page/home.vue')
  },
  
  //master
  {
    name: 'channel',
    path: '/channel',
    component: httpVueLoader('assets/page/master/channel.vue')
  },
  
  //leads
  {
    name: 'leads',
    path: '/leads/:id_kategori?',
    component: httpVueLoader('assets/page/leads/leads.vue')
  },
  {
    name: 'detail_lead',
    path: '/detail_lead/:id',
    component: httpVueLoader('assets/page/leads/detail_lead.vue')
  },
  {
    name: 'detail_followup',
    path: '/detail_followup/:id',
    component: httpVueLoader('assets/page/leads/detail_followup.vue')
  },
  /* {
    name: 'task_followup',
    path: '/task_followup/:id',
    component: httpVueLoader('assets/page/task_followup.vue')
  }, */

  //pipeline
  {
    name: 'pipeline',
    path: '/pipeline',
    component: httpVueLoader('assets/page/pipeline.vue')
  },

  //user
  {
    name: 'profile',
    path: '/profile',
    component: httpVueLoader('assets/page/profile.vue'),
    meta: {
      
    },
  },
  
  
]

const router = new VueRouter({
    routes // short for `routes: routes`
  })

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})


Vue.use(VeeValidate)
var v = new Vue({
  $_veeValidate: {
    // fetch the current value from the innerValue defined in the component data.
    value () {
      return this.innerValue;
    }
  },
    router,
    components: {
      'avatar': VueAvatar.Avatar
    },
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        title:"belajar vue",
        nama_user:localStorage.getItem('nama_user'),
        cards: ['Today', 'Yesterday'],
      drawer: false,
      links: [
        ['mdi-inbox-arrow-down', 'Inbox'],
        ['mdi-send', 'Send'],
        ['mdi-delete', 'Trash'],
        ['mdi-alert-octagon', 'Spam'],
      ],
        items: [
          {
            color: '#1F7087',
            src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
            title: 'Supermodel',
            artist: 'Foster the People',
          },
          {
            color: '#952175',
            src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
            title: 'Halcyon Days',
            artist: 'Ellie Goulding',
          },
          {
            color: '#952175',
            src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
            title: 'Halcyon Days',
            artist: 'Ellie Goulding',
          },
          {
            color: '#952175',
            src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
            title: 'Halcyon Days',
            artist: 'Ellie Goulding',
          },
        ],
        
    },
    created() {

    },
    computed: {
        hal_login(){
          return this.$route.meta.login
        },
        config_axios(){
          var config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
          }
          return config
          
        }

    },
    methods: {
      logout(){
        localStorage.clear()
        this.$router.push('/')
      },
      
    }
})

