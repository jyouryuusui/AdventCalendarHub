<template>
    <v-container fluid>

      <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <div class="text-center section">
          <v-row>
            
            <!-- 前の年 -->
            <!--v-col cols="1">
            <button id="prevyearbtn" type="button" class="vc-arrow vc-prev vc-focus ex-arrow" @click="moveprev">
              <svg stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" width="24" height="24" class="vc-base-icon">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            </v-col-->

            <!-- タイトル -->
            <v-col cols="12">
            <h2 class="h2">Houdini Advent Calendar</h2>
            </v-col>
            
            <!-- 次の年 -->
            <!--v-col cols="1">
            <button id="nextyearbtn" type="button" class="vc-arrow vc-next vc-focus ex-arrow" @click="movenext">
              <svg stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" width="24" height="24" class="vc-base-icon">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            </v-col-->
          </v-row>

          <v-col cols="12">
            <!-- 年タグ表示 -->
            <div class="tags">
              <v-chip
                v-for="tag in calendartags.split(' ')"
                class="tagschip"
                :key="tag"
                size="x-small"
                @click="handleTipClick(tag)"
              >
                {{ tag }}
              </v-chip>
            </div>
          </v-col>

          <!--/////////////// カレンダー ///////////////-->
          
          <v-calendar
            class="custom-calendar"
            :attributes="attributes"
            style="max-width: 800px;"
            ref="calendar"
            @update:pages="handleUpdatePage"
            :initial-page=initialPage
            :locale=locale
          >

            <!-- カレンダー内の1日分テンプレート -->
            <template v-slot:day-content="{ day, attributes }">
              <v-row>
                <v-col cols="12" style="width:100%;min-width:120px;">
                  <v-card 
                    elevation="0"
                    outlined
                    style="border-radius: 0;width:100%;min-height: 120px;"
                  >  
                    <div style="width:100%;min-height:120px;background-color:fff;">
                      <div>
                        <span class="">{{ day.day }}</span>
                      </div>
                      
                      <p
                        v-for="attr in attributes"
                        :key="attr.key"
                        class=""
                        :class="attr.customData.class"
                      >
                        <div class="" style=" width:100%;padding:2px;">
                          <!-- 記事情報カード -->
                          <v-card
                            size="x-small"
                            elevation="0"
                            :class="getCardClass(attr.type)"
                            style="font-size: 0.7em;padding:1px;border: 1px solid #e2e8f0;"
                            @click="openInNewTab(attr)"
                          >
                              <!-- サムネイル画像 -->

                              <div v-if="attr.customData.thumbnailUrl!=''">
                                <v-img v-if="locale=='en'" :src="'thumbnail/'+attr.customData.thumbnailUrl" aspect-ratio="1" class="calendar-thumbnail centered-image"></v-img>
                                <v-img v-else :src="'../thumbnail/'+attr.customData.thumbnailUrl" aspect-ratio="1" class="calendar-thumbnail centered-image"></v-img>
                              </div>


                              <!-- タイトルと作者名 -->
                              <div>
                                <span>{{ attr.customData.title[locale] }}</span>
                              </div>
                              <div class="avatar-margin">
                                <span>
                                  <v-avatar v-if="attr.type=='firebase'&&attr.customData.icon!=''" size="12">
                                    <v-img :src="attr.customData.icon"></v-img>
                                  </v-avatar>

                                  <v-avatar v-else-if="attr.customData.icon!=''" size="12">
                                    <v-img v-if="locale=='en'" :src="'icon/'+attr.customData.icon"></v-img>
                                    <v-img v-else :src="'../icon/'+attr.customData.icon"></v-img>
                                  </v-avatar>

                                  <span v-if="attr.type=='firebase'" >
                                  @{{ attr.customData.author }}
                                  </span>
                                  <span v-else class="mx-1">
                                  {{ attr.customData.author }}
                                  </span>
                                  
                                
                                </span>
                              </div>

                          </v-card>
                        </div>
                      </p>
                      
                      
                      <!-- 記事追加プラスボタン -->
                      <v-card v-if="day.day<26&&day.month==eventMonth&&day.year==eventYear" elevation="0" style="border-radius:0px;" @click="openDialog(day.date)">
                        <v-icon style="color:darkgray;vertical-align: middle;height: 100px;">
                          mdi-plus
                        </v-icon>
                      </v-card>

                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-calendar>
        </div>
      </v-col>
    </v-row>





    <!--Firestore 登録ダイアログ-->
    <v-dialog v-if="selectedDate!=null" v-model="dialog" persistent max-width="600px" @click:outside="closeDialog">
      <v-card class="pa-6">
        <div class="align-center">
          <v-card-title v-if="typeof selectedDate === 'string'" class="text-center text-h2 text--primary">
              {{ parseInt((selectedDate.toString()).slice(-2), 10)  }}
          </v-card-title>
        </div>
        <div class="align-center">
          <v-card-text class="text-center text-h6">
            {{ selectedDate.substring(0, 7)  }}
          </v-card-text>
        </div>
        <v-divider></v-divider>

        <v-card-text class="text-h6">
          {{t('dialog.dialogtitle')}}
        </v-card-text>
    
        <!-- 登録フォーム -->
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Author Name -->
              <v-col cols="12">
                <v-text-field :label="t('dialog.author')+ '*'" required v-model="guestAuthor"  variant="outlined" dense></v-text-field>
              </v-col>

              <!-- Article Title -->
              <v-col cols="12">
                <v-text-field :label="t('dialog.title')+ '*'" required v-model="guestTitle"  variant="outlined" dense></v-text-field>
              </v-col>

              <!-- Article URL -->
              <v-col cols="12">
                <v-text-field :label="t('dialog.url')" required v-model="guestUrl"  variant="outlined" dense></v-text-field>
              </v-col>


              <!-- Article URL -->
              <v-col cols="12">
                <v-textarea :label="t('dialog.summary')" required v-model="guestSummary"  rows="3" variant="outlined" dense></v-textarea>
              </v-col>


            </v-row>
          </v-container>
        </v-card-text>

        <p v-if="!store.state.user" style="font-size: x-small; text-align: right; "> {{t('dialog.message')}}</p>
        <p v-if="store.state.user" style="font-size: x-small; text-align: right; "> {{t('dialog.loginMessage')}}<strong>{{store.state.user.displayName}}</strong></p>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Googleでサインインするボタン -->
          <v-btn  v-if="!store.state.user" elevation="1" class="bg-black" color="white"  @click="signInWithGoogle"><v-icon class="mx-1" size="small">mdi-google</v-icon> {{t('dialog.login')}}</v-btn>
          <v-btn  v-if="store.state.user" elevation="1" class="bg-black" color="white"  @click="logout"><v-icon class="mx-1" size="small">mdi-google</v-icon> {{t('dialog.logout')}}</v-btn>

          <!-- Close Button -->
          <v-btn  elevation="1" class="bg-black" color="white"  @click="dialog = false">
            {{t('dialog.close')}}
          </v-btn>

          <!-- Register Button -->
          <v-btn v-if="store.state.user" :disabled="!guestAuthor||!guestTitle" elevation="1" class="bg-black" color="white"  @click="registerArticle">
            {{t('dialog.register')}}
          </v-btn>
        </v-card-actions>
      </v-card>
      
    </v-dialog>

    <!--情報詳細閲覧・遷移前確認ダイアログ-->
    <v-dialog v-if="selectedCard!=null" v-model="hrefDialog" persistent max-width="600px" @click:outside="closeDialog">
      
      <v-card class="pa-10">
        
         <!-- これは何日かを示すタイトル -->
        <div class="align-center">
          <v-card-title v-if="typeof selectedCard.dates === 'string'" class="text-center text-h2 text--primary">
              {{ parseInt((selectedCard.dates.toString()).slice(-2), 10)  }}
          </v-card-title>
        </div>
        <div class="align-center">

          <v-card-text class="text-center text-h6">
            {{ (selectedCard.dates.toString()).substring(0, 7)  }}
          </v-card-text>
        </div>

        <!-- サムネイル画像 -->
        <!-- すでに登録されている静的データ -->
        <div v-if="selectedCard.type=='json'&&selectedCard.customData.thumbnailUrl!=''">
          <a  :href="selectedCard.customData.articleUrl" target="_blank" rel="noopener noreferrer">
            <v-img v-if="locale=='en'" :src="'thumbnail/'+selectedCard.customData.thumbnailUrl" aspect-ratio="1" class="dialog-thumbnail centered-image"></v-img>
            <v-img v-else :src="'../thumbnail/'+selectedCard.customData.thumbnailUrl" aspect-ratio="1" class="dialog-thumbnail centered-image"></v-img>
          </a>
        </div>


        <!-- タイトル -->
        <v-card-text class="text-h6">
          <div class="py-1">
            <a  :href="selectedCard.customData.articleUrl" class="title" target="_blank" rel="noopener noreferrer">
            <strong>{{ selectedCard.customData.title[locale] }}</strong>
            </a>
          </div>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-text>
          <v-container>
            <v-row cols="12">
              <v-card-text>
                {{selectedCard.customData.summary[locale]}}
              </v-card-text>
            </v-row>
            <v-row cols="12">
              <!-- Author Name -->
                <v-card-text style="text-align: right;">
                  
                  
                  <!--v-avatar v-if="selectedCard.customData.icon!=''" size="20">
                    <v-img v-if="locale=='en'" :src="'icon/'+selectedCard.customData.icon"></v-img>
                    <v-img v-else :src="'../icon/'+selectedCard.customData.icon"></v-img>
                  </v-avatar-->

                  <v-avatar v-if="selectedCard.type=='firebase'&&selectedCard.customData.icon!=''" size="20">
                    <v-img :src="selectedCard.customData.icon"></v-img>
                  </v-avatar>

                  <v-avatar v-else-if="selectedCard.customData.icon!=''" size="20">
                    <v-img v-if="locale=='en'" :src="'icon/'+selectedCard.customData.icon"></v-img>
                    <v-img v-else :src="'../icon/'+selectedCard.customData.icon"></v-img>
                  </v-avatar>

                  <span v-if="selectedCard.type=='firebase'" >
                  @{{ selectedCard.customData.author }}
                  </span>
                  <span v-else class="mx-1">
                  {{ selectedCard.customData.author }}
                  </span>
                </v-card-text>
              </v-row>
              <v-row cols="12">

                <v-card-text  v-if="isValidHttpUrl(selectedCard.customData.articleUrl)">
                  <a :href="selectedCard.customData.articleUrl"  class="link-text" target="_blank">{{selectedCard.customData.articleUrl}}</a>
                </v-card-text>
                <v-card-text  v-else>
                  {{selectedCard.customData.articleUrl}}
                </v-card-text>

            </v-row>
          </v-container>
        </v-card-text>

        <!-- Googleでサインインするボタン -->
        <p v-if="!store.state.user&&selectedCard.type=='firebase'" style="font-size: x-small; text-align: right; "> {{t('dialog.message')}}</p>
        <p v-if="store.state.user&&selectedCard.type=='firebase'" style="font-size: x-small; text-align: right; "><span v-if="store.state.user.uid==selectedCard.customData.userId">{{t('dialog.whoMessage')}}</span> {{t('dialog.loginMessage')}}<strong>{{store.state.user.displayName}}</strong></p>


        <v-card-actions v-if="store.state.user&&selectedCard.type=='firebase'&&store.state.user.uid==selectedCard.customData.userId" >
          <v-spacer></v-spacer>

          <v-btn elevation="1" class="bg-blue-darken-2" color="white" @click="loadArticleForEdit(selectedCard)">{{t('dialog.edit')}}</v-btn>

          <v-btn elevation="1" class="bg-red-darken-2" color="white" @click="openDeleteConfirm(selectedCard.key)">{{t('dialog.delete')}}</v-btn>

          
        </v-card-actions>


        <v-card-actions>
          <v-spacer></v-spacer>

          <!-- Googleでサインインするボタン -->
          <v-btn  v-if="!store.state.user&&selectedCard.type=='firebase'" elevation="1" class="bg-black" color="white"  @click="signInWithGoogle"><v-icon class="mx-1" size="small">mdi-google</v-icon> {{t('dialog.login')}}</v-btn>
          <v-btn  v-if="store.state.user&&selectedCard.type=='firebase'" elevation="1" class="bg-black" color="white"  @click="logout"><v-icon class="mx-1" size="small">mdi-google</v-icon> {{t('dialog.logout')}}</v-btn>

          <!-- Close Button -->

          <v-btn  elevation="1" class="bg-black" color="white" @click="hrefDialog = false">
            {{t('dialog.close')}}
          </v-btn>

          <!-- Register Button -->
          <v-btn  elevation="1" class="bg-blue-darken-2" color="white" v-if="selectedCard.customData.articleUrl && isValidHttpUrl(selectedCard.customData.articleUrl)" :href="selectedCard.customData.articleUrl" target="_blank">
            {{t('dialog.launch')}}
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>


    <!--情報編集ダイアログ-->
    <v-dialog v-model="editDialog" max-width="600px">
      <v-card class="pa-6">
        <v-card-title class="headline">{{t('dialog.edit')}}</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Author Name -->
              <v-col cols="12">
                <v-text-field :label="t('dialog.author')+ '*'" required v-model="guestAuthor"  variant="outlined" dense></v-text-field>
              </v-col>

              <!-- Article Title -->
              <v-col cols="12">
                <v-text-field :label="t('dialog.title')+ '*'" required v-model="guestTitle"  variant="outlined" dense></v-text-field>
              </v-col>

              <!-- Article URL -->
              <v-col cols="12">
                <v-text-field :label="t('dialog.url')" required v-model="guestUrl"  variant="outlined" dense></v-text-field>
              </v-col>


              <!-- Article URL -->
              <v-col cols="12">
                <v-textarea :label="t('dialog.summary')" required v-model="guestSummary"  rows="3" variant="outlined" dense></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn elevation="1" class="bg-grey-darken-2" color="white" @click="editDialog = false">{{t('dialog.cancel')}}</v-btn>
          <v-btn elevation="1" class="bg-blue-darken-2" :disabled="!guestAuthor||!guestTitle" color="white" @click="updateArticle">{{t('dialog.update')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteConfirmDialog" persistent max-width="400">
      <v-card class="pa-6">
        <v-card-title class="headline">{{t('dialog.deleteTitle')}}</v-card-title>
        <v-card-text>{{t('dialog.deleteMessage')}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="bg-grey-darken-2" color="white"  @click="deleteConfirmDialog = false">{{t('dialog.cancel')}}</v-btn>
          <v-btn class="bg-red-darken-2" color="white"  @click="confirmDelete">{{t('dialog.delete')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>



</template>

<script setup lang="ts">
import { ref, onMounted,computed } from 'vue';
import 'v-calendar/style.css';

import { useStore } from 'vuex';
import { State } from '@/store/types';
import { CalendarAttribute } from '@/store/types';

//import { getFirestore, addDoc, collection, serverTimestamp, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { getFirestore, addDoc, collection, serverTimestamp, query, getDocs, doc, deleteDoc,updateDoc } from 'firebase/firestore';

import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged, signOut  } from 'firebase/auth';


const calendartags = computed(() => store.state.config.calendarTags);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // ユーザー情報は result.user で取得可能
    // 認証成功時の処理
    console.log('認証成功:', result.user);
  } catch (error) {
    console.error('認証に失敗しました', error);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // ユーザーが認証されている場合の処理
    console.log('ユーザーが認証されています');
    store.commit('setUser', user);  // ユーザー情報をVuexストアに保存
  } else {
    // ユーザーが認証されていない場合の処理
    console.log('ユーザーが認証されていません');
    store.commit('setUser', null);  // ユーザー情報をクリア
  }
});
// ログアウトする関数
const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log('ログアウトしました');
    // ログアウト後の処理（オプション）
  } catch (error) {
    console.error('ログアウトに失敗しました:', error);
  }
};


