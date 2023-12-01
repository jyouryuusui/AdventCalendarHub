<template>
  <v-container>
    <h1>Home5</h1>
    <p>{{ t('message.hello') }}</p>
    <br>

    <v-data-table
      :headers="headers.map(header => ({ ...header, title: t(header.title) }))"
      :items="articles"
      :items-per-page="50"
      dense
      hide-default-footer
      style="padding:0 0 20px 0;white-space: pre-line;"
      class="elevation-1"
    >

    <template v-slot:item.thumbnail="{ item }">
    </template>

    <template v-slot:item.title="{ item }">
      <v-img :src="item.raw.thumbnailUrl" aspect-ratio="1.7" class="thumbnail"></v-img>
      
      
    </template>
    <template v-slot:item.summary="{ item }">
      <div>
        <div class="titlediv">
          <span class="title">{{item.raw.title[locale]}}</span>
        </div>
        <div class="summarydiv">
          <span class="summary">{{item.raw.summary[locale]}}</span>
        </div>
      </div>
    </template>
    <template v-slot:item.creationDate="{ item }">
      <span class="creationDate">{{item.raw.creationDate}}</span>      
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
  width: '15%' as unknown as number
  },{
  title: 'summary',
  key: 'summary',
  align: 'start',
  sortable: false,
  value: 'summary',
  width: '70%' as unknown as number
},
  {
  title: 'date',
  key: 'creationDate',
  align: 'end',
  sortable: true,
  value: 'creationDate',
  width: '15%' as unknown as number
}
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
<style>
.title {
  font-size: 1.2em;
  font-weight: bold;
}
.titlediv {
  margin:2px 0;
}
.summary {
  font-size: 1em;
}
.summarydiv {
  margin:2px 0;
}

.thumbnail {
  min-width: 60px;
  max-width: 120px;
  margin:2px;
  height: auto;
}

.creationDate {
  font-size: 0.8em;
}
</style>
