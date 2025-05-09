export function saveCredentials(clientId: string, clientSecret: string) {
  sessionStorage.setItem('clientId', clientId)
  sessionStorage.setItem('clientSecret', clientSecret)
}

export function getCredentials(): {
  clientId: string | null
  clientSecret: string | null
} {
  const clientId = sessionStorage.getItem('clientId')
  const clientSecret = sessionStorage.getItem('clientSecret')

  return { clientId, clientSecret }
}

export function clearCredentials() {
  sessionStorage.removeItem('clientId')
  sessionStorage.removeItem('clientSecret')
}
