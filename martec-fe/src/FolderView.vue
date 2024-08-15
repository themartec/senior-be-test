<!-- src/views/FilesView.vue -->
<template>
  <div>
    <div class="flex-icons">
      <i class="pi pi-file-plus" style="font-size: 2rem; color: #82AC26" @click="openFilePicker()"></i>
      <i class="pi pi-folder-plus" style="font-size: 2rem" @click="addFolder()"></i>
      <input
        ref="fileInput"
        multiple
        style="display: none"
        type="file"
        @change="handleFileSelect"
      />
    </div>
    <h3 v-if="files.length === 0">Empty Folder!</h3>
    <div class="file-list">

      <div class="file-header">
        <div class="file-header-item">Name</div>
        <div class="file-header-item">Extension</div>
        <div class="file-header-item">Action</div>
      </div>
      <router-link v-if=" isRoot()" :to="{ path: backOneLevel() }"
      >Up one level...
      </router-link>
      <div v-for="file in files" :key="file.id" class="file-item">
        <div class="file-item-name">
          <span v-if="file.mimeType === 'application/vnd.google-apps.folder' || file.expandable">
            <router-link :to="{ path: getPath(file.id) }"
            >{{ file.name }}</router-link>
          </span>
          <span v-else>{{ file.name }}</span>
        </div>
        <div class="file-item-extension">{{ file.mimeType }}</div>
        <div class="file-item-action">
          <i class="pi pi-trash hover:active:ring-primary-100:5"
             style="color: #FF662A"
             @click="onclickDelete(file.id)"
          ></i>
        </div>
      </div>
      <button v-if="nextToken!== ''" @click="fetchMore()">More</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { createFolder, deleteFile, getFilesById, uploadFilesToServer } from '@/api.service'


const route = useRoute()
const files = ref<any[]>([])
const nextToken = ref('')
const fileInput = ref<HTMLInputElement | null>(null)


const type = route.params.type as 'google' | 'onedrive'

const isFolder = (mimeType: string) => {
  return mimeType === 'application/vnd.google-apps.folder'
}

async function fetchFiles(folderId: string) {
  const response = await getFilesById(type, folderId)
  files.value = response.files
  nextToken.value = response.nextPageToken
}

async function fetchMore() {
  const path = route.params.pathMatch as string[]
  const currentFolderID = path[path.length - 1]
  const response = await getFilesById(type, currentFolderID, nextToken.value)
  files.value = response.files
  nextToken.value = response.nextPageToken
}

async function addFolder() {
  const path = route.params.pathMatch as string[]
  const currentFolderID = path[path.length - 1]
  await createFolder(type, 'New Folder' + Date.now(), currentFolderID)
  await fetchFiles(currentFolderID!)
}

async function openFilePicker() {
  fileInput.value?.click()
}

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const path = route.params.pathMatch as string[]
  const currentFolderID = path[path.length - 1]
  console.log(currentFolderID)
  if (input.files) {
    const formData = new FormData()
    Array.from(input.files).forEach(file => formData.append('files', file))
    formData.append('path', JSON.stringify([currentFolderID]))
    await uploadFilesToServer(type, formData)
    await fetchFiles(currentFolderID!)
    if (fileInput.value) {
      (fileInput.value as HTMLInputElement).value = ''
    }
  }
}


async function onclickDelete(fileId: string) {
  const response = await deleteFile(type, fileId)
  console.log(response)
  const path = route.params.pathMatch as string[]
  const currentFolderID = path[path.length - 1]
  await fetchFiles(currentFolderID!)
}

function getPath(folderId: string): string {
  return route.fullPath ? `${route.fullPath}/${folderId}` : '/folder/root'
}

function isRoot() {
  const pathArray = route.fullPath.split('/').filter(segment => segment !== '')
  return pathArray.length > 3
}

function backOneLevel() {
  const pathArray = route.fullPath.split('/')
  pathArray.pop()
  return pathArray.join('/')
}

onMounted(() => {
  const currentFolderID = route.fullPath ? route.fullPath.split('/').pop() : 'root'
  fetchFiles(currentFolderID!)
})
</script>

<style scoped>
.flex-icons {
  display: flex;
  justify-content: flex-end; /* Align items to the end */
  gap: 16px; /* Space between icons */
  padding: 8px; /* Padding around icons */
}

.icon {
  font-size: 2rem; /* Font size for icons */
  cursor: pointer; /* Pointer cursor on hover */
  transition: color 0.3s; /* Smooth color transition */
}


.file-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.file-header, .file-item {
  display: flex;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.file-header-item, .file-item-name, .file-item-extension, .file-item-action {
  flex: 1;
  padding: 4px;
}

.file-header {
  font-weight: bold;
}


.file-item-action button {
  padding: 4px 8px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.file-item-action button:hover {
  background-color: #0056b3;
}
</style>
