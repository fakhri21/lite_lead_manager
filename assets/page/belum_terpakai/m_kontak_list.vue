
<template>
  <section>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <b-row>
          <b-col>
            <h1 class="m-0">{{title}}</h1>
          </b-col><!-- /.col -->
          <b-col>
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">{{title}}</a></li>
            </ol>
          </b-col><!-- /.col -->
        </b-row><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
        <div class="row">

          <div class="col-md-12">
            <table class="table bg-dark my-3">
              <tr>
                <td>
                  <b-button v-b-modal.modal_add>Add</b-button>
                </td>
                <td>
                  <b-form-input v-model="search.text" type="text" placeholder="Cari"
                    @change="showSelect"></b-form-input>
              </tr>
            </table>
            <b-row>
              <div class="col-md-12">
                <b-overlay :show="loading">
                  <b-table striped hover 
                    :items="items" 
                    :fields="fields" 
                    :per-page="perPage" 
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc" 
                    sort-icon-left 
                    show-empty
                  >
                    <template #cell(index)="data">
                      {{ data.index + 1 }}
                    </template>
                    <template #cell(actions)="data">
                      <b-button variant="warning" v-b-modal.modal_update  @click="selectData(data.item)">Update</b-button>
                      <b-button variant="danger" v-b-modal.modal_delete @click="deleteData(data.item.uniqid)">Delete</b-button>
                    </template>
                  </b-table>
                </b-overlay>
              </div>
            </b-row>
            <b-row>
              <div class="col-md-1">
                <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm"></b-form-select>
              </div>
              <div class="col-md-4">
                <b-pagination v-model="currentPage" pills :total-rows="rows" :per-page="perPage" @change="showSelect">
                </b-pagination>
              </div>
            </b-row>

          </div>
        </div>

        <!--add modal-->
        <b-modal hide-footer id="modal_add" title="Tambah Data">
          <b-form @submit.prevent="addData">
            <div class="row">
              <div class="col-md-6">
                <v-form :schema="formSchema" :data="formData_"></v-form>
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


      </div>


    </div><!-- /.container-fluid -->
    <!-- /.content -->
    
  </section>
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

        title: 'M_kontak',
        loading: false,
       //form
        formSchema: {
          fields: [
            {
              type: 'text-input',
              name: 'nama_depan',
              label: 'nama_depan',
              required:true,
              placeholder: 'Masukkan nama_depan'
            },
            
            {
              type: 'text-input',
              name: 'nama_belakang',
              label: 'nama_belakang',
              required:true,
              placeholder: 'Masukkan nama_belakang'
            },
            
            {
              type: 'text-input',
              name: 'email',
              label: 'email',
              required:true,
              placeholder: 'Masukkan email'
            },
            
            {
              type: 'text-input',
              name: 'no_tlp',
              label: 'no_tlp',
              required:true,
              placeholder: 'Masukkan no_tlp'
            },
            
          ]
        },
        formData_: {
          uniqid: {
            value: ''
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
        },
        chooseData: {},
        formValidate: [],

        //datatable
          fields:[
                  'index',
                        {key:'nama_depan',label:'nama_depan',sortable: true},
                        {key:'nama_belakang',label:'nama_belakang',sortable: true},
                        {key:'email',label:'email',sortable: true},
                        {key:'no_tlp',label:'no_tlp',sortable: true},
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
          //pagination
          start   : start_index,
          length  : this.perPage,
          
          //pencarian
          search  : this.search.text,
          
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

        axios.get(base_url + "m_kontak",config).then(function (response) {

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
        axios.post(base_url + "m_kontak", params,config).then(function (response) {
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
        axios.put(base_url + "m_kontak", params,config).then(function (response) {
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

            axios.delete(base_url + "m_kontak",config)
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
