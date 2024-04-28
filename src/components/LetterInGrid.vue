<script setup lang="ts">
defineProps({
  letterToDisplay: String,
  originalWord: String,
  position: Number,
  lastWord: Boolean
})
</script>

<template>
  <div
    class="flex items-center justify-center p-1 rounded aspect-square w-full uppercase sm:w-12 md:w-16 lg:w-20 bg-green-600 font-bold text-white"
  >
    <div
      v-if="letterToDisplay"
      class="rounded-full py-1.5 px-3"
      :class="{
        'border-2 border-red-500':
          originalWord?.toLowerCase().indexOf(letterToDisplay.toLowerCase()) === position &&
          originalWord?.toLowerCase().includes(letterToDisplay.toLowerCase()) &&
          !lastWord,
        'border-2 border-yellow-500':
          !(originalWord?.toLowerCase().indexOf(letterToDisplay.toLowerCase()) === position) &&
          originalWord?.toLowerCase().includes(letterToDisplay.toLowerCase()) &&
          !lastWord
      }"
    >
      <p>{{ letterToDisplay }}</p>
    </div>
  </div>
</template>
