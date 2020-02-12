import React, { useEffect, useState } from 'react'
import TweetInput from '../TweetInput/TweetInput'
import SelectList from '../SelectList/SelectList'
import SelectListUser from '../SelectListUser/SelectListUser'
import { useApiGet } from '../../hooks/useApi'
const baseSearchUrl = 'http://localhost:4000/twitter/user/search?username='

const Tweet = () => {
  const [searchUrl, setSearchUrl] = useState(null)
  const [tweet, setTweet] = useState(null)
  const [replaceString, setReplaceString] = useState(null)
  const { data, loading } = useApiGet(searchUrl)

  useEffect(() => {
    if (data && data.users) {
      // console.log('data is ', data)
      // setReplaceString(`@${data.users[0].screen_name}`)
    }
  }, [data])

  const onTweetUpdate = (str) => {
    setTweet(str)
  }

  const onSearch = (str) => {
    setSearchUrl(baseSearchUrl + str)
  }

  const onSelectItem = (data) => {
    setReplaceString(`@${data.screen_name} `)
  }


  return (
    <div data-testid="tweet">
      <TweetInput 
        onSearch={onSearch}
        onTweetUpdate={onTweetUpdate}
        replaceText={replaceString}
      />
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
