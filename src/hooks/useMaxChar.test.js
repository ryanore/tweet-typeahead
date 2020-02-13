import useMaxChar from "./useMaxChar"
import { renderHook, act } from '@testing-library/react-hooks'

const test10 = '0123456789'

describe('useMaxChar Hook', () => {

  describe('Without max argument provided, and an empty input', () => {
    it('starts with the default of 280 "remaining', () => {
      const { result } = renderHook(() => useMaxChar('', ))
      expect(result.current).toMatchObject({remaining: 280, exceeded: false})
    })
  })

  describe('With max argument provided, and an empty input', () => {
    it('starts with the given argument number "remaining" ', () => {
      const { result } = renderHook(() => useMaxChar('', 100))
      expect(result.current).toMatchObject({remaining: 100, exceeded: false})
    })
  })
  
  describe('With max argument provided, and input > max', () => {
    it('correctly calculates the exceeded property', () => {
      const { result } = renderHook(() => useMaxChar(test10, 9))
      expect(result.current).toMatchObject({remaining: -1, exceeded: true})
    })
  })

  describe('With max argument provided, and input < max', () => {
    it('correctly calculates the exceeded property', () => {
      const { result } = renderHook(() => useMaxChar(test10, 11))
      expect(result.current).toMatchObject({remaining: 1, exceeded: false})
    })
  })

  describe('With negative number provided', () => {
    it('defaults to a max of zero, correctly calculates the exceeded property', () => {
      const { result } = renderHook(() => useMaxChar(test10, -100))
      expect(result.current).toMatchObject({remaining: -10, exceeded: true})
    })
  })
  describe('With non-string input', () => {
    it('returns the default state', () => {
      const { result } = renderHook(() => useMaxChar(true, 10))
      expect(result.current).toMatchObject({remaining: 10, exceeded: false})
    })
  })

})
