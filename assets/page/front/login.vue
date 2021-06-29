<template>
<v-content>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
                <v-container fluid fill-height>
                   <v-layout align-center justify-center>
                      <v-flex xs12 sm8 md4>
                         <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                               <v-toolbar-title>Login form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                  <v-text-field
                                     prepend-icon="person"
                                     name="login"
                                     label="Login"
                                     type="email"
                                     v-model="username"
                                  ></v-text-field>
                                  <v-text-field
                                     prepend-icon="lock"
                                     name="password"
                                     label="Password"
                                     type="password"
                                     v-model="password"
                                  ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                               <v-spacer></v-spacer>
                               <v-btn color="primary" @click="login">Login</v-btn>
                            </v-card-actions>
                   <router-link :to="'/register'">Klik untuk Mendaftar</router-link>
                   <br>
                   <router-link :to="'/lupa_password'">Klik untuk Lupa Password</router-link>
                         </v-card>
                      </v-flex>
                   </v-layout>
                </v-container>
             </v-content>
</template>

<script>
module.exports = {
    computed: {
      data_login() {
        return Qs.stringify({username:this.username,password:this.password})
      },
      
    },
    created() {
        
    },
    data: function(){
      return{
  
        title : 'Login',
        gambar : 'img/visimisi.png',
        loading:false,
        username:'',
        password:''
  
      }
    },

  
    methods: {
            goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
        },
        login(){
            this.loading = true
            axios.post(base_url+"/api/auth/login",this.data_login)
            .then(function (response) {
            localStorage.setItem('jwt',response.data.token)
            localStorage.setItem('id_user',response.data.id_user)
            localStorage.setItem('nama_user',response.data.nama_user)
            v.nama_user=localStorage.getItem('nama_user')
            v.$router.push('/home')
          })
          .catch((err) => {
            console.log(err)
            Swal.fire({
              icon: 'error',
              title: 'Maaf Terjadi Kesalahan',
              html: err.response.data.status
            })
          })
          .finally(() => {
            this.loading = false
          });
        }
        
  
      },
  }


</script>