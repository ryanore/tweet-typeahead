import {useState, useEffect} from 'react'
/**
 * useWordFind  (naming things is hard)
 * Get the start/end index of whatever word the cursor is on
 */

const useWordFind = (input) => {
  const [cursor, setCursor] = useState(input.length || 0)
  const [bounds, setBounds] = useState({start: 0, end: 0})
  
  useEffect(() => {
    if (input) {
      const bounds = {start: 0, end: input.length}
      for (let i = cursor; i < input.length; i++) {
        if (input[i] === ' ') {
          bounds.end = i; break;
        }
      }
      
      for (let j = cursor; j >= 0; --j) {
        if (input[j] === ' ') {
          bounds.start = j+1; break;
        }
      }
      // accounts for cursor being on empty spaces
      if (bounds.end < bounds.start){
        bounds.start = bounds.end
      }
      
      setBounds(bounds)       
    }
  }, [cursor, input])

  const onCursor = (e) => {
    setCursor(e.target.selectionStart)
  }

  const onKeyUp = (e) => {
    if (e.key.search('Arrow') > -1) {
      onCursor(e)
    }    
  }

  /*
   * setCursorPosition
   * Manually set the position, (Workaround)
   */
  const setCursorPosition = (num) => {
    const newPosition = num || 1000
    setCursor(newPosition)
  }

  return {
    bounds,
    onCursor,
    setCursor: setCursorPosition,
    events: {
      onKeyUp: onKeyUp,
      onClick: onCursor,
      onChange: onCursor
    }
  }
}

export default useWordFind