const db = getFirestore();

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();

const calendar = ref(null);
//const fixedDate = ref(null); // 2023年12月1日（月は0から始まるため、11が12月）



let eventMonth:number = new Date().getMonth();//閲覧した月
let eventYear:number = new Date().getFullYear();//開催中の年

//その年の10月までは前年度のアドカレを表示
if (eventMonth < 10) {
  eventYear = eventYear - 1;
}
eventMonth = 12;//12月に固定

const initialPage = ref({ month: eventMonth, year: eventYear });
const nowPage = ref(initialPage);

const dialog = ref(false);
const hrefDialog = ref(false);

//const selectedDate = ref("");
//const selectedDate = ref(new Date().toISOString().substr(0, 10)).value;
//new Date での月は0から始まるため、11が12月 、マイナス１する
const selectedDate = ref(formatDate(new Date(initialPage.value.year, initialPage.value.month - 1 , 1)));

//test
const guestAuthor = ref('');
const guestTitle = ref('');
const guestUrl = ref('');
const guestSummary = ref('');

const deleteConfirmDialog = ref(false);


const store = useStore<State>();


// Vuexストアからarticlesを取得
const articles = computed(() => store.state.articles);
// カレンダーの属性
//const attributes = ref([]);
const attributes = ref<CalendarAttribute[]>([]);

