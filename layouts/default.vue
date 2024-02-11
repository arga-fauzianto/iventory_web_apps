<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-toolbar-title>{{ title }}</v-toolbar-title> -->
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: ['authenticated'],
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      clipped: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Data Barang',
          to: '/masterBarang',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Data Barang Masuk',
          to: '/stockin',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Data Barang Keluar',
          to: '/stockout',
        },
        {
          icon: 'mdi-logout',
          title: 'Keluar',
          to: '/logout',
        },
      ],
      title: 'Iventory Web Apps',
    }
  },
}
</script>
