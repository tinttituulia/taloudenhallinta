import { NavLink } from 'react-router-dom'
import styles from './Menu.module.scss'
import { MdViewList } from 'react-icons/md'
import { MdTimeline } from 'react-icons/md'
import { MdSettings } from 'react-icons/md'


function Menu() {

  return (
    <div className={styles.menu}>
      <div><NavLink to=""><MdViewList /></NavLink></div>
      <div><NavLink to="/stats"><MdTimeline /></NavLink></div>
      <div><NavLink to="/settings"><MdSettings /></NavLink></div>
    </div>
  )

}

export default Menu
