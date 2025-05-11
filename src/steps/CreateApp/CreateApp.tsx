import React, { useContext, useRef, useState } from 'react'

import styles from './CreateApp.module.css'

import Loader from '../../components/Loader/Loader.tsx'
import {
  getAccessTokenClientCredentials,
  getSpotifyOrigin
} from '../../lib/spotify.ts'
import { SpotifyContext } from '../../contexts/SpotifyContext.tsx'

interface CreateAppProps {
  onStepComplete: () => void
}

enum State {
  Pending,
  Checking,
  Valid,
  Error
}

const CreateApp: React.FC<CreateAppProps> = ({ onStepComplete }) => {
  const [state, setState] = useState<State>(0)
  const [error, setError] = useState<string | null>(null)
  const idRef = useRef<HTMLInputElement | null>(null)
  const secretRef = useRef<HTMLInputElement | null>(null)
  const { setCredentials } = useContext(SpotifyContext)

  async function check() {
    setState(State.Checking)
    const id = idRef.current?.value
    const secret = secretRef.current?.value
    if (!id || !secret) {
      setState(State.Error)
      setError('Please fill out both fields')
      return
    }
    const token = await getAccessTokenClientCredentials(id, secret)
    if (!token) {
      setState(State.Error)
      setError('Invalid credentials!')
      return
    }
    setCredentials(id, secret)
    setState(State.Valid)
  }

  return (
    <div className={styles.create}>
      <p className={styles.step}>Step 1</p>
      <h1>Create Spotify application</h1>

      <div className={styles.content}>
        <p>
          This will be used to authenticate your Spotify account and
          generate tokens.
        </p>
        <ol>
          <li>
            <a
              href="https://developer.spotify.com/dashboard"
              target="_blank"
            >
              Go to the developer dashboard and sign in.
            </a>
          </li>
          <li>
            <p>
              Create a new application and fill out a name and description.
              Check the box for use of the <code>Web API</code>.
            </p>
          </li>
          <li>
            <p>
              Set the <code>Redirect URI</code> to{' '}
              <code>{getSpotifyOrigin()}</code>. This will redirect Spotify
              back here.
            </p>
          </li>
          <li>
            <p>
              Click <code>Create App</code> and copy your{' '}
              <code>Client ID</code> and <code>Client Secret</code>. Paste
              them below, and click "Check".
            </p>
          </li>
        </ol>
        <div className={styles.inputs}>
          <input
            type="text"
            className={styles.input}
            placeholder="Client ID"
            ref={idRef}
            disabled={![State.Pending, State.Error].includes(state)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Client Secret"
            ref={secretRef}
            disabled={![State.Pending, State.Error].includes(state)}
          />
        </div>
        {state === State.Checking ? (
          <div className={styles.state} key={'checking'}>
            <Loader size={32} />
            <p>Checking credentials</p>
          </div>
        ) : state === State.Valid ? (
          <div className={styles.state} key={'valid'}>
            <span className="material-icons">check_circle</span>
            <p>Valid credentials!</p>
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
          {[State.Pending, State.Error].includes(state) ? (
            <button onClick={check}>Check</button>
          ) : state === State.Valid ? (
            <button onClick={onStepComplete}>Continue</button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default CreateApp
