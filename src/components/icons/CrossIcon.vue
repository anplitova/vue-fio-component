<template>
  <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 20 20" height="20" width="20"><path d="m11.784 10 8.0853-8.0848a.4463.4463 0 0 0 0-.6308L18.716.1306A.4476.4476 0 0 0 18.4005 0a.4472.4472 0 0 0-.3156.1306l-8.0851 8.085L1.9146.1307c-.1675-.1675-.464-.1673-.631 0L.1306 1.2844a.446.446 0 0 0 0 .6308L8.2159 10 .1307 18.0848a.446.446 0 0 0 0 .6308l1.1531 1.1538a.4468.4468 0 0 0 .631 0L10 11.7844l8.0851 8.085a.4476.4476 0 0 0 .3156.1306.4476.4476 0 0 0 .3157-.1306l1.153-1.1538a.4463.4463 0 0 0 0-.6308z" :fill="color"/></svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'cross-icon',
  props: {
    color: {
      type: String,
      default: '#000000'
    }
  }
})
</script>
