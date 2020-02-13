import { useState, useEffect } from "react";

/**
 * Hook - useMaxChar
 * @param {string} input - Updates remaining characters on input change
 * @param {number} input - Give it a limit
 */
const useMaxChar = (input, max=280) => {
  const [state, setState] = useState({remaining: max, exceeded: false})
    
  if (max < 0) {
    max = 0
    console.warn('useMaxChar: You\'ve used a negative value for the max argument, defaulting to 0')
  }

  useEffect(() => {
    if ( typeof input === 'string') {
      setState({
        remaining: max - input.length, 
        percent: 100 * (input.length/max),
        exceeded: input.length >= max
      })
    }      
  }, [input])
  
  return state
}

export default useMaxChar