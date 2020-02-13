import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Avatar from './Avatar'

const defaults = {
  alt: 'test',
  image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
}

const setup = (propArgs, re) => {
  const props = {...defaults, ...propArgs}
  const utils = render(
    <Avatar {...props} />
  )
  const avatar = utils.getByAltText(props.alt)
  return {
    avatar,
    ...utils,
  }
}

describe('Avatar Component',() => {
  afterEach(cleanup)

  it('renders', () => {
    const { avatar } = setup()
    expect(avatar).toBeInTheDocument()
  })
  it('renders an img', () => {
    const { avatar } = setup({alt: "tstImg"})
    expect(avatar.src).toEqual(defaults.image)
  })
  it('renders an image url from props', () => {
    const { avatar, getByAltText } = setup({alt: "tstImg"})
    expect(getByAltText('tstImg')).toBeTruthy()
  })

})
