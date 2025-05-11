import React from 'react'

import styles from './Welcome.module.css'

interface WelcomeProps {
  onStepComplete: () => void
}

const Welcome: React.FC<WelcomeProps> = ({ onStepComplete }) => {
  return (
    <div className={styles.welcome}>
      <img src="/icon-192.png" alt="" />
      <h1>Welcome to SpotiRT!</h1>
      <p>
        This website will help you create a Spotify application and
        retrieve tokens for use with the Spotify API.
      </p>
      <p>
        Data is only sent directly to Spotify or processed in your browser,
        and never sent to any other server. Your credentials are
        temporarily saved to session storage while authorizing.
      </p>
      <div className={styles.links}>
        <a href="https://bludood.com" target="_blank">
          <img src="/icons/bludood.png" alt="" />
        </a>
        <a href="https://github.com/BluDood/SpotiRT" target="_blank">
          <img src="/icons/github.svg" alt="" />
        </a>
      </div>
      <div className={styles.buttons}>
        <button onClick={onStepComplete}>Get Started</button>
      </div>
    </div>
  )
}

export default Welcome
