import { useState, useEffect } from "react";

/**
 * Hook - useMaxChar
 * @param {string} input - Updates remaining characters on input change
 */
const useMaxChar = (input, max) => {
  const [state, setState] = useState({remaining: max, exceeded: false})
  
  useEffect(() => {
    if (input && typeof input === 'string') {
      setState({remaining: max - input.length, exceeded: input.length >= max })
    }      
  }, [input])
  
  return state
}

export default useMaxChar