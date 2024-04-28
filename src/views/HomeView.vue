<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useWordSelected } from '@/stores/wordSelected'

import wordlist from '@/wordlist.json'
import GridWord from '@/components/GridWord.vue'

const store = useWordSelected()
const toast = useToast()

const selectedWord = ref<string>('')
const actualAttemptWordStatus = ref<string[]>([])
const wordsAttemptsList = ref<string[][]>([])
const attemptWord = ref<string>('')
const maxWordSize = ref<number>(0)
const nbTrialsAllowed = ref<number>(7)
const partyWin = ref<boolean>(false)
const partyLose = ref<boolean>(false)

// Initialize the game
function initGame() {
  if (selectedWord.value === '') {
    selectRandomWord()
  }

  maxWordSize.value = selectedWord.value.length

  // Initialize the actualAttemptWordStatus with the first letter of the selected word
  if (wordsAttemptsList.value.length > 0) {
    updateAttemptStatus(selectedWord.value, wordsAttemptsList.value[0].join(''))
  } else {
    initializeAttemptStatus()
  }
}

// Select a random word from the wordlist
function selectRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordlist.length)
  selectedWord.value = wordlist[randomIndex]
  store.selectedWord = selectedWord.value
}

// Initialize the attempt status
function initializeAttemptStatus() {
  for (let i = 0; i < maxWordSize.value; i++) {
    actualAttemptWordStatus.value.push(i === 0 ? selectedWord.value.charAt(0) : '')
  }
  wordsAttemptsList.value.push(actualAttemptWordStatus.value)
  store.attempts = wordsAttemptsList.value
}

// Add an attempt to the list of attempts
function addAttempt() {
  console.log('Attempt :', attemptWord.value.toLocaleUpperCase())
  if (attemptWord.value.length !== maxWordSize.value) {
    displayWarning('Word size is not correct')
    return
  }

  if (!wordlist.includes(attemptWord.value.toLocaleUpperCase())) {
    displayWarning("Word doesn't exist. You lose!")
    partyLose.value = true
    return
  }

  if (updateAttemptStatus(selectedWord.value, attemptWord.value) === selectedWord.value) {
    displaySuccess('You win!')
    partyWin.value = true
    return
  }

  const newAttempt = Array.from(attemptWord.value)
  wordsAttemptsList.value.unshift(newAttempt)

  if (wordsAttemptsList.value.length >= nbTrialsAllowed.value) {
    wordsAttemptsList.value.pop()
    displayError('You have reached the maximum number of trials. You lose!')
    partyLose.value = true
    return
  }

  store.attempts = wordsAttemptsList.value
  attemptWord.value = ''
}

// Verify the letters of the attempt word with the correct word and return the result
function updateAttemptStatus(correctWord: string, attemptWord: string) {
  let result = ''
  for (let i = 0; i < correctWord.length; i++) {
    if (correctWord.charAt(i).toLowerCase() === attemptWord.charAt(i).toLowerCase()) {
      result += correctWord.charAt(i)
      actualAttemptWordStatus.value[i] = correctWord.charAt(i)
    } else {
      result += '_'
      if (i !== 0 && !actualAttemptWordStatus.value[i]) {
        actualAttemptWordStatus.value[i] = ''
      }
    }
  }
  return result
}

// Display a warning message
function displayWarning(message: string) {
  console.log(message)
  toast.warning(message)
}

// Display a success message
function displaySuccess(message: string) {
  console.log(message)
  toast.success(message)
}

// Display an error message
function displayError(message: string) {
  console.log(message)
  toast.error(message)
}

// Reset the game
function resetGame() {
  selectedWord.value = ''
  actualAttemptWordStatus.value = []
  wordsAttemptsList.value = []
  attemptWord.value = ''
  maxWordSize.value = 0
  nbTrialsAllowed.value = 7
  partyWin.value = false
  partyLose.value = false
  initGame()
}

onMounted(() => {
  selectedWord.value = store.selectedWord
  wordsAttemptsList.value = store.attempts
  initGame()
})

onUnmounted(() => {
  store.selectedWord = selectedWord.value
  store.attempts = wordsAttemptsList.value
})
</script>

<template>
  <main class="container mx-auto p-5 lg:p-10 space-y-5">
    <div class="flex flex-col items-center justify-center gap-1">
      <div
        v-if="!partyWin && !partyLose"
        class="flex w-full md:w-3/4 xl:w-1/2 rounded overflow-hidden"
      >
        <input
          type="text"
          v-model="attemptWord"
          class="w-full uppercase tracking-widest border-none bg-zinc-100 px-5 py-2 placeholder-zinc-300 drop-shadow-xl transition-all duration-300 ease-in-out focus:bg-zinc-300 focus:text-zinc-900 focus:placeholder-zinc-500 focus:outline-none"
          :maxlength="maxWordSize"
          @keyup.enter="addAttempt"
          :disabled="partyWin || partyLose"
        />
        <button @click="addAttempt" class="w-fit px-5 py-2 bg-zinc-200">Send</button>
      </div>
      <p v-else-if="partyWin" class="text-3xl text-green-500">You Win!</p>
      <p v-else-if="partyLose" class="text-3xl text-red-500">You Lose!</p>
      <p v-if="partyLose">The word was : {{ selectedWord }}</p>
      <button @click="resetGame" :class="partyLose ? 'font-semibold':''">Restart</button>
    </div>
    <GridWord
      v-if="wordsAttemptsList.length"
      :wordSize="maxWordSize"
      :wordList="wordsAttemptsList"
      :originalWord="selectedWord"
    />
    <p class="text-center">Max Attemps Allow : {{ nbTrialsAllowed }}</p>
  </main>
</template>
