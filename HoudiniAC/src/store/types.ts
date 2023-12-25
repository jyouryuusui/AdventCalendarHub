export interface Article {
    title: { [key: string]: string };
    summary: { [key: string]: string };
    author: { [key: string]: string };
    categories: string;
    tags: string;
    date: string;

    icon: string;
    creationDate: string;
    articleUrl: string;
    thumbnailUrl: string;
    articleId: number;
  }

  export interface CalendarAttribute {
    key: string;
    type: string;
    dates: string;
    customData: {
      title: {[key: string]: string};
      summary:  {[key: string]: string};
      author: string;
      userId: string,
      icon: string;
      thumbnailUrl: string;
      articleUrl : string;
      class: string;
    };
  }
  
  export interface Config {
    title: string;
    tags: string;
    calendarTags: string;    
  }

  export interface State {
    articles: Article[];
    config: Config;
    user: any | null;  // Firebase ユーザー情報または null
    language: string;
  }