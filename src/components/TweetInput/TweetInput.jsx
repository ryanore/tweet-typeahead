import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useWordFind from '../../hooks/useWordFind'
import { replaceAt, findUserHandle /* findHashTag 😄*/ } from '../../utils/string'

const TweetInput = ({placeholder, replaceText, onSearch, onTweetUpdate}) => {
  const [input, setInput] = useState('')
  const {bounds, onCursor, attrs} = useWordFind(input)
  
  // if word qualifies as a twitter handle, set handle state
  useEffect(() => {
    if (bounds) {      
      const word = input.slice(bounds.start, bounds.end)      
      const handle = findUserHandle(word)

      if (handle) {
        onSearch(handle)
      }
    }
  }, [bounds])


  // replace text with whatever was passed in as a prop
  useEffect(() => {
    if (replaceText) {
      const newStr = replaceAt(input, replaceText, bounds.start, bounds.end)
      setInput(newStr)
    }
  }, [replaceText])

  useEffect(() => {
    onTweetUpdate(input)    
  }, [input])


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
        onSearch('farts')
      }}>search</button>
    </div>
  )
}

TweetInput.propTypes = {
  placeholder: PropTypes.string,
  replaceText: PropTypes.string,
  onSearch: PropTypes.func.isRequired
}

TweetInput.defaultProps = {
  placeholder: 'What\'s Happening?'
}

export default TweetInput;