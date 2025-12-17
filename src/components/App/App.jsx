import AppRouter from '../AppRouter'
import { useState, useEffect } from 'react'
import firebase, { auth } from './firebase.js'
import {addDoc,collection,deleteDoc,doc,getFirestore,onSnapshot,orderBy,query,setDoc} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import Startup from '../Startup'

function App() {

  const [data, setData] = useState([])
  const [typelist, setTypelist] = useState([])
  const [user, setUser] = useState()
  const firestore = getFirestore(firebase)

  //  Uintisuoritukset
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        query(
          collection(firestore, `user/${user.uid}/item`),
          orderBy('swimDate', 'desc')
        ),
        snapshot => {
          const newData = []
          snapshot.forEach(doc => {
            newData.push({ ...doc.data(), id: doc.id })
          })
          setData(newData)
        }
      )
      return unsubscribe
    } else {
      setData([])
    }
  }, [user])

  // Uintityypit
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        query(
          collection(firestore, `user/${user.uid}/type`),
          orderBy('type')
        ),
        snapshot => {
          const newTypelist = []
          snapshot.forEach(doc => {
            newTypelist.push(doc.data().type)
          })
          setTypelist(newTypelist)
        }
      )
      return unsubscribe
    } else {
      setTypelist([])
    }
  }, [user])

  //  Auth
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [])

  const handleTypeSubmit = async (type) => {
    await addDoc(
      collection(firestore, `user/${user.uid}/type`),
      { type }
    )
  }

  const handleItemSubmit = async (newitem) => {
    await setDoc(
      doc(firestore, `user/${user.uid}/item`, newitem.id),
      newitem
    )
  }

  const handleItemDelete = async (id) => {
    await deleteDoc(
      doc(firestore, `user/${user.uid}/item`, id)
    )
  }

  return (
    <>
      {user ? (
        <AppRouter
          data={data}
          typelist={typelist}
          onItemSubmit={handleItemSubmit}
          onItemDelete={handleItemDelete}
          onTypeSubmit={handleTypeSubmit}
          auth={auth}
          user={user}
        />
      ) : (
        <Startup auth={auth} />
      )}
    </>
  )
}

export default App
