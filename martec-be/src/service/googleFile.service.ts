import { drive, googleAuthClient } from '@/utils/googledrive.utlis'
import { UserDAO } from '@/model/dao'
import { Readable } from 'stream'
import { ServiceResponse } from '@/model/response.dto'

export async function createGoogleFolder(currentUser: UserDAO, folderName: string, folderPath: string[]): Promise<ServiceResponse> {
  googleAuthClient.setCredentials({
    access_token: currentUser.accessToken
  })
  const response = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: folderPath,
    },
    fields: 'id',
  })
  console.log('Folder Created:', response)
  return { status: 200, body: 'results' }
}

export async function getGoogleFileByFolderId(currentUser: UserDAO, folderId: string, nextToken: string | undefined): Promise<ServiceResponse> {
  try {
    googleAuthClient.setCredentials({
      access_token: currentUser.accessToken
    })
    const query = `'${folderId}' in parents and trashed = false`
    console.log('folder query', query)

    const response = await drive.files.list({
      q: query,
      fields: 'nextPageToken, files(id, name, mimeType)',
      pageToken: nextToken
    })

    return { status: 200, body: response }
  } catch (err) {
    console.error('Error when get files:', err)
    return { status: 500, body: { error: 'Failed to get file' } }
  }
}

export async function deleteGoogleFileById(currentUser: UserDAO, fileId: string): Promise<ServiceResponse> {
  try {
    googleAuthClient.setCredentials({
      access_token: currentUser?.accessToken
    })
    await drive.files.delete({
      fileId: fileId
    })
    return { status: 200, body: { message: `File with ID ${fileId} deleted successfully.` } }
  } catch (err) {
    console.error('Error delete files:', err)
    return { status: 500, body: { error: 'Failed to delete file' } }
  }
}

export async function uploadGoogleFiles(currentUser: UserDAO, files: Express.Multer.File[], uploadToPath: string[]): Promise<ServiceResponse> {
  try {
    if (!files || files.length === 0) {
      return { status: 400, body: { message: 'No files found.' } }
    }

    googleAuthClient.setCredentials({
      access_token: currentUser.accessToken
    })
    const results = await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        const { originalname, buffer, mimetype } = file
        return await uploadFilesToDrive(originalname, buffer, mimetype, uploadToPath)
      })
    )
    return { status: 200, body: results }
  } catch (error) {
    console.error('Error uploading files:', error)
    return { status: 500, body: { error: 'Failed to upload files' } }
  }
}

export const uploadFilesToDrive = async (filename: string, buffer: Buffer, mimetype: string, parentFolder: string[]) => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: filename,
        mimeType: mimetype,
        parents: parentFolder
      },
      media: {
        mimeType: mimetype,
        body: Readable.from(buffer)
      }
    })

    return response.data
  } catch (error) {
    console.error('Error uploading file to Drive:', error)
    throw error
  }
}
