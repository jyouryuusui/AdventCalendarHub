import { createStore } from 'vuex'

/*
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
*/
import { State, Article ,Config } from './types';


const store = createStore<State>({
  state: {
    articles: [],
    config:  { title: '', tags: '',calendarTags:'' },
    user: null,
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
    }
  },
  actions: {
    async fetchArticles({ commit }) {
      try {
        const response = await fetch('/articles.json');
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