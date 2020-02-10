import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { findUserHandle } from '../../utils/string'

const TweetInput = ({placeholder}) => {
  const [input, setInput] = useState('')
  const [cursor, setCursor] = useState(0)
  const [bounds, setBounds] = useState(null)
  const [handle, setHandle] = useState(null)
  

  // When we detect that the cursor has changed
  // Isolate the word, and set the bounds
  useEffect(() => {
    const bounds = {start: 0, end: input.length}
    // Pre cursor: detect beginning of word
    for (let j = cursor; j >= 0; j--) {
      if (input[j] === ' ') {
        bounds.start = j+1;  break;
      }
    }
    // Post cursor:  detect end of word
    for (let i = cursor; i < input.length; i++) {
     if (input[i] === ' ') {
        bounds.end = i; break;
      }
    }
    setBounds(bounds) 
  }, [cursor])


  // set a "handle" property, which is the current word, 
  // if  qualifies as a twitter handle
  useEffect(() => {
    if (bounds) {
      const word = input.substring(bounds.start, bounds.end)
      setHandle(findUserHandle(word))
    }
  }, [bounds])

  const onInteraction = (e) => {
    setInput(e.target.value)
    setCursor(e.target.selectionStart)
  }

  const onKeyUp = (e) => {
    if (e.key.search('Arrow') > -1) {
      onInteraction(e)
    }    
  }
  
  return (
    <div>
      <textarea value={input}
        placeholder={placeholder}
        onChange={onInteraction}
        onClick={onInteraction}
        onKeyUp={onKeyUp}
      />
      <p>{JSON.stringify(bounds)}</p>
      <p>{handle}</p>
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
