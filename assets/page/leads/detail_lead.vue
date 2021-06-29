<template>
    <v-container class="py-8 px-6" fluid>
            <v-row>
              <v-col cols="6">
                <h3>{{items.nama_depan}} {{items.nama_belakang}}</h3>
                <p>{{items.email}}</p>
                <p>{{items.no_tlp}}</p>
                <p>{{items.alamat}}</p>
                <p></p>
                    <v-icon>fas fa-whatsapp</v-icon> Chat Whatsapp
              </v-col>
              <v-col cols="12">
                <v-card color="green" dark :to="'../detail_followup/'+v.$route.params.id">
                  <v-card-title >
                    Detail Followup
                  </v-card-title>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card color="cyan" dark>
                  <v-card-title>
                    Tambah Tugas Followup
                  </v-card-title>
                </v-card>
              </v-col>

            </v-row>
        </v-container>
</template>
<script>
  module.exports = {
    computed: {
      indexAwal() {
        return (this.currentPage * this.perPage) - this.perPage
      },
      showSelect() {
        this.showAll()
      },
    },
    created() {
      this.showAll();
    },
    data: function () {
      return {

      cards: ['Today', 'Yesterday'],
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'Inbox'],
        ['mdi-send', 'Send'],
        ['mdi-delete', 'Trash'],
        ['mdi-alert-octagon', 'Spam'],
      ],
        title: 'Datatable',
        modal_detail:false,
        dialog:false,
        loading: false,
        sheet:false,
          currentPage: 1,
          perPage: 5,
          items: [],
          rows: 0,


      }
    },

    methods: {
      goBack() {
        window.history.length > 1 ?
          this.$router.go(-1) :
          this.$router.push('/')
      },

      /* CRUD */
      showAll() {
        var start_index = this.indexAwal
        var data_kirim = {
          id:v.$route.params.id
        }
        var config = {
          params:data_kirim,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          }
        }
        
        this.loading = true
        var _this=this

        axios.get(base_url + "leads/detail",config).then(function (response) {

              _this.items = response.data.data
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
      formData(obj) {
        var formData = new FormData();
        for (var key in obj) {
          formData.append(key, obj[key]['value']);
        }
        return formData;
      },
      selectData(data){
        for (var key in data) {
          
          this.chooseData[key]={}
          this.chooseData[key]['value']=data[key]
        }
        console.log(this.chooseData)
        
      },
      addData(event) {
        this.loading = true
        var kirim={}
        for (var key in this.formData_) {
          kirim[key]=this.formData_[key]['value']
        }
        var config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
          }
        var params = Qs.stringify(kirim)
        axios.post(base_url + "Tes_team", params,config).then(function (response) {
            Swal.fire('Berhasil Menambahkan', '', 'success')
            event.target.reset();
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Maaf Terjadi Kesalahan',
              text: 'Silahkan coba kembali'
            })
          })
          .finally(() => {
            this.showAll()
            this.loading = false
          });
      },
      updateData() {
        this.loading = true
        var config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
          }
        //var formData = this.formData(this.chooseData);
        var kirim={}
        for (var key in this.chooseData) {
          kirim[key]=this.chooseData[key]['value']
        }
        var params = Qs.stringify(kirim)
        axios.put(base_url + "Tes_team", params,config).then(function (response) {
            Swal.fire('Berhasil Merubah Data', '', 'success')
          })
          .finally(() => {
            this.loading = false
            this.showAll()
          });
      },
      deleteData(id) {
        this.loading = true
        var kirim={
          id:id
        }
        var params = Qs.stringify(kirim)
        var config = {
            data:params,
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
          }
        Swal.fire({
          title: 'Anda Yakin Ingin Menghapus?',
          text: "Data tidak dapat dikembalikan",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Hapus',
          cancelButtonText: 'Batal'
        })
        .then((result) => {
          if (result.isConfirmed) {
            console.log(params)

            axios.delete(base_url + "Tes_team",config)
                .then(function (response) {
                    Swal.fire(
                      'Terhapus!',
                      'Data telah terhapus',
                      'success'
                    )
                  })
                  .catch((error) => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Maaf Terjadi Kesalahan',
                      text: 'Silahkan coba kembali'
                    })
                  })
              .finally(() => {
                
                this.showAll()
              });

          }
        this.loading = false
        })

      },



    },
  }
</script>