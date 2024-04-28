import { defineStore } from 'pinia'

interface State {
  selectedWord: string
  attempts: string[][]
}

export const useWordSelected = defineStore('wordSelected', {
  state: (): State => ({
    selectedWord: '', // variable pour le mot sélectionné
    attempts: [] // tableau pour les essais enregistrés, maintenant une liste de listes
  }),
  persist: true // persist the store in the local storage
})
