import React, { useEffect, useState } from 'react'

const SandboxComponent = () => {
  const [input, setInput] = useState('')
  const [cursor, setCursor] = useState(0)
  const [bounds, setBounds] = useState(null)
  const [handle, setHandle] = useState(null)
  
  /** 
  * Parse Regex for pattern
  */
  const parseString = (pattern, str) => {
    const re = pattern
    return re.exec(str)
  }

  /**
  * Detect a valid twitter @handle from str
  */
  const findUserHandle = (str) => {
    const match = parseString(/(^|[^@\w])@(\w{1,15})\b/ , str)
    if (match && match[0] && match[0].length >= 3) {
      return match[0]
    }
    return null
  }

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
        onChange={onInteraction}
        onClick={onInteraction}
        onKeyUp={onKeyUp}
      />
      <p>{JSON.stringify(bounds)}</p>
      <p>{handle}</p>
    </div>
  )

}

export default SandboxComponent;
