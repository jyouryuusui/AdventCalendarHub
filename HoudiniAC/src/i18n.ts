import { createI18n } from 'vue-i18n';


// 現在のURLに基づいてデフォルトの言語を決定
//const defaultLocale = window.location.pathname.startsWith('/ja/') ? 'ja' : 'en';
// 言語オプションとURLプレフィックスのマッピング
const languageToPath = {
  en: '',   // 英語はプレフィックスなし
  ja: '/ja', // 日本語
  //fr: '/fr', // フランス語
  // 他の言語を追加
};

// URLから言語を決定する関数
const determineLocale = () => {
  const path = window.location.pathname;

  for (const [code, prefix] of Object.entries(languageToPath)) {
    if (path.startsWith(prefix)) {
      return code;
    }
  }
  return 'en'; // デフォルト言語
};

//const defaultLocale = determineLocale();

const messages = {
  en: {
    message: {
      home: 'Search',
      about: 'About',
      calendar: 'Calendar',
      hometxt: 'This site is for searching articles of Houdini Advent Calendar.',
      searchconfig:{
        tags: 'Tags',
        summary: 'Summary',
        author: 'Author'
      },
      calendartxt: 'What is an advent calendar?',
      abouttxt: 'What is the advent calendar?',
      history: [
        'The advent calendar in the Japanese technical community comes from the traditional calendar that counts down the days until Christmas. In this calendar, the days until Christmas are counted by opening one calendar window each day. In Japan, this tradition has evolved in its own way into a culture of publishing an article or blog post every day from December 1 to 25, especially in the technical community. This culture is developed through web services such as Qiita Advent Calendar and Adventar.' ,
        'This custom was reportedly started by the Perl community in 2000 and began spreading in Japan around 2008. In the Japanese technical community, this culture spread through X (Twitter) and spread to various technical fields.' ,
        'The Houdini Advent Calendar began in November 2016 at a CG event in Japan, with a conversation about how interesting it would be to have an advent calendar for Houdini as well, so let\'s create one. The number of articles, which were counted in the beginning, has grown over the years and now stands at several hundred articles.' ,
        'The advent calendar is also used as a means of learning and output, and especially for young engineers, it is an opportunity to share their knowledge and experience and contribute to the community. It is also a very attractive event for readers, as they can gain new information on topics of interest to them.'
      ],
    },
    dialog:{
      dialogtitle: "Register Aricle Link",
      author: "Author",
      title: "Article Title",
      url: "Article URL",
      summary: "Summary",

      close: "Close",
      register: "Register",

      edit: "Edit",
      cancel: "Cancel",
      update: "Update",
      delete: "Delete",
      
      launch: "Link Button",
      login: "Login",
      logout: "Logout",
      message: "Sign in with your Google account to register and edit link to article",
      whoMessage: "Editable : ",
      loginMessage: "Login : ",
      deleteTitle: "Confirmation of deletion",
      deleteMessage: "Are you sure you want to delete this article link?",

      
    },
    search: "Search",
    thumbnail: "",
    summary: "",
    author: ""
  
  },
  ja: {
    message: {
      home: '記事検索',
      about: '概要',
      calendar: 'カレンダー',
      hometxt: 'Houdini Advent Calendarの記事を検索するためのサイトです。',
      searchconfig:{
        tags: 'タグ',
        summary: '概要',
        author: '著者'
      },
      calendartxt: 'アドベントカレンダーとは？',
      abouttxt: 'アドベントカレンダーとは？',
      history: [
        '日本の技術コミュニティにおけるアドベントカレンダーは、クリスマスまでの期間をカウントダウンする伝統的なカレンダーに由来しています。このカレンダーでは、毎日一つずつカレンダーの窓を開けることで、クリスマスまでの日数を数えます。日本では、この伝統が独自の形で進化し、特に技術コミュニティにおいて12月1日から25日まで毎日、記事やブログポストを公開する文化となっています。この文化は、QiitaアドベントカレンダーやAdventarなどのウェブサービスを通じて展開されています​​。',
        'この習慣は、2000年にPerlコミュニティによって始められたとされ、日本では2008年頃から広まり始めました。日本の技術コミュニティでは、X(Twitter)を通じてこの文化が広がり、様々な技術分野に広がっていきました​​。',
        'Houdiniアドベントカレンダーは、2016年11月に日本のCGイベントで、「Houdiniもアドベントカレンダーがあると面白いから作ろう」という会話から始まりました。当初は数えるほどだった記事数も年々増えていき、今では数百記事にもなっています。',
        'アドベントカレンダーは学習やアウトプットの手段としても利用されており、特に若手技術者にとっては、自分の知識や経験を共有し、コミュニティに貢献する機会となっています。また、読者にとっても、興味のあるテーマについての新しい情報を得ることができるため、非常に魅力的なイベントとなっています​​​​。'
      ],
    },
    dialog:{
      dialogtitle: "記事のリンクを登録する",
      author: "ユーザー名",
      title: "記事タイトル",
      url: "記事URL",
      summary: "概要",

      close: "閉じる",
      register: "登録",

      edit: "編集",
      cancel: "キャンセル",
      update: "更新",
      delete: "削除",

      launch: "リンク先に遷移する",
      login: "ログイン",
      logout: "ログアウト",
      message: "Googleアカウントでログインすると記事へのリンクを登録・編集できます",
      whoMessage: "編集可能 : ",
      loginMessage: "ログイン中 : ",
      deleteTitle: "削除の確認",
      deleteMessage: "この記事リンクを本当に削除しますか？",

    },
    search: "検索",
    thumbnail: "",
    summary: "",
    author: ""

  }/*,
  fr: {
    message: {
      home: '',
      about: '',
      calendar: '',
      hello: '',
      hometxt: '',
      abouttxt : '',
      history: [
        '',
        '',
        '',
        ''
      ],
    },
    search: "Search",
    title: "",
    summary: "Summary",
    author: "Date"
  }*/
};



const i18n = createI18n({
  legacy: false,
  locale: determineLocale(), // デフォルト言語
  fallbackLocale: 'en',
  messages,
});

export default i18n;
