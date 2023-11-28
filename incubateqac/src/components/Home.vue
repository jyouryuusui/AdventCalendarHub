<template>
  <v-container>
    <h1>Home5</h1>
    <p>{{ t('message.hello') }}</p>
    <br>

    <v-data-table
      :headers="headers"
      :items="articles"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>

</v-container>
</template>

<script setup lang='ts'>
//console.log("test0")
import { onMounted, computed, ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useI18n } from 'vue-i18n'

type ReadonlyHeaders = InstanceType<typeof VDataTable>['headers']


const { t, locale } = useI18n();

interface Article {
  title: string;
}

const headers: ReadonlyHeaders = [
{
  title: '記事のタイトル',
  key: 'title',
  align: 'start',
  sortable: false,
  value: 'title',
  },{
  title: 'ソートID',
  key: 'sort_id',
  align: 'start',
  sortable: true,
  value: 'sort_id' 
},

];



const articles = ref<Article[]>([]);

const loadArticles = async () => {
  try {
    const response = await fetch('/articles.json'); // JSONファイルのパスを指定
    //console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    const data = await response.json();
    articles.value = data.data;
    //console.log(articles.value);
  } catch (error) {
    console.error('Error loading articles:', error);
  }
};

onMounted(loadArticles);

</script>
