import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './SelectList.module.css'
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
        <div data-testid={"loading"} className={styles.loading} >
          "loading ... "
        </div>
      )}

      {data && (
        <div data-testid="select-list-items" className={styles.selectList}>

          {data.map((item, i) => (
            React.Children.map(children, (child => React.cloneElement(child, {
              key: item.id,
              data: item,
              focused: focus === i,
              onClick: () => { onSelect(item) }
            })))
          ))}
        </div>
      )}
    </div>
  )
}


SelectList.propTypes = {
  children: PropTypes.element.isRequired,
  onSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  data: PropTypes.array
}

SelectList.defaultProps = {
  loading: false
}

export default SelectList
