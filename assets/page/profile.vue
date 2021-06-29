<template>

                <v-container fluid fill-height>
                     <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
                   <v-layout align-center justify-center>
                      <v-flex xs12 sm8 md4>
                         <v-card class="elevation-12">
                            <v-toolbar dark color="blue">
                               <v-toolbar-title>Profile</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                  <v-text-field
                                     prepend-icon="person"
                                     name="nama_depan"
                                     label="Nama Depan"
                                     type="text"
                                     v-model="first_name"
                                  ></v-text-field>
                                  <v-text-field
                                     prepend-icon="person"
                                     name="nama_belakang"
                                     label="Nama Belakang"
                                     type="text"
                                     v-model="last_name"
                                  ></v-text-field>
                                  <v-text-field
                                     prepend-icon="email"
                                     name="email"
                                     label="Email"
                                     type="email"
                                     v-model="email"
                                  ></v-text-field>
                                  <v-spacer></v-spacer>
                                 <v-btn color="primary" @click="ubah_profile">Ubah</v-btn>
                               
                                  <v-divider></v-divider>
                                  <h4>Isi Bila ingin merubah Password</h4>
                                   <v-text-field
                                     prepend-icon="lock"
                                 :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                                 :rules="[rules.required,rules.min]"
                                 :type="show_password ? 'text' : 'password'"
                                 name="password"
                                 label="Password lama"
                                 hint="At least 8 characters"
                                 v-model="password"
                                 @click:append="show_password = !show_password"
                                 required>
                                 </v-text-field>
                                 
                                   <v-text-field
                                     prepend-icon="lock"
                                 :append-icon="show_new_password ? 'mdi-eye' : 'mdi-eye-off'"
                                 :rules="[rules.required,rules.min]"
                                 :type="show_new_password ? 'text' : 'password'"
                                 name="password"
                                 label="Ubah Password"
                                 hint="At least 8 characters"
                                 v-model="new_password"
                                 @click:append="show_new_password = !show_new_password"
                                 required>
                                 </v-text-field>

                                 <v-text-field
                                     :append-icon="show_re_new_password ? 'mdi-eye' : 'mdi-eye-off'"
                                     :type="show_re_new_password ? 'text' : 'password'"
                                     prepend-icon="lock"
                                     name="re-password"
                                     label="Retype Password"
                                     v-model="re_new_password"
                                      :rules="[rules.required,rules.passMatch]"
                                     @click:append="show_re_new_password = !show_re_new_password"
                                     required
                                  ></v-text-field>

                               <v-btn color="primary" @click="ubah_password">Ubah</v-btn>
                            </v-card-text>
                            
                         </v-card>
                      </v-flex>
                   </v-layout>
                </v-container>
</template>

<script>


module.exports = {

    computed: {
      data_login() {
        return Qs.stringify(
            {
              id_user : localStorage.getItem('id_user'),
              first_name:this.first_name,
              last_name:this.last_name,
              email:this.email,
              old:this.password,
              new:this.new_password
            }
          )
      },
      
    },
    $_veeValidate: {
    validator: 'new'
   },
    data: function(){
      return{
  
        title : 'Ubah',
        gambar : 'img/visimisi.png',
        loading:false,
        first_name:'',
        last_name:'',
        email:'',

        password:'',
        show_password:false,
        
        new_password:'',
        show_new_password:false,
        re_new_password:'',
        show_re_new_password:false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          passMatch: v=> v ==this.new_password || (`Password tidak sama`),
        },
  
      }
    },
    created() {
      this.showAll();
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
        showAll() {
        var data_kirim = {
          id_user : localStorage.getItem('id_user')
        }
        var config = {
          params:data_kirim,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          }
        }
        
        this.loading = true
        var _this=this

        axios.get(base_url + "/api/auth/profile",config).then(function (response) {

              _this.first_name = response.data.data.first_name
              _this.last_name = response.data.data.last_name
              _this.email = response.data.data.email
              console.log(response.data.data) 
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Maaf Terjadi Kesalahan',
              text: 'Silahkan coba kembali'
            })
          })
          .finally(() => {
            this.loading = false
          });
      },
        ubah_password(){
            this.loading=true
            axios.post(base_url+"/api/auth/profile_change_password",this.data_login)
            .then(function (response) {
            Swal.fire({
              icon: 'success',
              title: 'Perubahan Berhasil',
              html: response.data.status
            })
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
        },
        ubah_profile(){
            this.loading=true
            axios.post(base_url+"/api/auth/profile",this.data_login)
            .then(function (response) {
            Swal.fire({
              icon: 'success',
              title: 'Perubahan Berhasil',
              html: response.data.status
            })
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