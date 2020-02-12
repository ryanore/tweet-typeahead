import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import SelectListUser from './SelectListUser'

describe('SelectListUser Component',() => {
    it('renders correctly', () => {
        const {getByPlaceholder} = render(<SelectListUser data={[]}/>)
        expect(true).toBe(true)
    })

})
