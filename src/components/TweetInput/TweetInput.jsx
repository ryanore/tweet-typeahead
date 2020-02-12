import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useWordFind from '../../hooks/useWordFind'
import useDebounce from '../../hooks/useDebounce'
import { replaceAt, findUserHandle /* findHashTag 😄*/ } from '../../utils/string'

const TweetInput = ({placeholder, replaceText, onSearch, onTweetUpdate, onParent}) => {
  const [input, setInput] = useState('')
  const [word, setWord] = useState(null)
  // const handle = useDebounce(findUserHandle(word), 300)
  const {bounds, onCursor, events} = useWordFind(input)
  
  useEffect(() => {
    if (bounds) { 
      setWord(input.slice(bounds.start, bounds.end) )
    }
  }, [bounds])

  useEffect(() => {
    if (word) {
      const handle = findUserHandle(word)
      if (handle) {
        console.log('handle', handle);
        onSearch(handle)
      }
    }
  }, [word])

  useEffect(() => {
    if (replaceText) {
      const newStr = replaceAt(input, replaceText, bounds.start, bounds.end)
      setInput(newStr)
      setWord(null)
    }
  }, [replaceText])

  useEffect(() => {
    onTweetUpdate(input)    
  }, [input])


  const onChange = (e) => {
    setInput(e.target.value)
    onCursor(e)
    console.log(bounds, e.target.selectionStart);
    
  }

  return (
    <div>
      <textarea value={input}
        placeholder={placeholder}
        {...events}
        onChange = {onChange}
      />
      <button onClick={() => {
        onParent('@lobster')}
      }>click</button>
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