import axios from 'axios'

export function getSpotifyOrigin() {
  const url = new URL(window.location.href)
  url.hostname = url.hostname.replace('localhost', '127.0.0.1')
  return url.origin
}

export function buildSpotifyAuthUrl(clientId: string, scope: string[]) {
  const url = new URL('https://accounts.spotify.com/authorize')
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('client_id', clientId)
  url.searchParams.append('scope', scope.join(' '))
  url.searchParams.append('redirect_uri', getSpotifyOrigin())
  url.searchParams.append('show_dialog', 'true')

  return url.toString()
}

export async function getAccessTokenClientCredentials(
  clientId: string,
  clientSecret: string
) {
  const res = await axios.post(
    'https://accounts.spotify.com/api/token',
    {},
    {
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      validateStatus: () => true
    }
  )

  if (res.status !== 200) return null

  return res.data.access_token
}

export async function getTokens(
  clientId: string,
  clientSecret: string,
  code: string
) {
  const res = await axios.post(
    'https://accounts.spotify.com/api/token',
    {},
    {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: getSpotifyOrigin()
      },

      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      validateStatus: () => true
    }
  )

  if (res.status !== 200) return null

  return {
    access_token: res.data.access_token,
    refresh_token: res.data.refresh_token,
    expires_in: res.data.expires_in
  }
}
