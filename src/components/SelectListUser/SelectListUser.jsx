import React from 'react'
import Avatar from '../Avatar/Avatar'
import styles from './SelectListUser.module.css'

const SelectListUser = ({data, onClick, focused}) => {
  const classes = [styles.selectListItem]
  
  if (focused) {
    classes.push(styles.withFocus)
  }

  return (
    data && (
    <li onClick={onClick} className={classes.join(' ')}>
      <Avatar
        className={styles.Avatar}
        alt={data.id}
        url={data.profile_image_url} 
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
export default SelectListUser
