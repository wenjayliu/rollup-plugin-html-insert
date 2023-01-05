<script lang="ts" setup>
import { ref } from 'vue'

const count = ref<number>(0)
console.log(count)
</script>

<template>
  <button @click="count++" class="name">You clicked me {{ count }} times.</button>
</template>

<style scoped>
.name {
    color:rgb(162, 92, 243);
}
</style>
