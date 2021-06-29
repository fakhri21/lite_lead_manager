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
                            <v-toolbar dark color="blue">
                               <v-toolbar-title>Reset Password</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                              Silahkan Cek inbox / spam untuk mendapatkan kode verifikasi
                                  
                                   <v-text-field
                                     prepend-icon="lock"
                                 :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                                 :rules="[rules.required,rules.min]"
                                 :type="show_password ? 'text' : 'password'"
                                 name="password"
                                 label="Password"
                                 hint="At least 8 characters"
                                 v-model="password"
                                 @click:append="show_password = !show_password"
                                 required
                                 ></v-text-field>
                                  <v-text-field
                                     :append-icon="show_re_password ? 'mdi-eye' : 'mdi-eye-off'"
                                     :type="show_re_password ? 'text' : 'password'"
                                     prepend-icon="lock"
                                     name="re-password"
                                     label="Retype Password"
                                     v-model="re_password"
                                      :rules="[rules.required,rules.passMatch]"
                                     @click:append="show_re_password = !show_re_password"
                                     required
                                  ></v-text-field>
                                  <v-textarea
                                    prepend-icon="lock"
                                    label="Kode Verifikasi"
                                    v-model="kode_verifikasi"
                                  >

                                  </v-textarea>
                            </v-card-text>
                            <v-card-actions>
                               <v-spacer></v-spacer>
                               <v-btn color="primary" @click="reset_password">Reset</v-btn>
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
        return Qs.stringify(
            {
              code:this.kode_verifikasi,
              password:this.password
            }
          )
      },
      
    },
    created() {
        
    },
    $_veeValidate: {
    validator: 'new'
   },
    data: function(){
      return{
  
        title : 'Reset Password',
        gambar : 'img/visimisi.png',
        loading:false,
        kode_verifikasi:'',
        password:'',
        show_password:false,
        re_password:'',
        show_re_password:false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          passMatch: v=> v ==this.password || (`Password tidak sama`),
        },
  
      }
    },

  
    methods: {
            goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
        },
        submit () {
      this.$validator.validateAll()
        .then(result => {
          console.log(result)
        })
    },
        reset_password(){
            this.loading=true
            axios.post(base_url+"api/Auth/reset_password",this.data_login)
            .then(function (response) {
            Swal.fire({
              icon: 'success',
              title: 'Registrasi Berhasil',
              html: response.data.status
            })
            v.$router.push('/')
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