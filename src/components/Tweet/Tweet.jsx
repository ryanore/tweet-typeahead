import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar'
import SelectList from '../SelectList/SelectList'
import SelectListUser from '../SelectListUser/SelectListUser'
import PercentCircle from '../PercentCircle/PercentCircle'
import { useApiGet } from '../../hooks/useApi'
import useWordFind from '../../hooks/useWordFind'
import { replaceAt, findUserHandle /* findHashTag 😄*/ } from '../../utils/string'
import useMaxChar from '../../hooks/useMaxChar'
import styles from './Tweet.module.css'
import { userSearchUrl } from '../../config/urls'

const propTypes =  {
  maxChars: PropTypes.number,
  placeholder: PropTypes.string
}
const defaultProps = {
  maxChars: 280,
  placeholder: 'What\'s Happening?'
}

/**
 *  Tweet - central component
 *  - most state & logic is handled with hooks
 *  - TODO: refactor to use centralized store/actions/reducers
 */
const Tweet = ({maxChars, placeholder}) => {
  const [input, setInput] = useState('')
  const [searchUrl, setSearchUrl] = useState(null)
  const {data, loading, cancel} = useApiGet(searchUrl, 200)
  const {bounds, onCursor, setCursor, events} = useWordFind(input)
  const {percent, exceeded} = useMaxChar(input, maxChars)
  
  const onSelectItem = (data) => {
    const newStr = replaceAt(input, `@${data.screen_name} `, bounds.start, bounds.end)
    setInput(newStr)
    setCursor(1000)
    setSearchUrl(null)
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

  const searchData = data && data.users ? data.users : null

  return (
    <div  data-testid="tweet" className={styles.Tweet}>
      
      <div className={styles.avatarCont}>
        <Avatar />
      </div>
      
      <div className={styles.tweetInputCont}>
        <div className={styles.tweetInput}>
          <div className={styles.tweetText}>
            <textarea 
              className={exceeded ? styles.maxed : null }
              value={input}
              placeholder={placeholder}
              {...events}
              onChange = {onChange}
            />
          </div>
          <div className={styles.tweetFooter}>
            <div className={styles.charCounter}>
              <PercentCircle percent={percent} />
            </div>
            <div className={styles.submitCont}>
              <button onClick={()=>{console.log('tweet!', input)}} >Tweet</button>
            </div>
          </div>
        </div>
      </div>
      {(searchUrl && (loading || searchData) ) &&(
        // These conditions are a symptom of needing state machine (store/reducer)
        <SelectList data={searchData} loading={loading} onSelect={onSelectItem}>
          <SelectListUser />
        </SelectList>
      )}
    </div>
  )
}

Tweet.propTypes = propTypes
Tweet.defaultProps = defaultProps

export default Tweet
