import React, { useRef, useEffect, useState } from 'react'
import Avatar from '../Avatar/Avatar'
import SelectList from '../SelectList/SelectList'
import SelectListUser from '../SelectListUser/SelectListUser'
import { useApiGet } from '../../hooks/useApi'
import useWordFind from '../../hooks/useWordFind'
import { replaceAt, findUserHandle /* findHashTag 😄*/ } from '../../utils/string'
import useMaxChar from '../../hooks/useMaxChar'
import styles from './Tweet.module.css'
import { userSearchUrl } from '../../config/urls'

const Tweet = ({placeholder = "What's Happening", maxChars=280}) => {
  const [input, setInput] = useState('')
  const [searchUrl, setSearchUrl] = useState(null)
  const {data, loading} = useApiGet(searchUrl)
  const {bounds, onCursor, setCursor, events} = useWordFind(input)
  const {remaining, exceeded} = useMaxChar(input, maxChars)
  const txtRef = useRef(null)
  
  const onSelectItem = (data) => {
    const newStr = replaceAt(input, `@${data.screen_name} `, bounds.start, bounds.end)
    setInput(newStr)
    setCursor(1000)
    setSearchUrl(null)
    txtRef.current.focus();
  }

  useEffect(() => {
    if (bounds) { 
      const str = input.slice(bounds.start, bounds.end)
      const handle = findUserHandle(str, 2)
      const url = handle ? (userSearchUrl + str) : null
      setSearchUrl(url)
    }
  }, [bounds])

  const onChange = (e) => {
    setInput(e.target.value)
    onCursor(e)
  }
  
  return (
    <div  data-testid="tweet" className={styles.Tweet}>
      
      <div className={styles.avatarCont}>
        <Avatar />
      </div>
      
      <div className={styles.tweetInputCont}>
        <div className={styles.tweetInput}>
          <div className={styles.tweetText}>
            <textarea 
              ref={txtRef}
              value={input}
              placeholder={placeholder}
              {...events}
              onChange = {onChange}
              disabled={exceeded}
            />
          </div>
          <div className={styles.tweetFooter}>
            <div className={styles.charCounter}>
              {!exceeded
              ? <span>Remaining: {remaining}</span>
              : <span>Max Character Limit!</span>
              }
            </div>
            <div className={styles.submitCont}>
              <button onClick={()=>{console.log('tweet!', input)}} >Tweet</button>
            </div>
          </div>
        </div>
      </div>
        {data && data.users &&
          // Compose children for flexibility (i.e. #hashtags)
          <SelectList data={data.users} loading={loading} onSelect={onSelectItem}>
            <SelectListUser />
          </SelectList>
        }
    </div>
  )
}

export default Tweet
