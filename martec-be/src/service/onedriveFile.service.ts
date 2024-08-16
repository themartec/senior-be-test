import { ServiceResponse, UserDAO } from '@/model/type'
import process from 'node:process'

export async function createFolder(currentUser: UserDAO, folderName: string, folderPath: string): Promise<ServiceResponse> {
  const url = `https://graph.microsoft.com/v1.0/me/drive/items/${folderPath}/children`

  const requestBody = {
    name: folderName,
    folder: {},
    '@microsoft.graph.conflictBehavior': 'rename'
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error creating folder:', errorText)
      return { status: response.status, body: { message: 'Error creating folder', error: errorText } }
    }

    const data = await response.json()
    return { status: 200, body: data }
  } catch (error) {
    console.error('Error creating folder:', error)
    return { status: 500, body: { message: 'Error creating folder' } }
  }
}

export async function uploadOneDriveFiles(currentUser: UserDAO, files: Express.Multer.File[], uploadToPath: string): Promise<ServiceResponse> {

  try {
    if (!files || files.length === 0) {
      return { status: 400, body: { message: 'No files found.' } }
    }
    const results = await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        await Promise.all(files.map(file => uploadToOneDrive(currentUser, file, uploadToPath)))
      })
    )
    return { status: 200, body: results }
  } catch (error) {
    console.error('Error uploading files:', error)
    return { status: 500, body: { error: 'Failed to upload files' } }
  }
}

export async function deleteOneDriveFileById(currentUser: UserDAO, fileId: string): Promise<ServiceResponse> {
  try {
    const deleteUrl = `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}`
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`
      }
    })

    console.log('File deleted successfully:', response)
    return { status: response.status, body: { message: response.statusText } }
  } catch (error) {
    console.error('Error uploading file to OneDrive:', error)
    return { status: 500, body: { message: 'Deleted error' } }
  }

}

export async function getOneDriveFileByFolderId(currentUser: UserDAO, folderId: string, nextToken: string | undefined): Promise<ServiceResponse> {
  try {
    const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${folderId}/children`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    const files = data.value.map((item: any) => ({
      mimeType: item.file ? item.file.mimeType : 'folder',  // Assuming mimeType as per your example
      id: item.id,
      name: item.name,
      expandable: !item.file
    }))
    console.log(files)
    return { status: 200, body: { files } }
  } catch (error) {
    console.error('Error fetching OneDrive files:', error)
    return { status: 500, body: { message: 'Error fetching OneDrive files:' } }
  }
}

export async function refreshToken(refreshToken: string) {
  try {
    const response = await fetch(`https://login.microsoftonline.com/consumers/oauth2/v2.0/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.ONEDRIVE_CLIENT_ID!,
        client_secret: process.env.ONEDRIVE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        redirect_uri: process.env.ONEDRIVE_REDIRECT_URL!
      }).toString()
    })
    if (!response.ok) {
      console.error('refreshToken not success', response)
      return {
        status: response.status,
        message: response.statusText
      }
    }
    return await response.json()
  } catch (err) {
    console.error('refreshToken not success', err)
    return {
      status: 500,
      message: 'Cannot perform refresh token'
    }
  }


}

async function uploadToOneDrive(currentUser: UserDAO, file: Express.Multer.File, folderPath: string): Promise<void> {
  try {
    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/items/${folderPath}:/${file.originalname}:/content`
    // /drive/root:/asdasd

    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`,
        'Content-Type': file.mimetype || 'application/octet-stream'
      },
      body: file.buffer
    })
    const data = await response.json()
    console.log('File uploaded successfully:', data)
  } catch (error) {
    console.error('Error uploading file to OneDrive:', error)
    throw error
  }
}