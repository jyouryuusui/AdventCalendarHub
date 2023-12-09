<template>
  <v-container>
    <h1>Calendar</h1>
    <a href="/">launch about</a>
    <p>{{ t('message.calendar') }}</p>
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


<!--template>
  <v-container>
    <v-row>
      <v-col cols="7">
        <v-btn @click="prevMonth">Prev</v-btn>
        <span>{{ currentMonth }}</span>
        <v-btn @click="nextMonth">Next</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="day in daysOfWeek"
        :key="day"
        cols="1"
      >
        {{ day }}
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="date in daysInMonth"
        :key="date"
        cols="1"
      >
        {{ date }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 今月の日付を計算するロジック
const currentDate = ref(new Date());
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const currentMonth = computed(() => currentDate.value.toLocaleString('default', { month: 'long' }));

const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: days }, (_, i) => i + 1);
});

function prevMonth() {
  currentDate.value.setMonth(currentDate.value.getMonth() - 1);
}

function nextMonth() {
  currentDate.value.setMonth(currentDate.value.getMonth() + 1);
}
</script-->


<!--template>
  <v-calendar
    v-model="value"
    :events="events"
    :event-color="getEventColor"
    @click:event="showEvent"
    @click:more="viewDay"
    @click:date="viewDay"
    :start="start"
    :end="end"
    :weekdays="weekdays"
  ></v-calendar>
</template>

<script setup lang='ts'>
import {  ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();

interface MyCalendarEvent {
  name: string;
  start: Date;
  end: Date;
  // その他必要なプロパティ
}

const start = '2023-12-01';
const end = '2023-12-31';
const value = ref('2023-12-01');
const weekdays = [0, 1, 2, 3, 4, 5, 6]; // 日曜日から土曜日

const events = ref<MyCalendarEvent[]>([
  // ここに予定を追加
]);

const getEventColor = (event: MyCalendarEvent) => {
  console.log(event);
  // イベントの種類に応じた色を返す
};

const showEvent = (event: MyCalendarEvent) => {
  // イベントをクリックした時の処理
};

const viewDay = (date: MyCalendarEvent) => {
  // 特定の日付をクリックした時の処理
};
</script-->
