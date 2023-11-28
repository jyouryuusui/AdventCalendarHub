<template>
  <v-container>
    <h1>About2</h1>
    <a href="/">launch about</a>
    <p>{{ t('message.hello') }}</p>
  </v-container>
</template>

<script setup lang='ts'>
//import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();

/*
export default defineComponent({
  name: 'About',

  data () {
    return {
      
    }
  },
})*/
</script>
