
/** 
* Parse Regex for pattern
* @pattern regex pattern
* @str a string to parse
*/
export const parseString = (pattern, str) => {
  const re = pattern
  return re.exec(str)
}

/**
* Detect a valid twitter @handle from str
* @str - a string to test
* @pattern - regex pattern - optional
*/
export const findUserHandle = (str, pattern=/(^|[^@\w])@(\w{1,15})\b/) => {
  const match = parseString(pattern , str)
  if (match && match[0] && match[0].length >= 3) {
    return match[0]
  }
  return null
}

/**
* Replace a section of a string with a new string
* @str - the original string
* @newstr - the new chunck
* @start - index to start
* @end - index to end
*/
export const replaceAt = (str, newstr, start, end) => {
  return str.substring(0, start) + newstr + str.substring(end)
}

