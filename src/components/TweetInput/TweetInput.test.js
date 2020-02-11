import React from 'react'
import { render, cleanup } from '@testing-library/react'
import TweetInput from './TweetInput'

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
