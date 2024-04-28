import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GridWord from '../GridWord.vue'
import LetterInGrid from '../LetterInGrid.vue'

describe('GridWord', () => {
  it('renders letters for each word in wordList', () => {
    const wordList = [
      ['H', 'e', 'l', 'l', 'o'],
      ['V', 'i', 't', 'e', 's', 't']
    ]
    const originalWord = 'Hello'
    const wrapper = mount(GridWord, {
      props: {
        wordList,
        originalWord
      }
    })

    wordList.forEach((word, wordIndex) => {
      word.forEach((letter, letterIndex) => {
        const letterInGrid = wrapper.findAllComponents(LetterInGrid).at(wordIndex * wordList[0].length + letterIndex)
        expect(letterInGrid.props().letterToDisplay).toBe(letter)
        expect(letterInGrid.props().originalWord).toBe(originalWord)
        expect(letterInGrid.props().position).toBe(letterIndex)
        expect(letterInGrid.props().lastWord).toBe(wordIndex === wordList.length - 1)
      })
    })
  })
})
