import React, { useEffect, useState } from 'react'
import TweetInput from '../TweetInput/TweetInput'
import { useApiGet } from '../../hooks/useApi'

const baseSearchUrl = 'http://localhost:4000/twitter/user/search?username='

const Tweet = () => {
  const [searchUrl, setSearchUrl] = useState(null)
  const [tweet, setTweet] = useState(null)
  const [replaceString, setReplaceString] = useState(null)
  const { data, loading } = useApiGet(searchUrl)

  const onTweetUpdate = (str) => {
    setTweet(str)
  }

  const onSearch = (str) => {
    setSearchUrl(`${baseSearchUrl}str`)
  }

  useEffect(() => {
    if (data) {
      console.log('data is ', data)
      setReplaceString(data.users[0].screen_name)
    }
  }, [data])


  return (
    <div data-testid="tweet">
      {loading && <div>loading ... </div> }
      <div>
        <TweetInput 
          onSearch={onSearch}
          onTweetUpdate={onTweetUpdate}
          replaceText={replaceString}
        />
        <hr />
        <p>{tweet}</p>
      </div>
    </div>
  )
}

export default Tweet
