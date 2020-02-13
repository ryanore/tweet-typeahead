import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar'
import styles from './SelectListUser.module.css'

const SelectListUser = ({data, onClick, focused}) => {
  const classes = [styles.selectListItem]
  
  if (focused) {
    classes.push(styles.withFocus)
  }
  
  return (
    data && (
    <li data-testid={"select-list-user"} onClick={onClick} className={classes.join(' ')}>
      <Avatar
        className={styles.Avatar}
        alt={data.id}
        image={data.profile_image_url} 
      />
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
