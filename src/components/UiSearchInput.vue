<template>
  <div class="ui-search">
    <label class="ui-search__label" v-if="label">{{ label }}</label>
    <input
      :value="modelValue"
      class="ui-search__input"
      type="text"
      :placeholder="placeholder"
      @input="handleInput"
      @change="handleChange"
    >
    <button class="ui-search__clear" type="button" v-if="hasClearButton && modelValue.length > 0" @click="handlerClear">
      <cross-icon :color="'#9fc0f5'"/>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CrossIcon from '@components/icons/CrossIcon.vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    hasClearButton: {
      type: Boolean,
      default: false
    }
  },
  components: {CrossIcon },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    const inputValue = ref(props.modelValue)

    function handleChange (evt: any): void {
      inputValue.value = evt.target.value.trim()
      updateInput()
    }

    function handleInput (evt: any): void {
      inputValue.value = evt.target.value.trim()
      updateInput()
    }

    function handlerClear ():void {
      inputValue.value = ''
      updateInput()
    }

    function updateInput (): void {
      ctx.emit('update:modelValue', inputValue.value)
    }

    return {
      handleInput,
      handleChange,
      handlerClear,
      updateInput
    }
  }
})
</script>

<style lang="scss">
.ui-search {
  position: relative;
  width: 100%;

  &__input {
    width: 100%;
    padding: 11px 20px 11px 11px;
    box-sizing: border-box;
    border: 1px solid #ced4da;
    border-radius: 3px;
    outline: 0;
    font-size: 14px;
    color: #495057;
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease;

    &:focus {
      border-color: #9fc0f5;
      box-shadow: 0 0 0 3px rgb(63, 128, 234, 0.25);
    }
  }

  &__clear {
    @include reset-button;
    position: absolute;
    top: 10px;
    right: 15px;
    line-height: 0;
  }
}
</style>
