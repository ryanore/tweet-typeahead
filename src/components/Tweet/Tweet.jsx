import React, { useEffect, useState } from 'react'
import TweetInput from '../TweetInput/TweetInput'

const Tweet = () => {
  const [searchData, setSearchData] = useState('this is search data')
  const [searchUrl, setSearchUrl] = useState(null)
  const [tweet, setTweet] = useState(null)

  const onSearch = (str) => {
    console.log('onSearch ', str);
    setSearchUrl(`https://google.com/${str}`)
  }

  const onTweetUpdate = (str) => {
    setTweet(str)
  }

  useEffect(() => {
    if (searchUrl) {
      console.log('useEffect searchUrl ', searchUrl);
      setSearchData('@fakeName')
    }
  }, [searchUrl])


  return (
    <div data-testid="tweet">
      <div>
        <TweetInput 
          onSearch={onSearch}
          onTweetUpdate={onTweetUpdate}
          replaceText={searchData}
        />
        <hr />
        <p>{tweet}</p>
      </div>
    </div>
  )
}

export default Tweet
