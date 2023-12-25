import { createStore } from 'vuex'

import { State, Article ,Config } from './types';


const store = createStore<State>({
  state: {
    articles: [],
    config:  { title: '', tags: '',calendarTags:'' },
    user: null,
    language: 'en',
  },
  mutations: {
    
    
    setArticles(state, articles: Article[]) {
      state.articles = articles;
    },
    setConfig(state, config: Config) { 
      state.config = config;
    },
    setUser(state, user) {
      state.user = user;
    },
    setLanguage(state, language: string) {
      state.language = language;
    }
  },
  actions: {
    async fetchArticles({ commit, state }) {
      try {
        let jsonPath = './articles.json';
        if (state.language !== 'en') {
          jsonPath = '../articles.json';
        }
  
        const response = await fetch(jsonPath);

        const data = await response.json();
        commit('setArticles', data.data);
        commit('setConfig', {title: data.title, tags: data.tags , calendarTags:data.calendarTags});
      } catch (error) {
        console.error('Error loading articles:', error);
      }
    }
  }
});

export default store;