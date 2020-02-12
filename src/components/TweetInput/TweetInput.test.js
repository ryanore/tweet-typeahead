import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import TweetInput from './TweetInput'

const strWithHandle = 'the best is @sproutSocial in @Chicago'

const defaults = {
  placeholder:'placeholder',
  replaceText: null,
  onTweetUpdate: () => {},
  onSearch: () => {}
}

const setup = (propArgs, re) => {
  const props = {...defaults, ...propArgs}
  const utils = render(
    <TweetInput {...props} />
  )
  const input = utils.getByPlaceholderText(props.placeholder)
  return {
    input,
    ...utils,
  }
}

describe('TweetInput Component',() => {

  describe('On initial render', () => {
    afterEach(cleanup)

    it('renders the correct placeholder', () => {
      const { input } = setup({placeholder: 'boop'})
      expect(input).toBeInTheDocument()
    })

    it('displays the replaceText by default if passed', () => {
      const { input } = setup({replaceText: 'replaceTextValue'})
      expect(input.value).toBe('replaceTextValue')
    })
    it('is an empty texarea if no replaceText is passed in', () => {
      const { input } = setup()
      expect(input.value).toBe('')
    })
  })

  describe('OnChange', () => {
    afterEach(cleanup)

    it('displays input correctly when user types', () => {
      const { input } = setup()
      fireEvent.change(input, { target: { value: strWithHandle } })
      expect(input.value).toBe(strWithHandle)
    })

    it('calls back to parent when input changes', () => {
      const spy = jest.fn()
      const { input } = setup({onTweetUpdate: spy})
      fireEvent.change(input, { target: { value: strWithHandle } })
      expect(spy).toBeCalled()
    })
  })

  describe('Cursor position, and Username Detection', () => {
    it('calls onSearch function on parent when a username/handle has cursor', async () => {
      const handle = 'I love @sproutSocial in @chicago loop'
      const spy = jest.fn()
      const { input } = setup({onSearch: spy})
      // starts out on 0, which is not a handle
      fireEvent.change(input, { target: { value: handle } })
      // move to "@chicago", spy is called
      input.selectionStart = 10
      fireEvent.click(input)

      // await(() => {
      //   expect(spy).not.toBeCalled()
      // })
      // // move to "in" spy is not called
      // input.selectionStart = 22
      // fireEvent.click(input)
      // // move cursor to "@user", then trigger
      // input.selectionStart = 27
      // fireEvent.click(input)
      // expect(spy).toHaveBeenCalledTimes(2)
    })
  })

  describe('Text Replacement', () => {
    // TODO:  how the hell do I test this without an existing `input` state
    it('replaces a @handle inline when props come in replaceText', () => {
      const str = 'I love @sproutSo in @chic loop'
      const str2 = 'I love @sproutSocial in @chic loop'
      const str3 = 'I love @sproutSocial in @chicago loop'
      const spy = jest.fn()
      let { input, rerender } = setup({onSearch: spy, replaceText: str })
      // check that the correct text exists
      expect(input.value).toBe(str)
      
      // move the cursor to @sproutSo
      input.selectionStart = 10
      fireEvent.click(input)
      const props2 = {...defaults, replaceText: "@sproutSocial" }
      rerender(<TweetInput {...props2} />)
      expect(input.value).toBe(str2)

      // move the cursor to @chic
      input.selectionStart = 26
      fireEvent.click(input)
      const props3 = {...defaults, replaceText: "@chicago" }
      rerender(<TweetInput {...props3} />)
      expect(input.value).toBe(str3)

    })
  })
  
})