const selectedCard = ref<CalendarAttribute>();


// Firestoreにデータを書き込む関数の修正
const writeToFirestore = async () => {
  console.log("writeToFirestore");
  try {
    await addDoc(collection(db, 'myCollection'), {
      author: guestAuthor.value,
      title: guestTitle.value,
      date: selectedDate.value,
      summary: guestSummary.value,
      userId: store.state.user.uid,
      icon: store.state.user.photoURL, // アイコンURLを保存
      url: guestUrl.value,
      timestamp: serverTimestamp(),
    });
    await fetchAndFormatFirestoreData(); 
  } catch (error) {
    console.error('Error adding document: ', error);
    // ...
  }
};

const deleteToFirestore = async (docId: string) => {
  try {
    await deleteDoc(doc(db, 'myCollection', docId));
    console.log('ドキュメントを削除しました');
    attributes.value = attributes.value.filter(attr => attr.key !== docId);
    //await fetchAndFormatFirestoreData(); 
  } catch (error) {
    console.error('ドキュメントの削除に失敗しました', error);
  }
};




// Firestoreから記事情報を取得し、CalendarAttribute型に整形する関数
async function fetchAndFormatFirestoreData() {
  try {
    const querySnapshot = await getDocs(collection(db, 'myCollection'));
    const firestoreData = querySnapshot.docs.map(doc => {
    const data = doc.data();

    return {
      key: doc.id, // 文字列のドキュメントIDを数値に変換
      type: 'firebase', // Firebaseからのデータ
      dates: data.date, // 日付をDateオブジェクトに変換
      customData: {
        title: {
          ja: data.title,
          en: data.title // 同じタイトルを使用
        },
        author: data.author,
        summary:  {
          ja: data.summary,
          en: data.summary// 同じサマリを使用
        },
        userId: data.userId,
        icon: data.icon, // アイコンのURLがない場合は空文字列
        thumbnailUrl: '', // サムネイルのURLがない場合は空文字列
        articleUrl: data.url, // 記事のURL
        class: 'text-black' // スタイルのクラス
      }
    };
  });

    // Vuexストアから取得した記事と結合
    //attributes.value = [...attributes.value, ...firestoreData];
    attributes.value = [...attributes.value.filter(attr => attr.type !== 'firebase'), ...firestoreData];
    
    console.log(attributes);
    console.log("firestoreData---------------");
    console.log(firestoreData);
  } catch (error) {
    console.error('Error fetching Firestore data:', error);
  }
}

