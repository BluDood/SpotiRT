import React, { useContext, useEffect } from 'react'
import party from 'party-js'

import styles from './Done.module.css'

import { SpotifyContext } from '../../contexts/SpotifyContext.tsx'
import { formatSeconds } from '../../lib/utils.ts'

interface DoneProps {
  onStepComplete: () => void
}

const Done: React.FC<DoneProps> = ({ onStepComplete }) => {
  const { tokens, timeLeft } = useContext(SpotifyContext)

  useEffect(() => {
    party.confetti(document.body, {
      count: 30,
      spread: 40,
      size: 1
    })
  }, [])

  return (
    <div className={styles.done}>
      <img src="/icon-192.png" alt="" />
      <h1>Authorization Complete!</h1>
      <p>Here are your tokens:</p>
      <div className={styles.fields}>
        <div className={styles.field}>
          <p>Refresh Token</p>
          <input
            type="text"
            disabled
            defaultValue={tokens.refresh_token!}
          />
          <button
            onClick={() =>
              navigator.clipboard.writeText(tokens.refresh_token!)
            }
          >
            <span className="material-icons">content_copy</span>
          </button>
        </div>
        <div className={styles.double}>
          <div className={styles.field}>
            <p>Access Token</p>
            <input
              type="text"
              disabled
              defaultValue={tokens.access_token!}
            />
            <button
              onClick={() =>
                navigator.clipboard.writeText(tokens.access_token!)
              }
            >
              <span className="material-icons">content_copy</span>
            </button>
          </div>
          <div className={styles.field}>
            <p>Expires in</p>
            <input type="text" disabled value={formatSeconds(timeLeft!)} />
          </div>
        </div>
      </div>
      <p>All temporarily saved data has been cleared.</p>
      <div className={styles.buttons}>
        <button onClick={onStepComplete}>Restart</button>
      </div>
    </div>
  )
}

export default Done
