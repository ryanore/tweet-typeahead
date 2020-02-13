import React, { useEffect, useState } from 'react'
import styles from './SelectList.module.css'
// import SelectListUser from '../SelectListUser/SelectListUser'
import useKeyPress from '../../hooks/useKeypress'

const SelectList = ({children, data, onSelect, loading}) => {
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [focus, setFocus] = useState(0)

  useEffect(() => {
    if (data && downPress) {
      setFocus(prev => (prev < data.length - 1 ? prev + 1 : prev));
    }
  }, [data, downPress])
  
  useEffect(() => {
    if (data && upPress) {
      setFocus(prev => (prev > 0 ? prev - 1 : prev));
    }
  }, [data, upPress])

  useEffect(() => {
    if (data && enterPress) {
      onSelect(data[focus])
    }
  }, [data, enterPress])
  
  return (
    <div data-testid={'select-list'}>
      {loading && (
        <div className={styles.loading} >
          "loading ... "
        </div>
      )}

      {data && (
        <div className={styles.selectList}>

          {data.map((item, i) => (
            React.Children.map(children, (child => React.cloneElement(child, {
              key: item.id,
              data: item,
              focused: focus === i,
              onClick: () => { onSelect(item) }
            })))
          ))}

          {/* {data.map((item, i) => (
            <SelectListUser
              key={item.id} 
              data={item}
              focused={focus === i}
              onClick={() => {
                onSelect(item)
              }}
            />
          ))} */}

        </div>
      )}
    </div>
  )
}
export default SelectList
