import { useEffect, useState } from "react"

/**
 * Hook - useApiGet
 * @param {string} url - The url to request.  Hook only executes when url changes
 * 
 * The useEffect only executes when the url arg changes.  
 * Debouncing takes place in the component level
 */
export const useApiGet = (url) => {
  const [state, setState] = useState({ data: null, loading: false, error: null })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setState({ data: json, loading: false, error: null })
      } catch (e) {
        setState({ data: null, loading: false, error: e })
      }
    }

    if (url) {
      fetchData()
    } else {
      setState({ data: null, loading: false, error: null })
    }

  }, [url])
  
  return state
}
  