import { useEffect, useState } from 'react'

const isClient = typeof window === 'object'

const  useSessionCache = (key, defaultValue = {}) => {
  if (!isClient) {
    return defaultValue
  }
  
  // clear storage between page refreshes so we know it's fresh
  window.sessionStorage.clear(key)

  const [cache, setCache] = useState(() => {
    let value
    try {
      value = JSON.parse(
        window.sessionStorage.getItem(key) || JSON.stringify(defaultValue),
      )
    } catch (e) {
      value = defaultValue
    }
    return value
  })


  useEffect(() => {
    try {
      const serialized = JSON.stringify(cache)
      window.sessionStorage.setItem(key, serialized)
    } catch (e) {
      console.warn('useSessionCache.js : There was a problem saving your data to sessionStorage')
    }
  }, [cache],
  )
  return [cache, setCache]
}

export default useSessionCache