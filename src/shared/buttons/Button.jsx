import clsx from 'clsx'
import styles from './buttons.module.scss'

function Button({className, primary, secondary, ...props}) {
  return (
    <button type='button' 
    className={clsx(
      styles.button,
      className,  
      primary && styles.button_primary,
     secondary && styles.button_secondary
    )} 
    {...props} />  

  )
}

export { Button as default, Button }