onMounted(async () => {
  console.log("onMounted");
  await store.dispatch('fetchArticles'); // Vuexストアから記事を読み込む

  // JSONデータをCalendarAttribute型に整形し、attributesに追加
  const jsonAttributes = articles.value.map((article, index) => ({
    key: index.toString(),
    type: 'json', // JSONからのデータ
    dates: article.creationDate,
    customData: {
      title: {
        ja: article.title.ja,
        en: article.title.en
      },
      author: article.author.name,
      summary: {
        ja: article.summary.ja,
        en: article.summary.en
      },
      userId: '',
      icon: article.author.icon,
      articleUrl: article.articleUrl,
      thumbnailUrl: article.thumbnailUrl,
      class: 'text-black'
    }
  }));

  attributes.value = [...jsonAttributes]; // JSONデータを先に追加

  // Firestoreデータの取得と整形、attributesに追加
  fetchAndFormatFirestoreData(); // Firestoreからデータを取得し、整形してattributesに追加

  // 既存の静的な属性データもここでattributesに追加することができます
  // attributes.value = [...attributes.value, ...staticAttributes];
});



// ストアから記事を読み込む
store.dispatch('fetchArticles');

//console.log("articles.value");
//console.log(articles.value);

type MyDocument = {
  docId: string;
  title: string;
  content: string;
};

