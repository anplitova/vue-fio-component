import { createStore } from 'vuex'
import { ISuggestion } from '@interfaces/services/api/ApiService.interface'

export type VuexRootState = {
  suggestions: ISuggestion[]
}

export default createStore<VuexRootState>({
  state: {
    suggestions: []
  },
  mutations: {
    ADD_ITEM: (state, item: ISuggestion) => state.suggestions.push(item),
    DELETE_ITEM: (state, index: number) => state.suggestions.splice(index, 1),
    CLEAR_LIST: (state, array: ISuggestion[]) => (state.suggestions = array)
  }
})
