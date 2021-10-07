<template>
<div class="fio-component">
  <div class="search">
    <div class="search__header">
      <ui-search-input v-model="searchValue" :placeholder="'Поиск по фамилии'" :has-clear-button="true"/>
      <button class="search__toggle button-outline button-outline--primary" type="button" @click="toggleFind">{{ findOn ? 'Выключить поиск' : 'Включить поиск' }}</button>
    </div>
    <div class="search__wrapper">
      <div class="loading" v-if="loading"></div>
      <ul class="search__list suggestions" v-if="!loading && suggestions.length > 0">
        <li class="suggestions__item" v-for="item in suggestions" :key="item.value">
          <article class="suggestion">
            <h3 class="suggestion__value">{{ item.value }}</h3>
            <button class="suggestion__button button button--success" @click="addSuggestion(item)" :disabled="isSelectSuggestion(item)">Добавить</button>
          </article>
        </li>
      </ul>
      <p class="search__empty" v-if="suggestions.length === 0">Ничего не найдено</p>
    </div>
    <p class="search__count" v-if="suggestions.length > 0">Найдено: {{ suggestions.length }}</p>
  </div>
  <div class="select">
    <div class="select__header">
      <h2 class="select__title">Список добавленных элементов: </h2>
    </div>
    <div class="select__wrapper">
      <ul class="suggestions" v-if="selectSuggestions.length > 0">
        <li class="suggestions__item" v-for="item, index in selectSuggestions" :key="item.value">
          <article class="suggestion">
            <h3 class="suggestion__value">{{ item.value }}</h3>
            <button class="suggestion__button button button--danger" @click="deleteSuggestion(index)">Удалить</button>
          </article>
        </li>
      </ul>
    </div>
    <p class="select__count" v-if="selectSuggestions.length > 0">Добавлено: {{ selectSuggestions.length }}</p>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch
} from 'vue'
import {
  useStore
} from 'vuex'
import ApiService from '@api/ApiService'
import UiSearchInput from '@components/UiSearchInput.vue'
import {
  IDataParams,
  IDataResponse,
  ISuggestion
} from '@interfaces/services/api/ApiService.interface'

export default defineComponent({
  components: {
    UiSearchInput
  },
  name: 'App',
  setup () {
    const store = useStore()
    const searchValue = ref('')
    const loading = ref(false)
    const findOn = ref(true)
    const suggestions = ref([])
    const selectSuggestions = store.getters.suggestions

    watch(searchValue, () => {
      getData()
    })

    function getData (): void {
      if (searchValue.value.length > 2 && findOn.value) {
        const params: IDataParams = {
          query: searchValue.value,
          count: 20
        }
        loading.value = true
        ApiService.getData(params)
          // TODO: тип
          .then((response: any) => {
            suggestions.value = response.suggestions
          })
          .catch((error) => console.error(error))
          .finally(() => (loading.value = false))
      }
    }

    function toggleFind (): void {
      findOn.value = !findOn.value
      getData()
    }

    function addSuggestion (item: ISuggestion): void {
      store.dispatch('ADD', item)
    }

    function deleteSuggestion (index: number): void {
      store.dispatch('DELETE', index)
    }

    function isSelectSuggestion (item: ISuggestion): boolean {
      return selectSuggestions.includes(item)
    }

    function clearSelectSuggestions (): void {
      store.dispatch('CLEAR', [])
    }

    return {
      loading,
      searchValue,
      getData,
      suggestions,
      findOn,
      toggleFind,
      selectSuggestions,
      addSuggestion,
      deleteSuggestion,
      isSelectSuggestion,
      clearSelectSuggestions
    }
  }
})
</script>

<style lang="scss">
@import '~@/assets/scss/main.scss';

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);

  &:after {
    content: " ";
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 6px solid #3f80ea;
    border-color: #3f80ea transparent #3f80ea transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

.fio-component {
  width: 600px;
  margin: 40px auto;
}

.search {
  &__header {
    display: flex;
    align-items: center;
  }

  &__wrapper {
    position: relative;
    margin-top: 20px;
    height: 200px;
    overflow-y: auto;
    border: 1px solid #dbdddf;
    @include custom-scroll;
  }

  &__toggle {
    margin-left: 20px;
    white-space: nowrap;
  }

  &__count {
    display: inline-flex;
    padding: 4px 6px;
    background-color: #3f80ea;
    border-radius: 2px;
    color: #ffffff;
  }

  &__empty {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 12px;
    color: #dbdddf;
    transform: translate(-50%, -50%);
  }
}

.suggestions {
  @include reset-ul;

  &__item {
    padding: 5px 10px;

    &:not(:last-child) {
      border-bottom: 1px solid #dbdddf;
    }
  }
}

.suggestion {
  display: flex;
  align-items: center;

  &__value {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 500;
    font-size: 24px;
    color: #495057;
  }

  &__button {
    margin-left: auto;
  }
}

.select {
  &__wrapper:not(:empty) {
    max-height: 200px;
    border: 1px solid #dbdddf;
    overflow-y: auto;
    @include custom-scroll;
  }

  &__count {
    display: inline-flex;
    padding: 4px 6px;
    background-color: #3f80ea;
    border-radius: 2px;
    color: #ffffff;
  }
}
</style>
