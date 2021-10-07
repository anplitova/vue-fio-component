import { createStore } from 'vuex'
import { ISuggestion } from '@interfaces/services/api/ApiService.interface'

export default createStore({
  state: {
    suggestions: [] as ISuggestion[]
  },
  getters: {
    suggestions: state => {
      return state.suggestions
    }
  },
  mutations: {
    ADD_ITEM: (state, item: ISuggestion) => {
      state.suggestions.push(item)
    },
    DELETE_ITEM: (state, index: number) => {
      state.suggestions.splice(index, 1)
    },
    CLEAR_LIST: (state, array) => {
      state.suggestions = array
    }
  },
  actions: {
    ADD: async (context, payload) => {
      context.commit('ADD_ITEM', payload)
    },
    DELETE: async (context, payload) => {
      context.commit('DELETE_ITEM', payload)
    },
    CLEAR: async (context, payload) => {
      context.commit('CLEAR_LIST', payload)
    }
  },
  modules: {
  }
})
