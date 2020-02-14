import { useEffect, useState, useCallback } from "react"
import debounce from 'lodash/debounce'
/**
 * Hook - useApiGet
 * @param {string} url - The url to request.  Hook only executes when url changes
 * The useEffect only executes when the url changes.  
 */
export const useApiGet = (url, wait) => {
  const [state, setState] = useState({ data: null, loading: false, error: null })
  
  const debouncedRequest = useCallback(
    debounce(async (url) => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setState({ data: json, loading: false, error: null })
      } catch (e) {
        setState({ data: null, loading: false, error: e })
      }
    }, wait),
    [wait]
  );

  useEffect(() => {
    if (url) {
      setState({ data: null, loading: true, error: null })
      debouncedRequest(url);
    } else {
      setState({ data: null, loading: false, error: null })
    }
  }, [url])

  return {
    ...state
  }
}