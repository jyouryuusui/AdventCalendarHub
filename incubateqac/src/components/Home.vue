<template>
  <v-container>
    <h1>Home5</h1>
    <p>{{ t('message.hello') }}</p>
    <br>

    <v-data-table
      :headers="headers.map(header => ({ ...header, title: t(header.title) }))"
      :items="articles"
      :items-per-page="5"
      class="elevation-1"
    >
    <template v-slot:item.title="{ item }">
      {{item.columns.title[locale]}}
      <!--{{ item.title[locale.value] }}-->
    </template>
    <template v-slot:item.summary="{ item }">
      {{item.columns.summary[locale]}}
      <!--{{ item.summary[locale.value] }}-->
    </template>
  </v-data-table>

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
  title: 'title',
  key: 'title',
  align: 'start',
  sortable: false,
  value: 'title',
  },
  {
  title: 'summary',
  key: 'summary',
  align: 'start',
  sortable: false,
  value: 'summary' 
},
  {
  title: 'date',
  key: 'creationDate',
  align: 'start',
  sortable: true,
  value: 'creationDate' 
}
];

/*
interface LanguageHeader {
  code: string;
  name: string;
}
const languageOptions: LanguageHeader{} = [
  en:{ code: 'en', name: 'English (EN)' },
  ja:{ code: 'ja', name: '日本語 (JA)' },
  fr:{ code: 'fr', name: 'Fr (FR)' }
  // 他の言語オプションを追加
];
*/


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
