import React, { useContext, useState, useEffect } from 'react';

import { apiClient } from '../api/supabase';

export const AuthContext = React.createContext({
  user: null, session: null
})

export const AuthContextProvider = (props) => {
const [session, ] = useState(null)
const [user, setUser] = useState(null)

useEffect(() => {
  apiClient.auth.getSession().then(({data: {session}}) => {
    setUser(session?.user ?? null)
  })

  const { data: authListener } = apiClient.auth.onAuthStateChange(
    async (event, session) => {
      setUser(session?.user ?? null)
    }
  )

  return () => {
    authListener.subscription.unsubscribe()
  }
}, [])

const value = {
  session: session,
  user: user,
}

return <AuthContext.Provider value={value} {...props} />
}

export const useAuth = () => {
const context =  useContext(AuthContext)
if (context === undefined)
  throw new Error('useAuth must be used within a AuthContextProvider.')
return context;
}
