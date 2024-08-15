import {
  createFolder,
  uploadOneDriveFiles,
  deleteOneDriveFileById,
  getOneDriveFileByFolderId, refreshToken
} from '@/service/onedriveFile.service'
import { UserDAO } from '@/model/dao'
import fetchMock from 'jest-fetch-mock'

beforeEach(() => {
  fetchMock.resetMocks()
})

describe('OneDrive API Functions', () => {
  const mockUser: UserDAO = { accessToken: 'mockAccessToken', refreshToken: 'mockRefreshToken', expiredAt: 111 }

  test('createFolder should create a folder successfully', async () => {
    const folderName = 'New Folder'
    const folderPath = 'root'
    const mockResponse = { id: 'mockId', name: folderName }

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const result = await createFolder(mockUser, folderName, folderPath)

    expect(result).toEqual({ status: 200, body: mockResponse })
    expect(fetchMock).toHaveBeenCalledWith(
      `https://graph.microsoft.com/v1.0/me/drive/items/${folderPath}/children`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${mockUser.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: folderName,
          folder: {},
          '@microsoft.graph.conflictBehavior': 'rename'
        })
      })
    )
  })
  test('createFolder should handle exception', async () => {
    const folderName = 'New Folder'
    const folderPath = 'root'
    const mockResponse = { id: 'mockId', name: folderName }

    fetchMock.mockRejectOnce(new Error('err'))

    const result = await createFolder(mockUser, folderName, folderPath)

    expect(result).toEqual({ status: 500, body: { message: 'Error creating folder' } })
    expect(fetchMock).toHaveBeenCalledWith(
      `https://graph.microsoft.com/v1.0/me/drive/items/${folderPath}/children`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${mockUser.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: folderName,
          folder: {},
          '@microsoft.graph.conflictBehavior': 'rename'
        })
      })
    )
  })
  test('uploadOneDriveFiles should upload files successfully', async () => {
    const files = [{
      originalname: 'file.txt',
      buffer: Buffer.from('test'),
      mimetype: 'text/plain'
    }] as Express.Multer.File[]
    const uploadToPath = 'root'
    const mockResponse = { id: 'mockFileId', name: 'file.txt' }

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const result = await uploadOneDriveFiles(mockUser, files, uploadToPath)

    expect(result).toEqual({ status: 200, body: [undefined] })
    expect(fetchMock).toHaveBeenCalledWith(
      `https://graph.microsoft.com/v1.0/me/${uploadToPath}/file.txt:/content`,
      expect.objectContaining({
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${mockUser.accessToken}`,
          'Content-Type': 'text/plain'
        },
        body: files[0].buffer
      })
    )
  })
  test('deleteOneDriveFileById should handle error response with different status codes', async () => {
    const fileId = 'mockFileId'
    const errorMessages = [
      { status: 400, message: 'Bad Request' },
      { status: 401, message: 'Unauthorized' },
      { status: 403, message: 'Forbidden' },
      { status: 500, message: 'Internal Server Error' }
    ]

    for (const { status, message } of errorMessages) {
      fetchMock.mockResponseOnce(message, { status })

      const result = await deleteOneDriveFileById(mockUser, fileId)

      expect(result).toEqual({
        status,
        body: { message: message }
      })
      expect(fetchMock).toHaveBeenCalledWith(
        `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}`,
        expect.objectContaining({
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${mockUser.accessToken}`
          }
        })
      )
    }
  })
  test('deleteOneDriveFileById should handle network error', async () => {
    const fileId = 'mockFileId'

    // Mock a network error
    fetchMock.mockRejectOnce(new Error('Network Error'))

    const result = await deleteOneDriveFileById(mockUser, fileId)

    expect(result).toEqual({
      status: 500,
      body: { message: 'Deleted error' }
    })
    expect(fetchMock).toHaveBeenCalledWith(
      `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}`,
      expect.objectContaining({
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${mockUser.accessToken}`
        }
      })
    )
  })
  test('getOneDriveFileByFolderId should get files by folder ID successfully', async () => {
    const folderId = 'mockFolderId'
    const mockResponse = {
      value: [
        { id: 'fileId1', name: 'file1.txt', file: { mimeType: 'text/plain' } },
        { id: 'folderId1', name: 'folder1', folder: {} }
      ]
    }

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const result = await getOneDriveFileByFolderId(mockUser, folderId, undefined)

    expect(result).toEqual({
      status: 200,
      body: {
        files: [
          { mimeType: 'text/plain', id: 'fileId1', name: 'file1.txt', expandable: false },
          { mimeType: 'folder', id: 'folderId1', name: 'folder1', expandable: true }
        ]
      }
    })
    expect(fetchMock).toHaveBeenCalledWith(
      `https://graph.microsoft.com/v1.0/me/drive/items/${folderId}/children`,
      expect.objectContaining({
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${mockUser.accessToken}`,
          'Content-Type': 'application/json'
        }
      })
    )
  })
  test('getOneDriveFileByFolderId should handle network error', async () => {
    const folderId = 'mockFolderId'
    const mockResponse = {
      value: [
        { id: 'fileId1', name: 'file1.txt', file: { mimeType: 'text/plain' } },
        { id: 'folderId1', name: 'folder1', folder: {} }
      ]
    }

    fetchMock.mockRejectOnce(new Error('Error'))

    const result = await getOneDriveFileByFolderId(mockUser, folderId, undefined)

    expect(result).toEqual({ status: 500, body: { message: 'Error fetching OneDrive files:' } })
    expect(fetchMock).toHaveBeenCalledWith(
      `https://graph.microsoft.com/v1.0/me/drive/items/${folderId}/children`,
      expect.objectContaining({
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${mockUser.accessToken}`,
          'Content-Type': 'application/json'
        }
      })
    )
  })
  test('refreshToken should refresh the access token successfully', async () => {
    const refreshTokenString = 'mockRefreshToken'
    const mockResponse = {
      access_token: 'newMockAccessToken',
      token_type: 'Bearer',
      expires_in: 3600
    }

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const result = await refreshToken(refreshTokenString)

    expect(result).toEqual(mockResponse)
    expect(fetchMock).toHaveBeenCalledWith(
      `https://login.microsoftonline.com/consumers/oauth2/v2.0/token`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: process.env.ONEDRIVE_CLIENT_ID!,
          client_secret: process.env.ONEDRIVE_CLIENT_SECRET!,
          refresh_token: refreshTokenString,
          redirect_uri: process.env.ONEDRIVE_REDIRECT_URL!
        }).toString()
      })
    )
  })
})
