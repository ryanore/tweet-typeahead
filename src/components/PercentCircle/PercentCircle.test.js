import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import PercentCircle from './PercentCircle'

const defaults = {
  percent: 50
}

const setup = (propArgs, re) => {
  const props = {...defaults, ...propArgs}
  const utils = render(
    <PercentCircle {...props} />
  )
  const chart = utils.getByTestId('percent-chart')
  return {
    chart,
    ...utils,
  }
}

describe('<PercentCircle > Component',() => {
  afterEach(cleanup)

  it('renders', () => {
    const { chart } = setup()
    expect(chart).toBeInTheDocument()
  })
 

})
