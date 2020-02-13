import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Avatar from './Avatar'

const defaults = {}

const setup = (propArgs, re) => {
  const props = {...defaults, ...propArgs}
  const utils = render(
    <Avatar {...props} />
  )
  const avatar = utils.getByRole('img')
  return {
    avatar,
    ...utils,
  }
}

describe('Avatar Component',() => {
  it('renders', () => {
    const { avatar } = setup()
    expect(avatar).toBeInTheDocument()
  })
  it('renders a default background image', () => {
    const { avatar } = setup()
    const styles = window.getComputedStyle(avatar);
    expect(styles._values['background-image']).toBeTruthy()
  })
  it('renders an image url from props', () => {
    const { avatar } = setup({image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='})
    const styles = window.getComputedStyle(avatar);
    expect(styles._values['background-image']).toBeTruthy()
  })

})
