import useWordFind from "./useWordFind";
import { renderHook, act } from '@testing-library/react-hooks'

// 165 chars
const tstStrLong = 'This is a long string, which is used to test a the uswordfind hook. It has punctuation and    extra   spaces. It should suffice for testing a standard tweet message.'
// 28 chars
const tstStrShort = 'This is a short      string.'

describe('useWordFind Hook', () => {

    it('defaults to the last word', () => {
      const { result } = renderHook(() => useWordFind(tstStrShort))
      expect(result.current.bounds).toMatchObject({start: 21, end: 28})
    })

    it('updates bounds correctly as cursor moves', () => {
      const { result } = renderHook(() => useWordFind(tstStrLong))
      act(() => {
        result.current.onCursor({
          target: {
            selectionStart: 10
          }
        })
      })
      expect(result.current.bounds).toMatchObject({start: 10, end: 14})
      act(() => {
        result.current.onCursor({
          target: {
            selectionStart: 0
          }
        })
      })
      expect(result.current.bounds).toMatchObject({start: 0, end: 4})
    })

    it('handles extra spaces as individual words with same start & end', () => {
      const { result } = renderHook(() => useWordFind(tstStrShort))
      act(() => {
        result.current.onCursor({
          target: {
            selectionStart: 16
          }
        })
      })
      expect(result.current.bounds).toMatchObject({start: 16, end: 16})
    })

})
