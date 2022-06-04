import React from 'react'
import { GlobalStyle } from './global'
import Routes from './router/Routes'

export default function App() {
  return (
    <React.StrictMode>
        <GlobalStyle />
            <Routes />
    </React.StrictMode>
  )
}
