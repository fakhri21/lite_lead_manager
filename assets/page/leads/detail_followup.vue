<template>
  <v-container>
    <v-row>
        <v-img
          height="200px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img
                alt="user"
                src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
              >
            </v-avatar>
            <p class="ml-3">
              {{items[0].nama_depan}} {{items[0].nama_belakang}}
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            Today
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="item in items"
              :key="item.uniqid"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ item.nama_kategori }}</strong> @{{ item.waktu_followup }}
                </div>
                <div>{{ item.keterangan }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
        <v-btn v-b-modal.modal_add class="py-6 px-3" color="pink" app fab fixed dark bottom right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
          <!--add modal-->
        <b-modal hide-footer id="modal_add" title="Tambah Data">
          <b-form @submit.prevent="addData">
            <div class="row">
              <div class="col-md-12">
                <b-form-select v-model="formData_.id_kategori.value" :options="options" :text-field="'nama_kategori'" :value-field="'id_kategori'" class="mb-3"></b-form-select>
                <v-form :schema="formSchema" :data="formData_"></v-form>
            <label> Tanggal</label>
            <v-text-field
              v-model="formData_.tanggal.value"
              clearable
              readonly
              @click="menu2 = true"
            ></v-text-field>
                 <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          max-width="290"
        >

          <v-date-picker
            v-model="formData_.tanggal.value"
            @change="menu2 = false"
          ></v-date-picker>
        </v-menu>
                <b-time v-model="formData_.waktu.value"></b-time>
              </div>
            </div>
              <b-button type="submit"  variant="primary">Tambah</b-button>
              <b-button type="reset"  variant="danger">Reset</b-button>
            </b-form>
        </b-modal>

        <!--update modal-->
        <b-modal hide-footer id="modal_update" title="Ubah Data">
          <div class="row">
            <div class="col-md-6">
              <v-form :schema="formSchema" :data="chooseData"></v-form>
            </div>
          </div>
            <b-button  variant="primary"  @click="updateData">
                  Ubah
             </b-button>
        </b-modal>

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
        this.getKategori()
      },
    },
    created() {
      this.showAll();
    },
    data: function () {
      return {
        messages: [
            {
            from: 'You',
            message: `Sure, I'll see you later.`,
            time: '10:42am',
            color: 'deep-purple lighten-1',
            },
            {
            from: 'John Doe',
            message: 'Yeah, sure. Does 1:00pm work?',
            time: '10:37am',
            color: 'green',
            },
            {
            from: 'You',
            message: 'Did you still want to grab lunch today?',
            time: '9:47am',
            color: 'deep-purple lighten-1',
            },
        ],
        title: 'Datatable',
        modal_detail:false,
        dialog:false,
        loading: false,
        sheet:false,
        date:'',
        menu2:false,
        //form
        formSchema: {
          fields: [
            
            {
              type: 'text-input',
              name: 'keterangan',
              label: 'keterangan',
              required:true,
              placeholder: 'Masukkan keterangan'
            },
            
          ]
        },
        formData_: {
          uniqid: {
            value: ''
          },
            id_leads: {
                value: v.$route.params.id
            },
            id_kategori: {
                value: ''
            },
            id_status: {
                value: ''
            },
            keterangan: {
                value: ''
            },
            tanggal: {
                value: ''
            },  
            waktu: {
                value: ''
            },  
        },
        chooseData: {},
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
          options:[]


      }
    },

    methods: {
      goBack() {
        window.history.length > 1 ?
          this.$router.go(-1) :
          this.$router.push('/')
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

              _this.options = response.data.data
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

         axios.get(base_url + "M_kategori",config).then(function (response) {

              _this.options = response.data.data
              console.log(response.data.data) 
          })

        axios.get(base_url + "Leads/detail_followup",config).then(function (response) {

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
        axios.post(base_url + "Task_followup", params,config).then(function (response) {
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
        axios.put(base_url + "task_followup", params,config).then(function (response) {
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
          text: 'Data tidak dapat dikembalikan',
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

            axios.delete(base_url + "task_followup",config)
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