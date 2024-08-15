import express from 'express'
import multer from 'multer'
import {
  createGoogleFolder,
  deleteGoogleFileById,
  getGoogleFileByFolderId,
  uploadGoogleFiles
} from '@/service/googleFile.service'
import {
  createFolder,
  deleteOneDriveFileById,
  getOneDriveFileByFolderId,
  uploadOneDriveFiles
} from '@/service/onedriveFile.service'

const router = express.Router()
const upload = multer()

router.get('/google/files', async (req, res) => {
  const folderId = (req.query.folderId as string) || 'root'
  const nextToken = (req.query.nextToken) as string | undefined
  const response = await getGoogleFileByFolderId(req.currentUser, folderId, nextToken)

  res.status(response.status).json(response.body.data)
})

router.delete('/google/files/:fileId', async (req, res) => {
  const { fileId } = req.params
  const result = await deleteGoogleFileById(req.currentUser, fileId)
  res.status(result.status).json(result.body)
})

router.post('/google/files', upload.array('files'), async (req, res) => {
  const files = req.files as Express.Multer.File[]
  const path = JSON.parse(req.body.path as string) as string[]
  const results = await uploadGoogleFiles(req.currentUser, files, path)
  res.status(results.status).json(results)
})
router.post('/google/folder', async (req, res) => {
  const folderName: string = req.body.folderName
  const parentId = req.body.parentId
  const results = await createGoogleFolder(req.currentUser, folderName, [parentId])
  res.status(results.status).json(results)
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/onedrive/files', async (req, res) => {
  const folderId = (req.query.folderId as string) || 'root'
  const nextToken = (req.query.nextToken) as string | undefined
  const response = await getOneDriveFileByFolderId(req.currentUser, folderId, nextToken)
  console.log(response)
  res.status(response.status).json(response.body)
})

router.delete('/onedrive/files/:fileId', async (req, res) => {
  const { fileId } = req.params
  const result = await deleteOneDriveFileById(req.currentUser, fileId)
  res.status(result.status).json(result.body)
})

router.post('/onedrive/files', upload.array('files'), async (req, res) => {
  const files = req.files as Express.Multer.File[]
  const path = JSON.parse(req.body.path as string) as string[]
  const results = await uploadOneDriveFiles(req.currentUser, files, path[0])
  res.status(results.status).json(results)
})

router.post('/onedrive/folder', async (req, res) => {
  const folderName: string = req.body.folderName
  const parentId: string = req.body.parentId
  const results = await createFolder(req.currentUser, folderName, parentId)
  res.status(results.status).json(results)
})

export { router as FileRouter }