const items = ref<MyDocument[]>([]);
//test kokomade

const openDialog = (date:Date) => {
  selectedDate.value = formatDate(date);
  //reset value
  guestAuthor.value="";
  guestTitle.value="";
  guestUrl.value="";
  guestSummary.value="";

  dialog.value = true;
};

// Tipsをクリックした際に呼ばれるメソッド
async function handleTipClick(tip: string){
  //console.log(tip);

  if (calendar.value && selectedDate.value) {
    const currentYear = new Date(selectedDate.value).getFullYear();
    const tipYear = Number(tip);

    //継承する場合はこちら
    //const month = new Date(selectedDate.value).getMonth()+1;
    const month = 12;
    
    
    selectedDate.value = formatDate(new Date(tipYear, month, 1));
    
    nowPage.value = { month: month, year: tipYear };
    await (calendar.value as any).move({ year: tipYear, month: month });
  }

};

function openInNewTab(attr: CalendarAttribute) {
  if(attr.type=='json'){
    //url = '../'+url;
    //window.open(attr.customData.articleUrl , '_blank');
    console.log("openInNewTab");
    console.log(attr);
    selectedCard.value = attr;
    hrefDialog.value = true;

  }else{
    console.log("openInNewTab");
    console.log(attr);

    selectedCard.value = attr;
    hrefDialog.value = true;
  }

}

