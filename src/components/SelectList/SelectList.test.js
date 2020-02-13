import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import SelectList from './SelectList'
import SelectListUser from '../SelectListUser/SelectListUser'


const defaults = {
  data: [{
    id: 862682,
    name: 'dude one',
    screen_name: 'dude',
    url: 'https://t.co/m58hlXSrUw'
  },{
    id: 862682,
    name: 'dude two',
    screen_name: 's',
    url: 'https://t.co/m58hlXasdf'
  }],
  onSelect: () => {/*noop*/},
  focused: false
}

const setup = (propArgs, re) => {
  const props = {...defaults, ...propArgs}
  const utils = render(
    <SelectList {...props}>
        <SelectListUser />
    </SelectList>
  )
  const selectList = utils.getByTestId('select-list')
  return {
    selectList,
    ...utils,
  }
}

describe('<SelectList> Component',() => {
  describe('With data', () => {
    it('renders', () => {
      const { selectList } = setup()
      expect(selectList).toBeInTheDocument()
    })

    it('has the correct number of children ', () => {
      const { selectList, getByTestId } = setup()
      expect( getByTestId('select-list-items').children.length).toBe(defaults.data.length)
    })
  })
  describe('Without data', () => {
    it('does not render children', () => {
      const { selectList, queryByTestId } = setup({data: null})
      const list = queryByTestId('select-list-items')
      expect(list).toBeNull()
    })
  })
  describe('While Loading', () => {
    it('shows a loading indicator', () => {
      const { selectList, getByTestId } = setup({data: null, loading: true})
      expect( getByTestId('loading')).toBeInTheDocument()
    })
  })
})
