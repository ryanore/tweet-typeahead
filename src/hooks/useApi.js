import { useEffect, useState } from "react"

/**
 * Hook - useApiGet
 * @param {string} url - The url to request.  Hook only executes when url changes
 * 
 * The useEffect only executes when the url arg changes.  
 * Debouncing takes place in the component level
 */
export const useApiGet = (url) => {
  const [state, setState] = useState({ data: null, loading: false })
  
  useEffect(() => {
    if (url) {
      setState(state => ({ data: state.data, loading: true }))
      fetch(url)
        .then((data) => {
            return data.json()
        })
        .then((json) => {
          setState({ data: json, loading: false })
        })
    }
    else {
      console.log('NO URL');
      
      setState({data: null, loading: false})
    }
  }, [url])

  return state
}