import { useEffect, useState, useCallback } from "react"
import debounce from 'lodash/debounce'
import useSessionCache from './useSessionCache'
/**
 * Hook - useApiGet
 * @param {string} url - The url to request.  Hook only executes when url changes
 *  Debounces requests & caches responses to sessionStorage to prevent unnecessary requests
 *  
 */
export const useApiGet = (url, wait) => {
  const [state, setState] = useState({ data: null, loading: false, error: null })
  const [cache, setCache] = useSessionCache('sprout-cache', {})
    
  const debouncedRequest = useCallback(
    debounce(async (url) => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setCache( (cached) => ({...cached, [url]: json}))
        setState({ data: json, loading: false, error: null })
      } catch (e) {
        setState({ data: null, loading: false, error: e })
      }
    }, wait),
    [wait]
  );

  useEffect(() => {
    if (url) {
      const cachedResponse = cache[url]

      if (cachedResponse) {
        setState({ data: cachedResponse, loading: false, error: null })
      } else {
        setState({ data: null, loading: true, error: null })
        debouncedRequest(url);
      }

    } else {
      setState({ data: null, loading: false, error: null })
    }
  }, [url])

  return state
}