import express from 'express'
import { googleAuthClient } from '@/utils/googledrive.utlis'
import { refreshToken } from '@/service/onedriveFile.service'
import { getUserEmail } from '@/utils/onedrive.utils'
import { getUserTokensByIntegrationService, removeExpiredToken, saveTokenMetadataService } from '@/service/user.service'
import { RefreshTokenResponse, UserDAO } from '@/model/type'


export const getTokensMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  const userIdCookie = req.signedCookies['auth']

  const url = req.originalUrl.toLowerCase()

  if (!userIdCookie) return res.status(401).send('Cookies not present')

  try {
    const provider = getProvider(url)
    let tokensFromDB = await getUserTokensByIntegrationService(userIdCookie, provider)
    tokensFromDB.email = userIdCookie

    if (!tokensFromDB.accessToken) {
      return res.status(401).send('Unauthorized')
    }

    //if token_expired
    if (Number(tokensFromDB.expiredAt) <= new Date().getTime() - (1000 * 60)) {
      console.log(`Access token expired at ${new Date(tokensFromDB.expiredAt).toLocaleString()}, refreshing using refresh token.`)
      const data = await refreshTokenByType(tokensFromDB, provider)
      if (data.status > 200) {
        await removeExpiredToken(userIdCookie, provider)
        res.status(401).send('Refresh token fails')
        return
      }
      await saveTokenMetadataService(data.email!, provider, data.credentials!)
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

async function refreshTokenByType(oldToken: UserDAO, integrationType: string): Promise<RefreshTokenResponse> {
  switch (integrationType) {
    case 'GOOGLE': {
      try {
        googleAuthClient.setCredentials({
          access_token: oldToken.accessToken,
          refresh_token: oldToken.refreshToken
        })
        const { credentials } = await googleAuthClient.refreshAccessToken()
        const { email } = await googleAuthClient.getTokenInfo(credentials.access_token as string)
        return {
          status: 200,
          message: `Refresh for ${integrationType} success`,
          email: email,
          credentials: {
            accessToken: credentials.access_token!,
            refreshToken: credentials.refresh_token!,
            expiredAt: credentials.expiry_date!
          }
        }
      } catch (err) {
        console.error('Error retrieving refresh token:', err)
        return {
          message: `Refresh token expired, please connect to ${integrationType} again`,
          status: 401
        }
      }
    }
    case 'ONEDRIVE': {
      const tokenResponse = await refreshToken(oldToken.refreshToken)
      if (tokenResponse.status === 200) {
        const tokenJson = await tokenResponse.json()
        const userData = await getUserEmail(tokenJson.access_token)
        return {
          status: 200,
          message: `Refresh for ${integrationType} success`,
          email: userData.mail,
          credentials: {
            accessToken: tokenJson.access_token,
            refreshToken: tokenJson.refresh_token,
            expiredAt: new Date().getTime() + (tokenJson.expires_in * 1000)
          }
        }
      } else {
        return {
          message: `Refresh token expired, please connect to ${integrationType} again`,
          status: 401
        }
      }
    }
    default:
      return {
        message: `Not supported for ${integrationType}`,
        status: 400
      }
  }
}