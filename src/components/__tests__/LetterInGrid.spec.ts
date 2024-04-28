import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LetterInGrid from '../LetterInGrid.vue'

describe('LetterInGrid', () => {
  it('renders with correct border class when the letter exist and is in the good place', () => {
    const wrapper = mount(LetterInGrid, {
      props: {
        letterToDisplay: 'A',
        originalWord: 'Apple',
        position: 0,
        lastWord: false
      }
    })

    const letterDiv = wrapper.find('div div div')
    expect(letterDiv.classes()).toContain('border-2')
    expect(letterDiv.classes()).toContain('border-red-500')
  })
  it('renders with correct border class when the letter exist and is not in the good place', () => {
    const wrapper = mount(LetterInGrid, {
      props: {
        letterToDisplay: 'P',
        originalWord: 'Apple',
        position: 0,
        lastWord: false
      }
    })

    const letterDiv = wrapper.find('div div div')
    expect(letterDiv.classes()).toContain('border-2')
    expect(letterDiv.classes()).toContain('border-yellow-500')
  })

  it('renders with different border class when conditions are not met', () => {
    const wrapper = mount(LetterInGrid, {
      props: {
        letterToDisplay: 'B',
        originalWord: 'Apple',
        position: 0,
        lastWord: false
      }
    })

    const letterDiv = wrapper.find('div div div')
    expect(letterDiv.classes()).not.toContain('border-2')
    expect(letterDiv.classes()).not.toContain('border-red-500')
  })
})
