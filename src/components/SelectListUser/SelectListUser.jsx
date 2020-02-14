import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar'
import styles from './SelectListUser.module.css'

const propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  focused: PropTypes.bool
}
const defaultProps = {
  focused: false
}

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
       ref={ref}
      >
      <div className={styles.Avatar}>
        <Avatar
          alt={data.id.toString()}
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

SelectListUser.propTypes = propTypes
SelectListUser.defaultProps = defaultProps

export default SelectListUser
