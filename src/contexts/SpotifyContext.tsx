import React, { createContext, useEffect, useRef, useState } from 'react'
import { saveCredentials } from '../lib/storage.ts'

interface Tokens {
  access_token: string | null
  refresh_token: string | null
  expires_in: number | null
}

interface SpotifyContextProps {
  clientId: string | null
  clientSecret: string | null
  setCredentials: (id: string, secret: string) => void
  tokens: Tokens
  setTokens: (tokens: Tokens) => void
  timeLeft: number | null
}

const SpotifyContext = createContext<SpotifyContextProps>({
  clientId: null,
  clientSecret: null,
  setCredentials: () => {},
  tokens: {
    access_token: null,
    refresh_token: null,
    expires_in: null
  },
  setTokens: () => {},
  timeLeft: null
})

interface SpotifyContextProviderProps {
  children: React.ReactNode
}

const SpotifyContextProvider: React.FC<SpotifyContextProviderProps> = ({
  children
}) => {
  const [clientId, setClientId] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [tokens, _setTokens] = useState<Tokens>({
    access_token: null,
    refresh_token: null,
    expires_in: null
  })

  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const tokenExpiresRef = useRef<number | null>(null)

  useEffect(() => {
    let interval: number | null = null
    if (tokens.expires_in) {
      const updateTimeLeft = () => {
        const timeLeft = tokenExpiresRef.current! - Date.now()
        setTimeLeft(Math.floor(timeLeft / 1000))
      }
      interval = setInterval(updateTimeLeft, 1000)
      updateTimeLeft()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [tokens])

  const setCredentials = (id: string, secret: string) => {
    setClientId(id)
    setClientSecret(secret)
    saveCredentials(id, secret)
  }

  const setTokens = (tokens: Tokens) => {
    _setTokens(tokens)
    tokenExpiresRef.current = Date.now() + tokens.expires_in! * 1000
  }

  return (
    <SpotifyContext.Provider
      value={{
        clientId,
        clientSecret,
        setCredentials,
        tokens,
        setTokens,
        timeLeft
      }}
    >
      {children}
    </SpotifyContext.Provider>
  )
}

export { SpotifyContext, SpotifyContextProvider }
