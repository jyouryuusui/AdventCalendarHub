<template>
  <v-container style="max-width: 1200px;">
    
    <h1>{{ t('message.home') }}</h1>
    <p class="topinfo">{{ t('message.hometxt') }}</p>
    <!-- 検索窓の追加 -->
    <v-row>
      <v-col cols="9" style="max-width:600px;">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          class="mb-4"
          clearable
        ></v-text-field>
        <v-expansion-panels style="margin-top: -30px;">
          <v-expansion-panel>
          <v-expansion-panel-title>  
          </v-expansion-panel-title>  
          <v-expansion-panel-text>
              <v-row>
                <v-col cols="4">
                  <v-checkbox
                    v-model="searchIn.tags"
                    label="Tags"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4">
                  <v-checkbox
                    v-model="searchIn.summary"
                    label="Summary"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4">
                  <v-checkbox
                    v-model="searchIn.author"
                    label="Author"
                  ></v-checkbox>
                </v-col>
              </v-row>

            </v-expansion-panel-text>


          </v-expansion-panel>
        </v-expansion-panels>
        
      </v-col>
      <v-col cols="3">
        <!-- タグを表示する部分 -->
        <div class="tags">
          <v-chip
            v-for="tag in toptags.split(' ')"
            class="tagschip"
            :key="tag"
            size="x-small"
            @click="handleTipClick(tag)"
          >
            {{ tag }}
          </v-chip>
        </div>
      </v-col>
    <v-icon></v-icon>
    </v-row>
    
    <!--h1>Home5</h1>
    
    <br-->

    <v-data-table
      :headers="headers.map(header => ({ ...header, title: t(header.title) }))"
      :items="filteredArticles"
      :items-per-page="5"
      :sort-by="[{ key: 'articleId', order: 'desc'}]"
      :items-per-page-options="[
        { value: 5, title: '5' },
        { value: 10, title: '10' },
        { value: 25, title: '25' },
        { value: 50, title: '50' },
        { value: -1, title: 'All' }
      ]"
      dense
      style="padding:0 0 20px 0;white-space: pre-line;"
      items-per-page-text=""
    >
    <template v-slot:item.title="{ item }">
      <div v-if="display.smAndUp" >
        <a v-if="item.raw.articleUrl!=''" :href="item.raw.articleUrl" target="_blank" class="title" rel="noopener noreferrer">
          <v-img v-if="locale=='en'" :src="'thumbnail/'+item.raw.thumbnailUrl" aspect-ratio="1.7" class="thumbnail"></v-img>
          <v-img v-else :src="'../thumbnail/'+item.raw.thumbnailUrl" aspect-ratio="1.7" class="thumbnail"></v-img>
        
        </a>

        <a v-else-if="item.raw.thumbnailUrl!=''" href="">
          <v-img v-if="locale=='en'" :src="'thumbnail/'+item.raw.thumbnailUrl" aspect-ratio="1.7" class="thumbnail"></v-img>
          <v-img v-else :src="'../thumbnail/'+item.raw.thumbnailUrl" aspect-ratio="1.7" class="thumbnail"></v-img>
        </a>

    </div>
      
    </template>
    <template v-slot:item.articleId="{ item }">
      <div>
        <span class="creationDate">{{ item.raw.creationDate }}</span>

        <div v-if="!display.smAndUp" >
          <a v-if="item.raw.articleUrl!=''" :href="item.raw.articleUrl" target="_blank" class="title" rel="noopener noreferrer">
            <v-img v-if="locale=='en'" :src="'thumbnail/'+item.raw.thumbnailUrl" aspect-ratio="1.7" class="thumbnail"></v-img>
            <v-img v-else :src="'../thumbnail/'+item.raw.thumbnailUrl" aspect-ratio="1.7" class="thumbnail"></v-img>
          </a>
          
          <a v-else-if="item.raw.thumbnailUrl!=''" href="">
            <v-img v-if="locale=='en'" :src="'thumbnail/'+item.raw.thumbnailUrl" aspect-ratio="1.7" class="thumbnail"></v-img>
            <v-img v-else :src="'../thumbnail/'+item.raw.thumbnailUrl" aspect-ratio="1.7" class="thumbnail"></v-img>
          </a>
        </div>

        <div class="titlediv">
          <a v-if="item.raw.articleUrl!=''" :href="item.raw.articleUrl" target="_blank" class="title" rel="noopener noreferrer">{{item.raw.title[locale]}}</a>
          <span v-else class="title">{{item.raw.title[locale]}}</span>
        </div>
        <div class="summarydiv">
          <span class="summary">{{item.raw.summary[locale]}}</span>
        </div>

        <!-- タグを表示する部分 -->
        <div class="tags">
          <v-chip
            v-for="tag in item.raw.tags.split(' ')"
            class="tagschip"
            :key="tag"
            size="x-small"
            @click="handleTipClick(tag)"
          >
            {{ tag }}
          </v-chip>
        </div>

      </div>
    </template>
    <template v-slot:item.author="{ item }">
      <div class="d-flex flex-column align-center" v-if="display.smAndUp">
          <v-avatar  style="cursor: pointer;" size="40" @click="() => handleAuthorClick(item.raw.author.name)"> <!-- サイズを小さくする -->
            <v-img v-if="locale=='en'" :src="'icon/'+item.raw.author.icon"></v-img>
            <v-img v-else="locale=='en'" :src="'../icon/'+item.raw.author.icon"></v-img>
          </v-avatar>
          <!--span class="authorname"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 16 16"><path fill="currentColor" d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05L9.294 6.928ZM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843l-3.664-5.28Z"/></svg>{{ item.raw.author.name }}</span-->
          <span class="authorname" @click="() => handleAuthorClick(item.raw.author.name)">{{ item.raw.author.name }}
          <!--a v-if="item.raw.author.twitterUrl!=''" :href="item.raw.author.qiitaUrl" target="_blank" class="authorname" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 16 16"><path fill="currentColor" d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05L9.294 6.928ZM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843l-3.664-5.28Z"/></svg></a-->
          </span>

          <span>
            <a v-if="item.raw.author.twitterUrl!=''" :href="item.raw.author.twitterUrl" target="_blank" class="authorname" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 16 16"><path fill="currentColor" d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05L9.294 6.928ZM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843l-3.664-5.28Z"/></svg></a>
            <a v-if="item.raw.author.qiitaUrl!=''" :href="item.raw.author.qiitaUrl" target="_blank" class="authorname" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="15" viewBox="0 0 24 18"><path fill="currentColor" d="M3.57 8.343a3.653 3.653 0 0 0-1.376.269a3.585 3.585 0 0 0-1.14.738a3.503 3.503 0 0 0-.773 1.102A3.297 3.297 0 0 0 0 11.814a3.28 3.28 0 0 0 .281 1.357a3.535 3.535 0 0 0 .775 1.107A3.636 3.636 0 0 0 3.6 15.29a3.731 3.731 0 0 0 .987-.13a3.657 3.657 0 0 0 .888-.374l.687.698a.579.579 0 0 0 .824 0a.58.58 0 0 0 0-.817l-.624-.624a3.533 3.533 0 0 0 .613-1.022a3.282 3.282 0 0 0 .226-1.208a3.297 3.297 0 0 0-.282-1.362a3.488 3.488 0 0 0-.775-1.102A3.614 3.614 0 0 0 5 8.612a3.657 3.657 0 0 0-1.398-.27a3.653 3.653 0 0 0-.031 0zm11.306.185v1.484h-.765v1.063h.765v2.142c0 .419.053.761.159 1.028a1.56 1.56 0 0 0 .433.63a1.511 1.511 0 0 0 .643.317a2.676 2.676 0 0 0 .694.086h.853v-1.013h-.736a1.25 1.25 0 0 1-.352-.048a.713.713 0 0 1-.291-.169a.81.81 0 0 1-.2-.324a1.575 1.575 0 0 1-.074-.519v-2.13h1.666v-1.063h-1.66V8.528zM9.4 8.856a.69.69 0 0 0-.69.691a.69.69 0 0 0 .69.69a.69.69 0 0 0 .691-.69a.69.69 0 0 0-.69-.691zm2.771 0a.69.69 0 0 0-.69.691a.69.69 0 0 0 .69.69a.69.69 0 0 0 .691-.69a.69.69 0 0 0-.69-.691zm-8.6.538a2.324 2.324 0 0 1 .03 0a2.35 2.35 0 0 1 .93.187a2.346 2.346 0 0 1 1.264 1.28a2.463 2.463 0 0 1 .186.957a2.444 2.444 0 0 1-.186.957a2.384 2.384 0 0 1-.506.767a2.363 2.363 0 0 1-1.688.698a2.324 2.324 0 0 1-.93-.186a2.376 2.376 0 0 1-.755-.512a2.427 2.427 0 0 1-.699-1.723a2.44 2.44 0 0 1 .699-1.727a2.384 2.384 0 0 1 .756-.511a2.324 2.324 0 0 1 .898-.187zm17.648.773a2.69 2.69 0 0 0-1.02.201a2.49 2.49 0 0 0-.815.552a2.432 2.432 0 0 0-.525.814a2.678 2.678 0 0 0-.186.998a2.644 2.644 0 0 0 .186.997a2.485 2.485 0 0 0 .525.814a2.436 2.436 0 0 0 .815.546a2.697 2.697 0 0 0 1.059.2a2.42 2.42 0 0 0 .518-.056a2.524 2.524 0 0 0 .46-.146a2.426 2.426 0 0 0 .394-.213a2.394 2.394 0 0 0 .329-.263l.065.53H24v-4.829h-.976l-.068.533a2.498 2.498 0 0 0-.322-.26a2.25 2.25 0 0 0-.394-.217a2.616 2.616 0 0 0-.462-.145a2.404 2.404 0 0 0-.521-.056a2.69 2.69 0 0 0-.038 0zm-12.375.844v4.138h1.113V11.01zm2.77 0v4.138h1.114V11.01zm9.72.145a1.592 1.592 0 0 1 .024 0a1.557 1.557 0 0 1 1.098.445a1.495 1.495 0 0 1 .334.495a1.61 1.61 0 0 1 .121.631a1.632 1.632 0 0 1-.121.64a1.551 1.551 0 0 1-.331.498a1.47 1.47 0 0 1-.49.324a1.642 1.642 0 0 1-1.207 0a1.502 1.502 0 0 1-.493-.324a1.52 1.52 0 0 1-.333-.5a1.64 1.64 0 0 1-.122-.638a1.628 1.628 0 0 1 .12-.637a1.524 1.524 0 0 1 .328-.495a1.474 1.474 0 0 1 .49-.323a1.592 1.592 0 0 1 .581-.116z"/></svg></a>
          </span>
          
        </div>    
    </template>

    <template v-if="isFooterHidden" #bottom></template>

  </v-data-table>

