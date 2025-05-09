import React, { useContext, useRef } from 'react'
import Select from 'react-select'

import styles from './Authorize.module.css'

import { buildSpotifyAuthUrl } from '../../lib/spotify.ts'
import { SpotifyContext } from '../../contexts/SpotifyContext.tsx'

const scopes = [
  {
    value: 'ugc-image-upload',
    label: 'Write access to user-provided images'
  },
  {
    value: 'user-read-playback-state',
    label: "Read access to a user's player state"
  },
  {
    value: 'user-modify-playback-state',
    label: "Write access to a user's playback state"
  },
  {
    value: 'user-read-currently-playing',
    label: "Read access to a user's currently playing content"
  },
  {
    value: 'app-remote-control',
    label: 'Remote control playback of Spotify'
  },
  {
    value: 'streaming',
    label: 'Control playback of a Spotify track'
  },
  {
    value: 'playlist-read-private',
    label: "Read access to user's private playlists"
  },
  {
    value: 'playlist-read-collaborative',
    label:
      "Include collaborative playlists when requesting a user's playlists"
  },
  {
    value: 'playlist-modify-private',
    label: "Write access to a user's private playlists"
  },
  {
    value: 'playlist-modify-public',
    label: "Write access to a user's public playlists"
  },
  {
    value: 'user-follow-modify',
    label:
      'Write/delete access to the list of artists and other users that the user follows'
  },
  {
    value: 'user-follow-read',
    label:
      'Read access to the list of artists and other users that the user follows'
  },
  {
    value: 'user-read-playback-position',
    label: "Read access to a user's playback position in a content"
  },
  {
    value: 'user-top-read',
    label: "Read access to a user's top artists and tracks"
  },
  {
    value: 'user-read-recently-played',
    label: "Read access to a user's recently played tracks"
  },
  {
    value: 'user-library-modify',
    label: 'Write/delete access to a user\'s "Your Music" library'
  },
  {
    value: 'user-library-read',
    label: "Read access to a user's library"
  },
  {
    value: 'user-read-email',
    label: "Read access to user's email address"
  },
  {
    value: 'user-read-private',
    label: "Read access to user's subscription details"
  },
  {
    value: 'user-soa-link',
    label: 'Link a partner user account to a Spotify user account'
  },
  {
    value: 'user-soa-unlink',
    label: 'Unlink a partner user account from a Spotify account'
  },
  {
    value: 'soa-manage-entitlements',
    label: 'Modify entitlements for linked users'
  },
  {
    value: 'soa-manage-partner',
    label: 'Update partner information'
  },
  {
    value: 'soa-create-partner',
    label: 'Create new partners, platform partners only'
  }
]

const Authorize: React.FC = () => {
  const { clientId } = useContext(SpotifyContext)
  const selectedScopesRef = useRef<string[] | null>(null)

  async function authorize() {
    if (
      selectedScopesRef.current === null ||
      selectedScopesRef.current.length === 0
    ) {
      alert('Please select at least one scope')
      return
    }
    const url = buildSpotifyAuthUrl(clientId!, selectedScopesRef.current!)

    window.location.href = url
  }

  return (
    <div className={styles.authorize}>
      <p className={styles.step}>Step 2</p>
      <h1>Authorize with Spotify</h1>
      <p>
        Select the desired scopes for your token, and click the button
        below to authorize your Spotify account to the application. You
        will be redirected back here to receive your tokens.
      </p>
      <Select
        isMulti
        isClearable
        onChange={selected => {
          const selectedScopes = selected.map(scope => scope.value)
          selectedScopesRef.current = selectedScopes
        }}
        styles={{
          control: baseStyles => ({
            ...baseStyles,
            backgroundColor: '#111',
            borderColor: '#333'
          }),
          menu: baseStyles => ({
            ...baseStyles,
            backgroundColor: '#111',
            color: '#fff'
          }),
          option: (baseStyles, { isFocused }) => ({
            ...baseStyles,
            backgroundColor: isFocused ? '#333' : '#111',
            color: '#fff',
            cursor: 'pointer'
          }),
          multiValue: baseStyles => ({
            ...baseStyles,
            backgroundColor: '#333'
          }),
          multiValueLabel: baseStyles => ({
            ...baseStyles,
            color: '#fff'
          })
        }}
        options={scopes}
      ></Select>
      <div className={styles.buttons}>
        <button onClick={authorize}>Authorize</button>
      </div>
    </div>
  )
}

export default Authorize
