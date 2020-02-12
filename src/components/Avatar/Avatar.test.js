import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
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
        const {getByPlaceholder} = render(<TweetInput placeholder="boop" onUsername={noop}/>)
        expect(getByPlaceholder('boop')).toBeInTheDocument()
    })

})
