import React from 'react'

import { auth } from '../firebase/firebase-config'
import {
  loginWithFacebook as FirebaseLogin,
  logoutUser as FirebaseLogout,
  FirebaseUser,
} from '../firebase/services/auth'
import LoadingScreen from '../ui-kit/LoadingScreen'


const AuthContext = React.createContext<{
  currentUser: FirebaseUser | undefined
  login: typeof FirebaseLogin
  logout: typeof FirebaseLogout
}>({
  currentUser: undefined,
  login: FirebaseLogin,
  logout: FirebaseLogout,
})

export function useAuth() {
  return React.useContext(AuthContext)
}

export function AuthProvider(props: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = React.useState<
    FirebaseUser | undefined
  >()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const unregister = auth.onAuthStateChanged((user) => {
      setCurrentUser(user as FirebaseUser | undefined)
      setLoading(false)
    })
    return unregister
  }, [])

  const value = React.useMemo(
    () => ({
      currentUser,
      login: FirebaseLogin,
      logout: FirebaseLogout,
    }),
    [currentUser]
  )

  return (
    <AuthContext.Provider value={value}>
      {!loading ? props.children : <div></div> }
    </AuthContext.Provider>
  )
}