</v-container>
</template>

<script setup lang='ts'>
//console.log("test0")
import { onMounted, computed, ref,watch } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useI18n } from 'vue-i18n'
import { useRoute,useRouter } from 'vue-router';

import { useDisplay } from 'vuetify'
const display = ref(useDisplay())

const route = useRoute();
const router = useRouter();


type ReadonlyHeaders = InstanceType<typeof VDataTable>['headers']


const { t, locale } = useI18n();

interface Article {
  title: { [key: string]: string };
  summary: { [key: string]: string };
  author: { [key: string]: string };
  categories: string ;
  tags: string ;
  creationDate: string ;
  articleId: number;
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
  key: 'articleId',
  align: 'start',
  sortable: true,
  value: 'articleId',
  //width: '70%' as unknown as number
},

  {
  title: 'author',
  key: 'author',
  align: 'end',
  sortable: false,
  value: 'author',
  //width: '15%' as unknown as number
}
];

const articles = ref<Article[]>([]);
const toptags = ref(''); 

const loadArticles = async () => {
  try {
    const response = await fetch('/articles.json'); // JSONファイルのパスを指定
    //console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    const data = await response.json();

    articles.value = data.data;
    toptags.value = data.tags;
    
    //console.log(articles.value);
  } catch (error) {
    console.error('Error loading articles:', error);
  }
};

