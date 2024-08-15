export async function getAccessToken(code: string): Promise<any> {

  const response = await fetch(`https://login.microsoftonline.com/consumers/oauth2/v2.0/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.ONEDRIVE_CLIENT_ID!,
      client_secret: process.env.ONEDRIVE_CLIENT_SECRET!,
      code: code,
      redirect_uri: process.env.ONEDRIVE_REDIRECT_URL!
    }).toString()
  })

  return await response.json()
}

export async function getUserEmail(accessToken: string) {
  const response = await fetch('https://graph.microsoft.com/v1.0/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return await response.json()
}
