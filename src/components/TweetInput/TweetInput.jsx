// 1. Hook: useWordFind -  Word detection, isolation based on Cursor Position in an input/texarea
// 2. Util: Pattern matching - Validate a @username 
// 3. Util: Word Replace - Modify input string to replace word with the incoming "TypeAhead" name 

/**
  Detects input change, 
  Finds words based on cursor position
 */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useWordFind from '../../hooks/useWordFind'
import { replaceAt, findUserHandle /* findHashTag 😄*/ } from '../../utils/string'

const TweetInput = ({placeholder}) => {
  const [input, setInput] = useState('')
  const {bounds, onCursor, attrs} = useWordFind(input)

  // if word qualifies as a twitter handle, set handle state=
  useEffect((stuff) => {
    if (bounds) {      
      const word = input.slice(bounds.start, bounds.end)      
      const handle = findUserHandle(word)
      
      if (handle) {
        // make request?
      }
    }
  }, [bounds])

  const onChange = (e) => {
    setInput(e.target.value)
    onCursor(e)
  }

  return (
    <div>
      <textarea value={input}
        placeholder={placeholder}
        {...attrs}
        onChange = {onChange}
      />
      <button onClick={() => {
        const newStr = replaceAt(input, '-----', bounds.start, bounds.end)
        setInput(newStr)
      }}>
        Replace the word 
      </button>
    </div>
  )
}

TweetInput.propTypes = {
  placeholder: PropTypes.string,
}

TweetInput.defaultProps = {
  placeholder: 'What\'s Happening?'
}

export default TweetInput;
