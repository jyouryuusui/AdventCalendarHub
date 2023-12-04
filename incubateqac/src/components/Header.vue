<template>
    <v-app-bar app color="black" dark>
      <!-- Advent Calendar  -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="goHome" style="cursor: pointer;">Houdini Advent Calendar Hub</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs v-show="display.mdAndUp">
        <v-tab :to="homeUrl">{{ t('message.home') }}</v-tab>
        <v-tab :to="calendarUrl">{{ t('message.calendar') }}</v-tab>
        <v-tab :to="aboutUrl">{{ t('message.about') }}</v-tab>
        
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn style="top:14px;" v-bind="props">
              <v-icon>mdi-web</v-icon>
              {{ currentLanguage.toUpperCase() }}
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item 
              v-for="language in languageOptions" 
              :key="language.code" 
              @click="changeLanguage(language.code)"
            >
            <v-list-item-title>{{ language.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tabs>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
      <!-- モバイル用のタブをここに配置 -->
      <v-list-item v-if="display.smAndDown" :to="homeUrl">
        <v-list-item-title>{{ t('message.home') }}</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="display.smAndDown" :to="calendarUrl">
        <v-list-item-title>{{ t('message.calendar') }}</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="display.smAndDown" :to="aboutUrl">
        <v-list-item-title>{{ t('message.about') }}</v-list-item-title>
      </v-list-item>

      <!-- PC用の追加オプション -->
      <v-list-item  @click="navigateToOption('2023')">
        <v-list-item-title>2023</v-list-item-title>
      </v-list-item>
      <v-list-item  @click="navigateToOption('2022')">
        <v-list-item-title>2022</v-list-item-title>
      </v-list-item>
      <v-list-item  @click="navigateToOption('2021')">
        <v-list-item-title>2021</v-list-item-title>
      </v-list-item>
      <v-list-item  @click="navigateToOption('2020')">
        <v-list-item-title>2020</v-list-item-title>
      </v-list-item>
      <v-list-item  @click="navigateToOption('2019')">
        <v-list-item-title>2019</v-list-item-title>
      </v-list-item>
      <v-list-item  @click="navigateToOption('2018')">
        <v-list-item-title>2018</v-list-item-title>
      </v-list-item>
      <v-list-item  @click="navigateToOption('2017')">
        <v-list-item-title>2017</v-list-item-title>
      </v-list-item>
      <v-list-item  @click="navigateToOption('2016')">
        <v-list-item-title>2016</v-list-item-title>
      </v-list-item>


    </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch,computed } from 'vue';
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const display = ref(useDisplay())
const router = useRouter();

const { t, locale } = useI18n();
const currentLanguage = ref(locale.value);

const drawer = ref(false);

interface LanguageOption {
  code: string;
  name: string;
}
const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English (EN)' },
  { code: 'ja', name: '日本語 (JA)' }//,
  //{ code: 'fr', name: 'Fr (FR)' }
  // 他の言語オプションを追加
];

interface LanguagePathMap {
  [key: string]: string;
}

const languageToPath: LanguagePathMap = {
  en: '',
  ja: '/ja'//,
  //fr: '/fr'
  // 他の言語を追加
};

const generateUrl = (path: string): string => {
  const prefix = languageToPath[locale.value] || '';
  return `${prefix}${path}`;
};

const homeUrl = computed(() => generateUrl('/'));
const aboutUrl = computed(() => generateUrl('/about'));
const calendarUrl = computed(() => generateUrl('/calendar'));



//watch(currentLanguage, (newLocale) => {
//  locale.value = newLocale;
//});
watch(locale, (newLocale) => {
  currentLanguage.value = newLocale;
});

function changeLanguage(newLang: string) {
  currentLanguage.value = newLang;
  locale.value = newLang; // Vue I18n のロケールを更新

  // 現在のルートパスから言語部分を取り除く
  let newPath = router.currentRoute.value.path;
  Object.keys(languageToPath).forEach((code) => {
    newPath = newPath.replace(new RegExp(`^/${code}/?`), '/');
  });

  // 新しい言語のプレフィックスを追加する
  const languagePrefix = newLang === 'en' ? '' : `/${newLang}`;
  router.push(languagePrefix + newPath);
}


const goHome = () => {
  const homePath = locale.value === 'en' ? '/' : `/${locale.value}/`;
  router.push(homePath);
};

function navigateToOption(optionTitle: string) {
  // ここで optionTitle に基づいたナビゲーション処理を行います
  // 例えば、タイトルに応じた URL にリダイレクトする等
  // console.log("Navigating to option: " + optionTitle);
  // router.push({ name: 'OptionPage', params: { option: optionTitle } });
  // homeUrl にナビゲートし、検索クエリに optionTitle を追加
  router.push({ path: homeUrl.value, query: { search: optionTitle } });
}


</script>
