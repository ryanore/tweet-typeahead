import {useState, useEffect} from 'react'
/**
 * Using the cursor position and the full text,
 *  find the start & end position of whatever word
 *  the users' cursor is currently on.
 *
 * (naming things is hard)
 */

const useWordFind = (input) => {
  const [cursor, setCursor] = useState(0)
  const [bounds, setBounds] = useState(null)
  
  useEffect((stuff) => {
    if (input) {
      const bounds = {start: 0, end: input.length}
      for (let j = cursor; j >= 0; j--) {
        if (input[j] === ' ') {
          bounds.start = j+1;  break;
        }
      }
      for (let i = cursor; i < input.length; i++) {
        if (input[i] === ' ') {
          bounds.end = i; break;
        }
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

  return {
    bounds,
    onCursor,
    attrs: {
      onKeyUp: onKeyUp,
      onClick: onCursor,
      onChange: onCursor
    }
  }
}

export default useWordFind