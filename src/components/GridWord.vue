<template>
  <div class="w-fit mx-auto space-y-2">
    <div v-for="(attempt, index) in wordList" :key="index" class="flex gap-2">
      <LetterInGrid
        v-for="(letter, letterIndex) in attempt"
        :key="letter + '_' + letterIndex"
        :letterToDisplay="letter"
        :originalWord="originalWord"
        :position="letterIndex"
        :lastWord="index === wordList.length - 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LetterInGrid from './LetterInGrid.vue'
defineProps<{
  wordList: string[][]
  originalWord: string
}>()
</script>
