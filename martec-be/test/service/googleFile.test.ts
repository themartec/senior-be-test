import fetchMock from 'jest-fetch-mock'
import {
  createGoogleFolder,
  deleteGoogleFileById,
  getGoogleFileByFolderId,
  uploadGoogleFiles,
  uploadFilesToDrive
} from '@/service/googleFile.service'
import { UserDAO } from '@/model/dao'
import { drive } from '@/utils/googledrive.utlis'


// Mock Google API
jest.mock('googleapis', () => {
  const driveCreateMock = jest.fn(() => jest.fn())
  const driveMock = { create: jest.fn(() => driveCreateMock) }
  const filesMock = { files: jest.fn(() => driveMock) }
  const peopleMock = jest.fn()
  const OAuth2Mock = jest.fn().mockImplementation(() => ({
    setCredentials: jest.fn() // Add other methods if needed
  }))

  return {
    google: {
      drive: () => ({
        files: {
          create: jest.fn(),
          list: jest.fn(),
          delete: jest.fn()
        }
      }),
      people: jest.fn(() => peopleMock),
      auth: {
        OAuth2: OAuth2Mock
      }
    }
  }
})


const mockUser: UserDAO = {
  accessToken: 'mockAccessToken',
  refreshToken: 'mockRefreshToken',
  expiredAt: 123
}

beforeEach(() => {
  fetchMock.resetMocks()
})

describe('API Functions', () => {
  test('createGoogleFolder should create a folder successfully', async () => {
    const folderName = 'testFolder'
    const folderPath = ['parentFolderId']
    const mockResponse = { data: { id: 'newFolderId' } }

    // Mock the Google Drive API
    const result = await createGoogleFolder(mockUser, folderName, folderPath)

    expect(result).toEqual({ status: 200, body: 'results' })
    expect(drive.files.create).toHaveBeenCalledWith({
      requestBody: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: folderPath
      },
      fields: 'id'
    })
  })

  test('getGoogleFileByFolderId should fetch files successfully', async () => {
    const folderId = 'folderId'
    const nextToken = undefined
    const mockResponse = {
      data: {
        files: [{ id: 'fileId', name: 'fileName', mimeType: 'application/pdf' }],
        nextPageToken: 'nextPageToken'
      }
    }
    drive.files.list = jest.fn().mockReturnValue(mockResponse)

    const result = await getGoogleFileByFolderId(mockUser, folderId, nextToken)

    expect(result).toEqual({ status: 200, body: mockResponse })
    expect(drive.files.list).toHaveBeenCalledWith({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType)',
      pageToken: nextToken
    })
  })
  test('deleteGoogleFileById should delete a file successfully', async () => {
    const fileId = 'fileId'


    const result = await deleteGoogleFileById(mockUser, fileId)

    expect(result).toEqual({
      status: 200,
      body: { message: `File with ID ${fileId} deleted successfully.` }
    })
    expect(drive.files.delete).toHaveBeenCalledWith({
      fileId: fileId
    })
  })


  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('uploadGoogleFiles should upload files successfully', async () => {
    // Mock data
    const currentUser = { accessToken: 'mockAccessToken' } as UserDAO
    const files = [
      { originalname: 'file1.txt', buffer: Buffer.from('file content'), mimetype: 'text/plain' } as Express.Multer.File,
      { originalname: 'file2.txt', buffer: Buffer.from('file content'), mimetype: 'text/plain' } as Express.Multer.File
    ]
    const uploadToPath = ['parentFolderId']

    // Mock responses
    const mockFileResponse = { data: { id: 'mockFileId' } }
    drive.files.create = jest.fn().mockReturnValue(mockFileResponse).mockReturnValue(mockFileResponse)

    const result = await uploadGoogleFiles(currentUser, files, uploadToPath)

    expect(result).toEqual({ status: 200, body: [mockFileResponse.data, mockFileResponse.data] })
    expect(drive.files.create).toHaveBeenCalledTimes(2)
  })

  test('uploadGoogleFiles should handle no files case', async () => {
    const currentUser = { accessToken: 'mockAccessToken' } as UserDAO
    const files: Express.Multer.File[] = []
    const uploadToPath = ['parentFolderId']

    const result = await uploadGoogleFiles(currentUser, files, uploadToPath)

    expect(result).toEqual({ status: 400, body: { message: 'No files found.' } })
  })

  test('uploadGoogleFiles should handle upload error', async () => {
    const currentUser = { accessToken: 'mockAccessToken' } as UserDAO
    const files = [
      { originalname: 'file1.txt', buffer: Buffer.from('file content'), mimetype: 'text/plain' } as Express.Multer.File
    ]
    const uploadToPath = ['parentFolderId']

    // Mock error
    drive.files.create = jest.fn().mockRejectedValueOnce(new Error('Upload failed'))

    const result = await uploadGoogleFiles(currentUser, files, uploadToPath)

    expect(result).toEqual({ status: 500, body: { error: 'Failed to upload files' } })
  })

  test('uploadFilesToDrive should upload file successfully', async () => {
    const filename = 'file.txt'
    const buffer = Buffer.from('file content')
    const mimetype = 'text/plain'
    const parentFolder = ['parentFolderId']

    const mockResponse = { data: { id: 'mockFileId' } }
    drive.files.create = jest.fn().mockResolvedValueOnce(mockResponse)

    const result = await uploadFilesToDrive(filename, buffer, mimetype, parentFolder)

    expect(result).toEqual(mockResponse.data)
    expect(drive.files.create).toHaveBeenCalledWith(expect.objectContaining({
      media: expect.objectContaining({
        mimeType: 'text/plain'
      }),
      requestBody: expect.objectContaining({
        name: 'file.txt',
        mimeType: 'text/plain',
        parents: ['parentFolderId']
      })
    }))
  })

  test('uploadFilesToDrive should handle upload error', async () => {
    const filename = 'file.txt'
    const buffer = Buffer.from('file content')
    const mimetype = 'text/plain'
    const parentFolder = ['parentFolderId']

    drive.files.create = jest.fn().mockRejectedValueOnce(new Error('Upload failed'))

    await expect(uploadFilesToDrive(filename, buffer, mimetype, parentFolder)).rejects.toThrow('Upload failed')
  })
})

