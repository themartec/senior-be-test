import express from 'express'
import { googleAuthClient } from '@/utils/googledrive.utlis'
import { UserDAO } from '@/model/dao'
import { refreshToken } from '@/service/onedriveFile.service'
import { getUserEmail } from '@/utils/onedrive.utils'
import { getUserTokensByIntegrationService, saveTokenMetadataService } from '@/service/user.service'


export const getTokensMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const userIdCookie = req.signedCookies['auth']
  // const userIdCookie = 'sangtq969@gmail.com'

  const url = req.originalUrl.toLowerCase()

  if (!userIdCookie) return res.status(401).send('Cookies not present')

  try {
    const provider = getProvider(url)
    let tokensFromDB = await getUserTokensByIntegrationService(userIdCookie, provider)
    tokensFromDB.email = userIdCookie

    if (!tokensFromDB) {
      return res.status(401).send('Unauthorized')
    }

    //if token_expired
    if (Number(tokensFromDB.expiredAt) <= new Date().getTime() - (1000 * 60)) {
      console.log(`Access token expired at ${new Date(tokensFromDB.expiredAt).toLocaleString()}, refreshing using refresh token.`)
      const data = await refreshTokenByType(tokensFromDB, provider)

      await saveTokenMetadataService(data?.email, provider, data?.credentials!)
      //re-fetch after refresh token
      tokensFromDB = await getUserTokensByIntegrationService(userIdCookie, provider)
      tokensFromDB.email = userIdCookie
    }

    req.currentUser = tokensFromDB
    next()
  } catch (error) {
    console.error('Error retrieving tokens:', error)
    res.status(500).send('Internal Server Error')
  }
}

function getProvider(url: string) {
  let provider
  if (url.includes('google')) {
    provider = 'google'
  } else if (url.includes('onedrive')) {
    provider = 'onedrive'
  } else {
    provider = 'unknown'
  }
  return provider.toUpperCase()
}

async function refreshTokenByType(oldToken: UserDAO, integrationType: string) {
  switch (integrationType) {
    case 'GOOGLE': {
      googleAuthClient.setCredentials({
        access_token: oldToken.accessToken,
        refresh_token: oldToken.refreshToken
      })
      const { credentials } = await googleAuthClient.refreshAccessToken()
      const { email } = await googleAuthClient.getTokenInfo(credentials.access_token as string)
      return {
        email: email, credentials: {
          accessToken: credentials.access_token,
          refreshToken: credentials.refresh_token,
          expiredAt: credentials.expiry_date!
        }
      }
    }
    case 'ONEDRIVE': {
      const tokenResponse = await refreshToken(oldToken.refreshToken)
      const userData = await getUserEmail(tokenResponse.access_token)
      return {
        email: userData.mail,
        credentials: {
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
          expiredAt: new Date().getTime() + (tokenResponse.expires_in * 1000)
        }
      }
    }
  }
}