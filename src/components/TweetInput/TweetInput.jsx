import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useWordFind from '../../hooks/useWordFind'
import { replaceAt, findUserHandle /* findHashTag 😄*/ } from '../../utils/string'

const TweetInput = ({placeholder}) => {
  const [input, setInput] = useState('')
  const [handle, setHandle] = useState(null)
  const [bounds, onCursor, attrs] = useWordFind(input)

  // if word qualifies as a twitter handle, set handle state=
  useEffect((stuff) => {
    if (bounds) {
      const word = input.slice(bounds.start, bounds.end)
      const handle = findUserHandle(word)
      if (handle) {
        // make the API request ???
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
        onChange = {onChange}
        {...attrs}
      />
      <button onClick={() => {
        const newStr = replaceAt(input, 'FOOOBAR', bounds.start, bounds.end)
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
