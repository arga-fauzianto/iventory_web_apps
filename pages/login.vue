<template>
    <v-row class="text-center">
      <v-col cols="10" offset-md="4" md="4" offset="1">
        <v-card class="elevation-2">
          <v-toolbar class="align-center">Hello, Selamat Datang!👋🏻</v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-text-field 
                name="id_user"
                label="Input Nik Karyawan"
                :rules="rules.nik_karyawan"
                type="id_user"
                v-model="form.nik_karyawan"
                required
              />
              <v-text-field 
                name="pass"
                label="Masukan Password"
                :rules="rules.password"
                type="password"
                v-model="form.password"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              :loading="isLoading"
              color="primary" 
              class="mb-2"
              @click="onSubmit"
            >
              Masuk
            </v-btn> 
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script>
export default {
  layout: 'auth',
  data() {
    return {
      isLoading: false,
      form: {
        nik_karyawan: '',
        password: ''
      },
      rules: {
        nik_karyawan: [
          (v) => !!v || 'nik_karyawan is_required',
        ],
        password: [
          (v) => !!v || 'password is required',
          (v) => v.length >= 6 || 'password harus berjumlah 8 character'
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true
       const user= await this.$store.dispatch('auth/login', this.form);
       this.isLoading = false
       alert(user.data.nama)
      } catch (error) {
        console.log(error);
      };
    }
  }
}
</script>

  