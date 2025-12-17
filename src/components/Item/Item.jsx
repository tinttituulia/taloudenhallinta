import styles from './Item.module.scss'
import { MdNavigateNext } from 'react-icons/md'
import { Link } from 'react-router-dom'



function Item({data, ...props}) {

  const locale = "fi-FI"
  const swimDate = new Date(data.swimDate).toLocaleDateString(locale)
  const kmFormat = new Intl.NumberFormat(locale, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })
  const distance = kmFormat.format(data.distance) + " km"

  return (
    <div className={styles.item}>
        <div className={styles.item_data}>
        <div className={styles.item_type}>{data.type}</div>
        <div className={styles.item_distance}>{distance}</div>
        <div className={styles.item_date}>{swimDate}</div>
        <div className={styles.item_receiver}>{data.receiver}</div>
      </div>
      <div className={styles.item_edit}>
        <Link to={"/edit/" + data.id}><MdNavigateNext /></Link>
      </div>
    </div>
  )

  }
  
  export default Item
  