import AppRouter from '../AppRouter'
import { useState } from 'react'
import useLocalStorage from '../../shared/uselocalstorage'
import firebase from './firebase.js'
import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc  } from 'firebase/firestore'
import { useEffect } from 'react'





function App() {
const handleTypeSubmit = (type) => {
    let copy = typelist.slice()
    copy.push(type)
    copy.sort()
    setTypelist(copy)
  }
  const [data, setData] = useState([])
  const [typelist, setTypelist] = useLocalStorage('taloudenhallinta-typelist',[])
  const firestore = getFirestore(firebase)
  useEffect( () => {
    const unsubscribe = onSnapshot(collection(firestore,'item'), snapshot => {
      const newData = []
      snapshot.forEach( doc => {
        newData.push({ ...doc.data(), id: doc.id })
      })
      setData(newData)    
    })
    return unsubscribe
  }, [])
  const handleItemDelete = async (id) => {
    await deleteDoc(doc(firestore, 'item', id))
  }
const handleItemSubmit = async (newitem) => {
  await setDoc(doc(firestore, 'item', newitem.id), newitem)
}

  return (
    <>
      <AppRouter data={data}
                 typelist={typelist}
                 onItemSubmit={handleItemSubmit}
                 onItemDelete={handleItemDelete}
                 onTypeSubmit={handleTypeSubmit} />
    </>
  )
}

export default App

