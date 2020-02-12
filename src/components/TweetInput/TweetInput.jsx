import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useWordFind from '../../hooks/useWordFind'
import useDebounce from '../../hooks/useDebounce'
import { replaceAt, findUserHandle /* findHashTag 😄*/ } from '../../utils/string'

const TweetInput = ({placeholder, replaceText, onSearch, onTweetUpdate}) => {
  const [input, setInput] = useState('')
  const [word, setWord] = useState(null)
  const handle = useDebounce(findUserHandle(word), 300)
  const {bounds, onCursor, attrs} = useWordFind(input)
  
  useEffect(() => {
    if (bounds) { 
      console.log('bounds changed ', bounds);
      setWord(input.slice(bounds.start, bounds.end) )
    }
  }, [bounds])

  useEffect(() => {
    if (handle) {
      console.log('handleChanged-', handle);
      
      onSearch(handle)
      setWord(null)
    }
  }, [handle])

  useEffect(() => {
    if (replaceText) {
      console.log('replaceText-', replaceText);
      
      const newStr = replaceAt(input, replaceText, bounds.start, bounds.end)
      setInput(newStr)
      onCursor({
        target: {
          selectionStart: input.length
        }
      })
    }
  }, [replaceText])

  useEffect(() => {
    // onTweetUpdate(input)    
  }, [input])


  const onChange = (e) => {
    console.log('onchange-', e.target.value);
    
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
    </div>
  )
}

TweetInput.propTypes = {
  placeholder: PropTypes.string,
  replaceText: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onTweetUpdate: PropTypes.func.isRequired
}

TweetInput.defaultProps = {
  placeholder: 'What\'s Happening?'
}

export default TweetInput