import express from 'express'
import { googleAuthClient } from '@/utils/googledrive.utlis'
import 'dotenv/config'
import { getAccessToken, getUserEmail } from '@/utils/onedrive.utils'
import process from 'node:process'
import { saveTokenMetadataService } from '@/service/user.service'

const router = express.Router()

router.get('/google', (req, res) => {
  const authUrl = googleAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/userinfo.email']
  })
  res.redirect(authUrl)
})

router.get('/google/callback', async (req, res) => {
  const { code } = req.query
  if (!code) {
    return res.status(400).send('Missing code')
  }
  const { tokens } = await googleAuthClient.getToken(code as string)
  const { email } = await googleAuthClient.getTokenInfo(tokens.access_token as string)

  try {
    // Save tokens to the database
    await saveTokenMetadataService(email as string, 'GOOGLE',
      {
        accessToken: tokens.access_token!,
        refreshToken: tokens.refresh_token!,
        expiredAt: tokens.expiry_date!
      }
    )
    res.cookie('auth', email, { signed: true, httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    res.redirect(process.env.FRONT_END_URL! + '/google/folder/root')
  } catch (error) {
    console.error('Error saving tokens:', error)
    res.status(500).send('Internal Server Error')
  }
})

router.get('/onedrive', (req, res) => {
  const scope = 'files.readwrite offline_access User.Read'

  const authUrl = `https://login.live.com/oauth20_authorize.srf?client_id=${process.env.ONEDRIVE_CLIENT_ID}&scope=${scope}&response_type=code&redirect_uri=${process.env.ONEDRIVE_REDIRECT_URL}`
  res.redirect(authUrl)
})

router.get('/onedrive/callback', async (req, res) => {
  const { code } = req.query
  if (!code) {
    return res.status(400).send('Missing code')
  }
  try {
    const tokenResponse = await getAccessToken(code as string)
    const userData = await getUserEmail(tokenResponse.access_token)
    console.log('Access Token:', tokenResponse)
    console.log('User Data:', userData)
    await saveTokenMetadataService(userData.mail, 'ONEDRIVE', {
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token,
      expiredAt: new Date().getTime() + (tokenResponse.expires_in * 1000)
    })
    res.cookie('auth', userData.mail, {
      signed: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    })
    res.redirect(process.env.FRONT_END_URL! + '/onedrive/folder/root')

  } catch (error) {
    console.error('Error:', error)
  }
})

export { router as AuthRouter }