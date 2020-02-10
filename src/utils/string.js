 
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
