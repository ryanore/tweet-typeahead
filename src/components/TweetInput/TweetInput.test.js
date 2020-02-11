import React from 'react'
import { render, cleanup } from '@testing-library/react'
import TweetInput from './TweetInput'

describe('Button Component',() => {
    let noop

    beforeEach(() => {
        noop = jest.fn();
    });

    afterEach(() => {
        cleanup()
    })

    it('renders correctly', () => {
        const {getByPlaceholderText} = render(<TweetInput placeholder={"boop"} />)
        expect(getByPlaceholderText('boop')).toBeInTheDocument()
    })

})
