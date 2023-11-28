<template>
  <div class="about">
    <about />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import About from '../components/About.vue';


export default defineComponent({
  name: 'AboutView',

  components: {
    About,
  },
});
</script>