import React, { useContext, useEffect, useRef, useState } from 'react'

import { clearCredentials, getCredentials } from '../../lib/storage.ts'
import { getTokens } from '../../lib/spotify.ts'

import styles from './RetrieveToken.module.css'

import { SpotifyContext } from '../../contexts/SpotifyContext.tsx'
import Loader from '../../components/Loader/Loader.tsx'

interface RetrieveTokenProps {
  onStepComplete: (success: boolean) => void
}
enum State {
  Pending,
  Checking,
  Error
}

const RetrieveToken: React.FC<RetrieveTokenProps> = ({
  onStepComplete
}) => {
  const { setTokens, setCredentials } = useContext(SpotifyContext)

  const running = useRef(false)
  const [state, setState] = useState<State>(0)
  const [error, setError] = useState<string | null>(null)

  function cleanup() {
    clearCredentials()
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    )
  }

  useEffect(() => {
    async function retrieve() {
      const params = new URLSearchParams(window.location.search)
      const error = params.get('error')
      if (error) {
        setState(State.Error)
        setError(`Authorization failed: ${error}`)
        cleanup()
        return
      }
      setState(State.Checking)
      const code = params.get('code')!
      const { clientId, clientSecret } = getCredentials()
      if (!clientId || !clientSecret) {
        setState(State.Error)
        setError('Missing code or credentials')
        cleanup()
        return
      }

      const tokens = await getTokens(clientId, clientSecret, code)
      if (tokens === null) {
        setState(State.Error)
        setError('Invalid code or credentials')
        cleanup()
        return
      }

      setTokens(tokens)
      setCredentials(clientId, clientSecret)
      onStepComplete(true)
      cleanup()
    }

    if (!running.current) {
      running.current = true
      retrieve()
    }
  }, [setTokens, setCredentials, onStepComplete])

  return (
    <div className={styles.retrieve}>
      <p className={styles.step}>Step 3</p>
      <h1>Retrieve Token</h1>

      {state === State.Checking ? (
        <div className={styles.state} key={'checking'}>
          <Loader size={32} />
          <p>Checking credentials</p>
        </div>
      ) : state === State.Error ? (
        <div className={styles.state} key={'error'}>
          <span className="material-icons" data-type={'error'}>
            error
          </span>
          <p>{error}</p>
        </div>
      ) : null}

      <div className={styles.buttons}>
        {state === State.Error ? (
          <button onClick={() => onStepComplete(false)}>Go back</button>
        ) : null}
      </div>
    </div>
  )
}

export default RetrieveToken
