import React from 'react'
import { act, cleanup, fireEvent, render, wait } from '@testing-library/react'
import Tweet from './Tweet'

const strWithHandle = 'the best is @sproutSocial in @Chicago'

const defaults = {
  placeholder:'placeholder'
}

const setup = (propArgs, re) => {
  const props = {...defaults, ...propArgs}
  const utils = render(
    <Tweet {...props} />
  )
  const input = utils.getByPlaceholderText(props.placeholder)
  return {
    input,
    ...utils,
  }
}


describe('<Tweet> Component',() => {

  describe('On initial render', () => {
    afterEach(cleanup)

    it('renders the correct placeholder', () => {
      const { input } = setup({placeholder: 'boop'})
      expect(input).toBeInTheDocument()
    })
  })

  describe('OnChange', () => {
    afterEach(cleanup)

    it('displays input correctly when user types', () => {
        const { input } = setup()
        fireEvent.change(input, { target: { value: strWithHandle } })
        expect(input.value).toBe(strWithHandle)
    })
  })

  describe('Cursor position, username detection, API requests', () => {
    // Mock fetch globally  
    const spy = jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ users: [] })
      }))
    
    it('only triggers an API request when cursor is on @handle text', async () => {
      const msg = 'I love @sproutSocial in @chicago loop'
      const { input } = setup()    
      
      // add some text
      fireEvent.change(input, { target: { value: msg } })

      // put the cursor on "love", and trigger cursor again
      input.selectionStart = 4
      fireEvent.click(input)
      await wait(() => expect(spy).toHaveBeenCalledTimes(0))
      spy.mockClear()

      // put the cursor on on the space before "@", and trigger cursor again
      input.selectionStart = 6
      fireEvent.click(input)
      await wait(() => expect(spy).toHaveBeenCalledTimes(0))
      spy.mockClear()

      // put the cursor on on the space after "@sproutSocial", and trigger cursor again
      input.selectionStart = 20
      fireEvent.click(input)
      await wait(() => expect(spy).toHaveBeenCalledTimes(0))
      spy.mockClear()
    })
  

    it('can handle multiple @handles', async () => {
      const msg = 'I love @sproutSocial in @chicago loop'
      const { input } = setup()    
      
      // add some text
      fireEvent.change(input, { target: { value: msg } })

      // put the cursor on "@sproutSocial", and trigger cursor again
      input.selectionStart = 10
      fireEvent.click(input)
      await wait(() => expect(spy).toHaveBeenCalledTimes(1))
      spy.mockClear()

      // put the cursor on "@chicago", and trigger cursor again
      input.selectionStart = 26
      fireEvent.click(input)
      await wait(() => expect(spy).toHaveBeenCalledTimes(1))
      spy.mockClear()
    })


  })
})
