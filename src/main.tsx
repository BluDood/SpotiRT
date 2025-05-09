import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { SpotifyContextProvider } from './contexts/SpotifyContext.tsx'

import App from './App.tsx'

import './index.css'
import '@fontsource-variable/open-sans'
import '@fontsource/material-icons'

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <SpotifyContextProvider>
      <App />
    </SpotifyContextProvider>
  </StrictMode>
)
