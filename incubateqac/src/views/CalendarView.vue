<template>
  <calendar />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import Calendar from '../components/Calendar.vue';

export default defineComponent({
  name: 'CalendarView',

  components: {
    Calendar,
  },
});
</script>