const registerArticle = () => {
  console.log("registerArticle");
  console.log("Selected date:", selectedDate.value);

  if (!store.state.user) {
    signInWithGoogle();  // ログインしていない場合は、ログイン画面を表示
    return;
  }
  // ログインしている場合は、記事の登録処理を続ける

  //guestDate.value = selectedDate.value;
  writeToFirestore();

  dialog.value = false;
};

const deleteArticle = (docId: string) => {
  console.log("deleteArticle");
  deleteToFirestore(docId);
  hrefDialog.value = false;
};

const navigateToArticle = () => {
  console.log("navigateToArticle");
};

const closeDialog = () => {
  dialog.value = false;
  hrefDialog.value = false;
};

const test = () => {
  console.log("test");
};

const editDialog = ref(false);
const editData = ref<CalendarAttribute>();

// 記事のデータを編集用フォームに読み込む
function loadArticleForEdit(article: CalendarAttribute) {
  editData.value = { ...article };
  guestAuthor.value=editData.value.customData.author;
  guestTitle.value=editData.value.customData.title.en;
  guestSummary.value=editData.value.customData.summary.en;
  guestUrl.value=editData.value.customData.articleUrl;

  editDialog.value = true;
}

// 記事を更新する
async function updateArticle() {
  // Firebaseに更新を保存
  if(editData.value){
    const docRef = doc(db, 'myCollection', editData.value.key);
    await updateDoc(docRef, { 
      author: guestAuthor.value,
      title: guestTitle.value, 
      summary: guestSummary.value,
      url: guestUrl.value,
      timestamp: serverTimestamp(),

    });

  }

  // ダイアログを閉じる
  editDialog.value = false;
  hrefDialog.value = false;

  // データを再読込
  fetchAndFormatFirestoreData();
}




function getCardClass(type:string) {
  if (type == 'json') {
    return 'background-color-json'; // JSONデータ用のクラス
  } else if (type == 'firebase') {
    return 'background-color-firebase'; // Firebaseデータ用のクラス
  }
}



