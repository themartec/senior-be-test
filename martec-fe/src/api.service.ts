export async function getFilesById(type: 'google' | 'onedrive', folderId: string, nextToken: string = '') {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/file/${type}/files?folderId=${folderId}&nextToken=${nextToken}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  return await response.json()
}

export async function deleteFile(type: 'google' | 'onedrive', key: string) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/file/${type}/files/${key}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  return response.statusText
}

export async function uploadFilesToServer(type: 'google' | 'onedrive', formData: FormData) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/file/${type}/files`, {
    method: 'POST',
    credentials: 'include',
    body: formData
  })
  if (!response.ok) {
    throw new Error('Network response.dto.ts was not ok.')
  }
  return await response.json()
}

export async function createFolder(type: 'google' | 'onedrive', folderName: string, parentId: string) {

  const response = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/file/${type}/folder`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      folderName: folderName,
      parentId: parentId
    })
  })
  return await response.json()
}

export async function getMetadataCurrentUser() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/metadata`, {
    method: 'GET',
    credentials: 'include'
  })
  return await response.json()
}

export async function logoutApi() {
  await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/logout`, {
    method: 'GET',
    credentials: 'include'
  })
}

