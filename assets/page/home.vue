<template>
  <v-container class="py-8 px-6" fluid>
       <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
       </v-overlay>
            <v-row>
              <v-col cols="12">
                <v-card color="cyan" dark>
                  <v-card-title class="text-h5">
                    Leads Hari Ini
                    <br>
                    {{new_leads}}
                  </v-card-title>
                  <v-card-subtitle>Jumlah Prosepek Yang Telah Didapat Hari Ini</v-card-subtitle>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card color="green" dark>
                  <v-card-title class="text-h5">
                    Followup Hari Ini
                    <br>
                    {{followup_leads}}
                  </v-card-title>
                  <v-card-subtitle>Jumlah Tindak Lanjut Hari Ini</v-card-subtitle>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card color="red" dark>
                  <v-card-title class="text-h5">
                    Closing Hari Ini
                    <br>
                    {{closing_leads}}
                  </v-card-title>
                  <v-card-subtitle>Jumlah Leads Yang Bertransaksi Hari Ini</v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
</template>
<script>
module.exports = {
    created() {
    
    },
    data: function(){
      return{
  
        title : 'Homepage',
        loading:false,
        new_leads:0,
        followup_leads:0,
        closing_leads:0,
  
      }
    },
    created() {
      var _this=this
      _this.showAll();
    },
  
    methods: {
            goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
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

            axios.get(base_url + "Leads/today",config).then(function (response) {

                  _this.new_leads = response.data.data.new
                  _this.followup_leads = response.data.data.followup
                  _this.closing_leads = response.data.data.closing
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
          }
      
      },
  }


</script>