async function movenext() {
  if (calendar.value && selectedDate.value) {
    const currentYear = new Date(selectedDate.value).getFullYear();
    const nextYear = currentYear + 1;
    const month = new Date(selectedDate.value).getMonth()+1;
    selectedDate.value = formatDate(new Date(nextYear, month, 1));
    nowPage.value = { month: month, year: nextYear };
    await (calendar.value as any).move({ year: nextYear, month: month });
  }

}
async function moveprev() {
  if (calendar.value && selectedDate.value) {
    const currentYear = new Date(selectedDate.value).getFullYear();
    const prevYear = currentYear - 1;
    const month = new Date(selectedDate.value).getMonth()+1;
    selectedDate.value = formatDate(new Date(prevYear, month, 1));
    nowPage.value = { month: month, year: prevYear };
    await (calendar.value as any).move({ year: prevYear, month: month });
  }
}

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'myCollection'));
  items.value = querySnapshot.docs.map(doc => ({
    docId: doc.id,
    ...doc.data()  as Omit<MyDocument, 'docId'>
  }));


});


const handleUpdatePage = (pages:any) => {
  nowPage.value = { month: pages[0].month, year: pages[0].year };
  selectedDate.value = formatDate(new Date(pages[0].year,pages[0].month-1, 1));
  //console.log(initialPage.value)

};

// 削除確認用ダイアログを開く
function openDeleteConfirm(docId: string) {
  // 確認ダイアログを開く前に、削除するドキュメントIDを保存
  currentDeletingDocId.value = docId;
  deleteConfirmDialog.value = true;
}

// 削除処理を実行
function confirmDelete() {
  deleteArticle(currentDeletingDocId.value);
  deleteConfirmDialog.value = false;
}

// 現在削除しようとしているドキュメントのID
const currentDeletingDocId = ref('');


function formatDate(dt: Date): string {
  const year = dt.getFullYear().toString();
  const month = ('0' + (dt.getMonth() + 1).toString()).slice(-2);
  const day = ('0' + dt.getDate().toString()).slice(-2);
  return `${year}-${month}-${day}`;
}

function isValidHttpUrl(string: string): boolean {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

</script>

<style lang="postcss" scoped>
.custom-calendar {
  max-width: 100%; /* 幅を親要素に合わせる */
  overflow-x: auto; /* 横スクロールを有効にする */
}
.v-calendar .day-content {
  overflow: hidden; /* はみ出た内容を非表示 */
  text-overflow: ellipsis; /* はみ出た内容を省略記号で表示 */
}
/deep/ .vc-day{
  border: 1px solid #f5f5f5;
}
/deep/ .custom-calendar.vc-container {
  --vc-border: #f5f5f5;
}
/deep/ .vc-arrow.vc-prev.vc-focus, /deep/ .vc-arrow.vc-next.vc-focus {
  color: black;            /* 例: テキスト色を白に設定 */
}
.ex-arrow{
  margin:2px;
  width:30px;
  height: 30px;
  padding-top: 2px;
}
.ex-arrow:hover {
  background-color: #e2e8f0;
  border-radius: 5px;
  }


.image-container {
  text-align: center; /* コンテナを中央揃えにする */
}

.centered-image {
  margin-top: 4px;
  margin-bottom: 2px;
  margin-left: auto; /* 左側のマージンを自動に設定 */
  margin-right: auto; /* 右側のマージンを自動に設定 */

}
  .calendar-thumbnail {
    width: 60px;
    height: 60px;
  }
  
  
  .dialog-thumbnail{
    width: 250px;
    height: 250px;
  }

  .avatar-margin{
    margin:12px 0;
  }


.background-color-json {
  background-color: #f5f5f5; /* 例: JSONデータ用の色 */
}

.background-color-firebase {
  background-color: #e2e8f0; /* 例: Firebaseデータ用の色 */
}

.link-text {
  color: #1976D2; /* Vuetify のプライマリカラー */
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.title {
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  color: black; 
  text-decoration: none;
}
.title:hover {
  color: black;
  text-decoration: none;
}
</style>
