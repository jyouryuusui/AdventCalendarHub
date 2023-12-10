<template>
  <v-container style="max-width: 1200px;">
    <h1 class="mb-6">{{ t('message.abouttxt') }}</h1>
      <v-row>
        <v-col cols="12" md="8">
          <p>{{ t('message.history[0]') }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="4">
            <v-img v-if="locale=='en'" :src="imgPath[0][0]"></v-img>
            <v-img v-else="locale=='en'" :src="'../'+imgPath[0][0]"></v-img>
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <a :href="adventcalendarURL" target="_blank" rel="noopener noreferrer" >
            <v-img v-if="locale=='en'" :src="imgPath[0][1]"></v-img>
            <v-img v-else="locale=='en'" :src="'../'+imgPath[0][1]"></v-img>
          </a>
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <a :href="adventcalendarURL2" target="_blank" rel="noopener noreferrer" >
            <v-img v-if="locale=='en'" :src="imgPath[0][2]"></v-img>
            <v-img v-else="locale=='en'" :src="'../'+imgPath[0][2]"></v-img>
          </a>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="8">
          <p>{{ t('message.history[1]') }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="3" v-for="(path, index) in imgPath[1]" :key="index">
            <v-img v-if="locale=='en'" :src="path"></v-img>
            <v-img v-else="locale=='en'" :src="'../'+path"></v-img>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="8">
          <p>{{ t('message.history[2]') }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="(path, index) in imgPath[2]" :key="index">
            <v-img v-if="locale=='en'" :src="path"></v-img>
            <v-img v-else="locale=='en'" :src="'../'+path"></v-img>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="8" class="mb-10">
          <p>{{ t('message.history[3]') }}</p>
        </v-col>
      </v-row>
</v-container>

</template>

<script setup lang='ts'>
import {   } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();


const adventcalendarURL = 'https://qiita.com/advent-calendar/';
const adventcalendarURL2 = 'https://adventar.org/';

const imgPath = [
  [
    'about/adventcalendar.jpg',
    'about/ac.jpg',
    'about/ac2.jpg',
  ],
  [
    'about/perl.jpg',
    'about/jperl.jpg',
  ],
  [
    'about/cgwcc2016.jpg',
    'about/study.jpg'
  ],
];

</script>

<style>

</style>