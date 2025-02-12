import Settings from '../Settings'
import Stats from '../Stats'
import styles from './App.module.scss'
import Button from '../../shared/buttons'
import Content from '../Content'
import Header from '../Header'
import Items from '../Items'
import Menu from '../Menu'
import { FloatingButton } from '../../shared/buttons'
import { ButtonContainer } from '../../shared/buttons'




function App() {

  return (
    <>
      <ButtonContainer>
      <div className={styles.app}>
        <Header />
        <Settings />
        <Menu />
      </div>
      </ButtonContainer>
    </>
  )
}

export default App
