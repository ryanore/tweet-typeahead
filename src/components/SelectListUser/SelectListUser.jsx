import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar'
import styles from './SelectListUser.module.css'

const SelectListUser = ({data, onClick, focused}) => {
  const classes = [styles.selectListItem]
  const ref = useRef(null);

  useEffect(() => {
    if (focused) {
      ref.current.focus();
    }
  }, [focused]);

  if (focused) {
    classes.push(styles.withFocus)
  }

  return (
    data && (
    <li data-testid={"select-list-user"}
       onClick={onClick}
       className={classes.join(' ')}
       tabIndex={focused ? 0 : -1}
       ref={ref}
      >
      <div className={styles.Avatar}>
        <Avatar
          alt={data.id}
          image={data.profile_image_url} 
        />
      </div>
      <div
        className={styles.userDetails}>
        <strong>{data.name}</strong>
        <br />
        <span className={styles.lighter}>
          @{data.screen_name}
        </span>
      </div>
    </li>
    )
  )
}



SelectListUser.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  focused: PropTypes.bool
}

SelectListUser.defaultProps = {
  focused: false
}

export default SelectListUser
