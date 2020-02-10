import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Tweet from './Tweet'

describe('Tweet Component',() => {
    let noop

    beforeEach(() => {
        noop = jest.fn();
    });

    afterEach(() => {
        cleanup()
    })

    it('renders correctly', () => {
        const {getByTestId} = render(<Tweet />)
        expect(getByTestId('tweet')).toBeInTheDocument()
    })

})
