import React from 'react'
import { render, cleanup } from '@testing-library/react'
import TweetInput from './TweetInput'
// Renders a textarea
// When textarea changes, and there is a screenName match, it calls back to parent
// When a screenName is passed In, it changes it at the current word.

describe('TweetInput Component',() => {
    let noop

    beforeEach(() => {
      noop = jest.fn();
    });

    afterEach(() => {
      cleanup()
    })

    describe('With placeholder prop', () => {
      it('renders the correct placeholder', () => {
          const {getByPlaceholderText} = render(<TweetInput placeholder={"boop"} />)
          expect(getByPlaceholderText('boop')).toBeInTheDocument()
      })
    })

   

})
