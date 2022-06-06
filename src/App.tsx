import React from 'react'
import { GlobalStyle } from './global'
import Routes from './router/Routes'
import { AuthProvider } from './sg-context/AuthContext'

export default function App() {
  return (
    <React.StrictMode>
        <GlobalStyle />
            <AuthProvider>
            <Routes />
            </AuthProvider>
          
    </React.StrictMode>
  )
}
