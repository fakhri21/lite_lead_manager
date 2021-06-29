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
                               <v-toolbar-title>Reset Password</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                  <v-text-field
                                     prepend-icon="person"
                                     name="login"
                                     label="Email / Username"
                                     type="email"
                                     v-model="username"
                                  ></v-text-field>
                                
                            </v-card-text>
                            <v-card-actions>
                               <v-spacer></v-spacer>
                               <v-btn color="primary" @click="reset">Atur Ulang</v-btn>
                            </v-card-actions>
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
        return Qs.stringify({email:this.username})
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
        reset(){
            this.loading = true
            axios.post(base_url+"api/Auth/forgot_password",this.data_login)
            .then(function (response) {
              Swal.fire({
                icon: 'success',
                title: 'Registrasi Berhasil',
                html: response.data.status
              })
              v.$router.push('/reset_password')
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