// 検索関連の処理
const itemsPerPage = 5;
const isFooterHidden = computed(() => {
  return filteredArticles.value.length <= itemsPerPage;
});

const search = ref(''); // 検索語のためのリアクティブな参照
const searchIn = ref({
  title: true,
  summary: true,
  author: true,
  tags: true
});
watch(locale, () => {
  search.value = '';
});

watch(() => route.query.search, (newSearch: any) => {
  search.value = newSearch as string || '';
});
// アイコンクリック時のハンドラ
const handleAuthorClick =(authorName: string) => {
  console.log(authorName)
  search.value = authorName; // 検索窓に著者名をセット
  router.push({ query: { search: authorName } });
};
// Tipsをクリックした際に呼ばれるメソッド
const handleTipClick = (tip: string) => {
  search.value = tip; // 検索窓にTipをセット
  router.push({ query: { search: tip } });
};

// 検索された記事を計算する
const filteredArticles = computed(() => {
  if (!search.value) {
    return articles.value;
  }
  const lowerCaseSearch = search.value.toLocaleLowerCase(locale.value);
  return articles.value.filter(article =>
    (searchIn.value.tags && article.tags?.toLocaleLowerCase(locale.value).includes(lowerCaseSearch)) ||
    (searchIn.value.summary && article.summary[locale.value]?.toLocaleLowerCase(locale.value).includes(lowerCaseSearch)) ||
    (searchIn.value.summary && article.title[locale.value]?.toLocaleLowerCase(locale.value).includes(lowerCaseSearch)) ||
    (article.creationDate?.toLocaleLowerCase(locale.value).includes(lowerCaseSearch)) ||
    (searchIn.value.author && article.author.name?.toLocaleLowerCase(locale.value).includes(lowerCaseSearch))
  );
});



