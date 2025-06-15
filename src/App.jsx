import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import authServices from './appwrite/auth.js'
import { login, logout } from './features/authSlice.js'
import { Loader } from './componets/index.js'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authServices.getUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false));
  }, [])

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      <h3>Loading False</h3>
    </div>
  )
}

export default App
