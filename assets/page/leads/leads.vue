<template>

  <v-container class="py-8 px-6" fluid>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-row>
      <v-col cols="12"  v-for="leads in items" :key="leads.uniqid" >
        <v-card>
         
          <v-list two-line>
            <template>
               <!--  -->
              <v-list-item >
                  <avatar :username="leads.nama_depan+' '+leads.nama_belakang"></avatar>
                <v-list-item-content>
                  <v-list-item-title><h3><b>{{leads.nama_depan}} {{leads.nama_belakang}} </b></h3></v-list-item-title>
                  
                  <v-list-item>
                    <i class="fa fa-envelope" aria-hidden="true"></i> {{leads.email}}
                  </v-list-item>
                  <v-list-item>
                  <i class="fa fa-phone" aria-hidden="true"></i> {{leads.no_tlp}}
                  </v-list-item>
                  <v-list-item>
                    <i class="fa fa-map-signs" aria-hidden="true"></i> {{leads.alamat}}
                  </v-list-item>
                  <v-list-item>
                    <i class="fas fa-funnel-dollar" aria-hidden="true"></i> {{leads.nama_channel}}
                  </v-list-item>
                  
                  <v-list-item-subtitle>
                    <v-btn color="blue" dark @click="sheet = !sheet;selectData(leads)"> Aksi</v-btn> 
                  <v-btn color="blue" dark :to="'../detail_followup/'+leads.uniqid"> Detail Followup</v-btn>

                    <!-- {{nama_kategori}} -->
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-btn @click="dialog=!dialog" class="py-6 px-3" color="pink" app fab fixed dark bottom right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

  <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Tambah Leads</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  prepend-icon="person"
                  label="Nama Depan"
                  v-model="formData_.nama_depan.value"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  prepend-icon="person"
                  label="Nama Belakang"
                  v-model="formData_.nama_belakang.value"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                prepend-icon="email"
                  label="Email"
                  type="email"
                  v-model="formData_.email.value"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  prepend-icon="phone"
                  label="Nomor Telepon"
                  v-model="formData_.no_tlp.value"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  prepend-icon="map"
                  label="Alamat"
                  v-model="formData_.alamat.value"
                  required
                ></v-textarea>
              </v-col>
              <v-col
                cols="6"
                sm="6"
              >
                <v-select
                  :items="options_kategori"
                  label="Kategori"
                  item-text="nama_kategori"
                  item-value="id_kategori"
                  v-model="chooseData.id_kategori.value"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="6"
                sm="6"
              >
                <v-select
                  :items="options_channel"
                  label="Channel"
                  item-text="nama_channel"
                  item-value="id_channel"
                  v-model="chooseData.id_channel.value"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            @click="addData"
          >
            Submit
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- /Modal add -->
  <v-dialog
      v-model="dialog_update"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Ubah Leads</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  prepend-icon="person"
                  label="Nama Depan"
                  v-model="chooseData.nama_depan.value"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  prepend-icon="person"
                  label="Nama Belakang"
                  v-model="chooseData.nama_belakang.value"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                prepend-icon="email"
                  label="Email"
                  type="email"
                  v-model="chooseData.email.value"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  prepend-icon="phone"
                  label="Nomor Telepon"
                  v-model="chooseData.no_tlp.value"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  prepend-icon="map"
                  label="Alamat"
                  v-model="chooseData.alamat.value"
                  required
                ></v-textarea>
              </v-col>
              <v-col
                cols="6"
                sm="6"
              >
                <v-select
                  :items="options_kategori"
                  label="Kategori"
                  item-text="nama_kategori"
                  item-value="id_kategori"
                  disabled
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="6"
                sm="6"
              >
                <v-select
                  :items="options_channel"
                  label="Channel"
                  item-text="nama_channel"
                  item-value="id_channel"
                  v-model="chooseData.id_channel.value"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            @click="updateData"
          >
            Submit
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- /Modal update -->
    <!-- Modal detail -->
     
    <v-bottom-sheet v-model="sheet">
      <v-sheet>
        <div class="py-3 px-3">
         <p @click="dialog_update=!dialog_update"><b>Edit</b></p>
         <p @click="deleteData(chooseData.uniqid.value)"><b>Hapus</b></p>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>
<script>
  module.exports = {
    components: {
      'avatar': VueAvatar.Avatar
    },
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
      this.getKategori();
      this.getChannel();
    },
    data: function () {
      return {

        drawer: null,

        title: 'Datatable',
        modal_detail:false,
        dialog:false,
        dialog_update:false,
        loading: false,
        sheet:false,
       //form
        formSchema: {
          fields: [{
              type: 'text-input',
              name: 'nama_team',
              label: 'Nama Team',
              required:true,
              placeholder: 'Masukkan Nama Team'
            }
          ]
        },
        formData_: {
          uniqid: {
            value: ''
          },
          id_user: {
            value: localStorage.getItem('id_user')
          },
          nama_depan: {
            value: ''
          },
          nama_belakang: {
            value: ''
          },
          email: {
            value: ''
          },
          no_tlp: {
            value: ''
          },
          id_kategori: {
            value: ''
          },
          id_channel: {
            value: ''
          },
          alamat:{
            value:''
          }
        },
        chooseData:  {
          uniqid: {
            value: ''
          },
          id_user: {
            value: localStorage.getItem('id_user')
          },
          nama_depan: {
            value: ''
          },
          nama_belakang: {
            value: ''
          },
          email: {
            value: ''
          },
          no_tlp: {
            value: ''
          },
          id_kategori: {
            value: ''
          },
          id_channel: {
            value: ''
          },
          alamat:{
            value:''
          }
          
        },
        formValidate: [],

        //datatable
          fields:[
                  'index',
                  {key:'nama_team',label:'Nama Team',sortable: true},
                  'actions',
                  ],
          
          pageOptions: [5, 10, 20, 50],
          sortBy: '',
          sortDesc: false,
          search: {
            text: ''
          },
          currentPage: 1,
          perPage: 5,
          items: [],
          rows: 0,

          options_kategori:[],
          options_channel:[]


      }
    },

    methods: {
      goBack() {
        window.history.length > 1 ?
          this.$router.go(-1) :
          this.$router.push('/')
      },
       getChannel() {
        
        var config = {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          }
        }
        
        this.loading = true
        var _this=this
        axios.get(base_url + "Channel",config).then(function (response) {

              _this.options_channel = response.data.data
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
       getKategori() {
        
        var config = {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          }
        }
        
        this.loading = true
        var _this=this
        axios.get(base_url + "M_kategori",config).then(function (response) {

              _this.options_kategori = response.data.data
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

      /* CRUD */
      showAll() {
        var start_index = this.indexAwal
        var data_kirim = {
          //pagination
          start   : start_index,
          length  : this.perPage,
          
          //pencarian
          search  : this.search.text,
          id_user : localStorage.getItem('id_user'),
          id_kategori : v.$route.params.id_kategori,
          
          //order
          order_by: this.sortBy,
          sort   :this.sortDesc,

        }
        var config = {
          params:data_kirim,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          }
        }
        
        this.loading = true
        var _this=this

        axios.get(base_url + "Leads",config).then(function (response) {

              _this.rows = response.data.recordsTotal
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
        axios.post(base_url + "Leads", params,config).then(function (response) {
            Swal.fire('Berhasil Menambahkan', '', 'success')
            //event.target.reset()
          })
          .catch((err) => {
            console.log(err)
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
        axios.put(base_url + "Leads", params,config).then(function (response) {
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

            axios.delete(base_url + "Leads",config)
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