onMounted(loadArticles);
// コンポーネントがマウントされたときに実行される
onMounted(() => {
  // URLのクエリパラメータから検索値を取得
  const querySearch = route.query.search as string;
  if (querySearch) {
    search.value = querySearch;
  }
});

</script>
<style>
h1{
  font-size: 1.3em;
}

.title {
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  color: black; /* 文字色を黒色に設定 */
  text-decoration: none; /* アンダースコア（下線）を無くす */
}
.title:hover {
  color: black; /* ホバー時も文字色を黒色に保つ */
  text-decoration: none; /* ホバー時のアンダースコア（下線）も無くす */
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
  margin:2px;
  height: 160px;
}


.creationDate {
  font-size: 0.75em;
  text-align: center; /* 中央揃え */
  margin-top: 5px; /* アイコンとの間隔 */
}
.authorname {
  font-size: 0.75em;
  text-align: center; /* 中央揃え */
  margin-top: 5px; /* アイコンとの間隔 */
  cursor: pointer;
  color: black; /* 文字色を黒色に設定 */
  text-decoration: none; /* アンダースコア（下線）を無くす */
}

/* リンクにマウスをホバーしたときのスタイル（必要に応じて） */
.authorname:hover {
  color: black; /* ホバー時も文字色を黒色に保つ */
  text-decoration: none; /* ホバー時のアンダースコア（下線）も無くす */
}


/* アイコンと日付を縦に並べるためのスタイル */
.v-expansion-panel__shadow{
  box-shadow: none !important;
}
.tagschip{
  margin: 5px 2px;

}

.topinfo{
  margin: 5px 0;
  font-size: 0.8em ;
}


</style>
