<template>
  <v-app>
    <Header></Header>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header
  },

  data () {
    return {
      //
    }
  },
})
</script>
