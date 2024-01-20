<template>
    <v-container fluid class="elevation-5" top="5">
      <v-row class="d-flex align-baseline justify-space-between">
        <v-col md="9">
          <v-text class="ml-2">Data Barang Masuk</v-text>
        </v-col>
        <v-col md="2" class="mr-3">
          <v-btn @click="tambahBarang" color="primary">Tambah Barang Masuk</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="barangList"
            :items-per-page="5"
          >
            <template v-slot:items="props">
              <td>{{ props.item.nama }}</td>
              <td>{{ props.item.kode }}</td>
              <td>{{ props.item.quantity }}</td>
              <td>{{ props.item.satuan }}</td>
              <td>{{ props.item.harga }}</td>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
  
      <!-- Modal untuk tambah barang -->
      <v-dialog md="6" v-model="dialog" max-width="900px" transition="dialog-top-transition">
        <v-card>
          <v-subheader class="ml-3">Tambah Barang Masuk</v-subheader>
          <v-card-text>
            <v-container>
      <v-row>
        
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
        <v-text>
        Nama Barang
      </v-text>
          <v-text-field
            label="Nama Barang"
            outlined
            dense
            class="mt-2"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="4"
        >
        <v-text>
        Kode Barang
      </v-text>
          <v-text-field
            label="Kode Barang"
            placeholder="Placeholder"
            outlined
            dense
            disabled
            class="mt-2"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
        <v-text>
        No. Grin
      </v-text>
          <v-text-field
            label="No. Grin"
            placeholder="Placeholder"
            solo
            dense
            disabled
            class="mt-2"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
        <v-text>
        Satuan
      </v-text>
          <v-text-field
            label="Satuan"
            placeholder="Placeholder"
            outlined
            dense
            class="mt-2"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
        <v-text>
        Quantity
      </v-text>
          <v-text-field
            label="quantity"
            placeholder="Placeholder"
            outlined
            dense
            class="mt-2"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
        <v-text>
        Harga Barang
      </v-text>
          <v-text-field
            label="Harga Barang"
            placeholder="Placeholder"
            outlined
            dense
            class="mt-2"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
          </v-card-text>
          <v-card-actions class="ml-5 pb-3 align-items-center justify-content-center">
            <v-btn color="error" @click="dialog = false" width="120px">Batal</v-btn>
            <v-btn color="primary" @click="simpanBarang" width="120px">Simpan</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>

  export default {
  layout: 'default',
   name: 'MasterBarangPage',
    data() {
      return {
        barangList: [
          { nama: 'SINGKONG', kode: 'kd-1221203-01', quantity: 100, satuan: 'KG', Harga: 100000 },
          { nama: 'KERUPUK BAWANG MENTAH', kode: 'kd-1221203-02', quantity: 100, satuan: 'KG', Harga: 100000 },
          { nama: 'TABUNG GAS 12 KG', kode: 'kd-1221203-03', quantity: 100, satuan: 'ITEM', Harga: 100000},
          { nama: 'PLASTIK UK 7 X 12 CM', kode: 'kd-1221203-04', quantity: 100, satuan: 'PACK', Harga: 100000 },
          { nama: 'PLASTIK UK 25 X 40 CM', kode: 'kd-1221203-05', quantity: 100, satuan: 'PACK', Harga: 100000 },
          { nama: 'CABAI MERAH GILING', kode: 'kd-1221203-06', quantity: 100, satuan: 'KG', Harga: 100000 },
          { nama: 'MINYAK GORENG', kode: 'kd-1221203-07', quantity: 100, satuan: 'DRUM', Harga: 100000 },
          { nama: 'MASAKO RASA SAPI', kode: 'kd-1221203-08', quantity: 100, satuan: 'DUS', Harga: 100000 },
          { nama: 'MSG AJINOMOTO', kode: 'kd-1221203-08', quantity: 100, satuan: 'DUS', Harga: 100000 },
          { nama: 'LILIN', kode: 'kd-1221203-09', quantity: 100, satuan: 'PACK', Harga: 100000 },
          { nama: 'TALI RAPIA', kode: 'kd-1221203-010', quantity: 100, satuan: 'ROLL', Harga: 100000 },
          // Tambahkan data barang lainnya sesuai kebutuhan
        ],
        headers: [
          { text: 'Nama Barang', value: 'nama' },
          { text: 'Kode Barang', value: 'kode' },
          { text: 'Quantity', value: 'quantity' },
          { text: 'Satuan', value: 'satuan' },
          { text: 'Harga', value: 'harga' },
     
        ],
        dialog: false,
        form: {
          nama: '',
          kode: '',
          jenis: '',
          quantity: '',
          satuan: ''
        },
        jenisMuatan: ['Jenis 1', 'Jenis 2', 'Jenis 3'], // Ganti dengan pilihan jenis muatan yang sesuai
      };
    },
    methods: {
      tambahBarang() {
        this.dialog = true;
      },
      simpanBarang() {
        // Logika untuk menyimpan barang ke dalam barangList
        this.barangList.push({
          nama: this.form.nama,
          kode: this.form.kode,
          quantity: 0, // Ganti sesuai kebutuhan
          harga: 0, // Ganti sesuai kebutuhan
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
      },
    },
  };
  </script>
  