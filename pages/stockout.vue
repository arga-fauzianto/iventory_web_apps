<template>
    <v-container class="elevation-5" mt-5>
      <v-row class="d-flex align-baseline justify-space-between">
        <v-col md="4">
          <h3 class="ml-3 mt-3">Data Barang Keluar</h3>
        </v-col>
        <v-col md="2" class="mr-4" mt-5>
          <v-btn @click="tambahBarang" color="primary">Tambah Data</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="barangList"
            :server-items-length="totalData"
            :items-per-page="5"
            :options.sync="options"
            :loading="loading"
            :footer-props="{
              itemsPerPageOptions: [5, 10, 20, 30]
            }"
          >
            <template v-slot:items="props">
              <td>{{ props.item.nama }}</td>
              <td>{{ props.item.kode }}</td>
              <td>{{ props.item.quantity }}</td>
              <td>{{ props.item.satuan }}</td>

            </template>
          </v-data-table>
        </v-col>
      </v-row>
  
      <!-- Modal untuk tambah barang -->
      <v-dialog md="6" v-model="dialog" max-width="900px" height="500px" transition="dialog-top-transition">
        <v-card>
          <span class="mt-8 ml-5">Tambah Barang Keluar</span>
          <v-card-text>
            <v-container>
      <v-row>
        
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
        <span>
        Nama Barang
      </span>
          <v-text-field
            label="Nama Barang"
            outlined
            v-model="form.namaBarang"
            dense
            class="mt-2"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="4"
        >
        <span>
        Satuan
      </span>
          <v-select
          v-model="form.satuan"
          :items="unit"
          label="Satuan"
          ></v-select>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="4"
        >
        <span>
        Quantity
      </span>
          <v-text-field
            label="quantity"
            outlined
            dense
            v-model="form.qty"
            class="mt-2"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
          </v-card-text>
          <v-card-actions class="pb-5 align-items-center justify-content-center">
            <v-btn color="error" @click="dialog = false; successDialog = false" width="120px" pb-3>Batal</v-btn>
            <v-btn color="primary" @click="onSave"  width="120px" pb-3>Simpan</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        <!-- Modal dialog success -->
  <v-dialog v-model="successDialog" max-width="400px">
    <v-card max-width="400px" height="215px" align-center py-3>
      <v-card-title class="headline" py-3>Berhasil Disimpan!</v-card-title>
      <v-card-text class="mt-5">
        <v-row justify="center" align="center">
          <v-icon color="success" size="64" mt-3>mdi-check-circle-outline</v-icon>
        </v-row>
        <v-row justify="center" align="center" mt-5>
          <span>Data barang berhasil disimpan</span>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" class="p-5" @click="successDialog = false">Tutup</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
    </v-container>
  </template>

<script>
import { watch } from 'vue';


  export default {
  layout: 'default',
   name: 'MasterBarangPage',
    data() {
      return {
        successDialog: false,
        totalData: 0,
        loading: false,
        options: {},
        barangList: [],
        headers: [
          { text: '#', value: 'row', sortable: false },
          { text: 'Nama Barang', value: 'namaBarang', sortable: false },
          { text: 'Kode Barang', value: 'kodeBarang', sortable: false },
          { text: 'Quantity', value: 'qty', sortable: false },
          { text: 'Satuan', value: 'satuan', sortable: false },
     
        ],       
        dialog: false,
        unit: ['KG', 'PCS', 'DUS', 'KRAT', 'ROLL'],
        form: {
          namaBarang: '',
          satuan: '',
          qty: ''
        },
        rules: {
        namaBarang: [
          (v) => !!v || 'nama barang is required',
        ],
        satuan: [
          (v) => !!v || 'satuan is required',
        ],
        qty: [
          (v) => !!v || 'quantity is required',
        ]
      }
      };
    },
    methods: {
      fetchBarang() {
        const { page, itemsPerPage } = this.options
        this.loading = true

        this.$axios.$get(`http://localhost:8000/api/index?page=${page}&limit=${itemsPerPage}`)
        .then(response => {
          this.loading = false
          this.barangList = response.barangGet.docs
          this.totalData = response.barangGet.totalDocs

          let startItem = response.barangGet.pagingCounter
          this.barangList.map(barang => barang.row = startItem++)
        })
        .catch(err => {
          console.log(err)
        })
  
      },

      onSave() {
          this.$axios.$post(`http://localhost:8000/api/barang`, this.form)
          .then(res => {
            console.log('success tambah: ', res )
            this.fetchBarang(); // Memuat ulang data barang setelah berhasil menyimpan
            this.dialog = false; // Tutup dialog setelah menyimpan
            this.successDialog = true;
          })

          .catch(error => {
            console.log(error)
          })
        },

      tambahBarang() {
        this.dialog = true;
      },
      simpanBarang() {
        // Logika untuk menyimpan barang ke dalam barangList
        this.barangList.push({
          nama: this.form.nama,
          kode: this.form.kode,
          quantity: 0, // Ganti sesuai kebutuhan
          satuan: this.form.satuan
        });
  
        // Reset form dan tutup dialog
        this.form = {
          nama: '',
          kode: '',
          jenis: '',
          quantity: '',
          satuan: ''
        };
        this.dialog = false;
        this.successDialog = true;
      },
    },
    watch: {
        options: {
          handler() {
            this.fetchBarang()
          },
          deep: true
        }
      },
  };
  </script>