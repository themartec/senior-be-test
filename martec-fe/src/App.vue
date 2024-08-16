<template>
  <RouterLink
    :to="{ path: '/' }">
    <h2>Home</h2>
  </RouterLink>
  <nav v-if="isAuthenticated">
    <h3 v-if="googleDriveEnabled && oneDriveEnabled">You connected to both GG drive and OneDrive</h3>
    <p>Hello {{ currentUser }}</p>
    <button v-if="isAuthenticated" @click="logout">Logout</button>
    <div v-if="isAuthenticated" class="header-content">
      <button v-if="!googleDriveEnabled" @click="signInWithGoogle">Connect with Google</button>
      <button v-if="!oneDriveEnabled" @click="signInWithOneDrive">Connect with OneDrive</button>
    </div>

    <RouterLink
      v-if="googleDriveEnabled"
      :to="{ name: 'folder', params: { type: 'google', pathMatch: 'root' } }"
      active-class="my-active-class"
      exact-active-class="my-exact-active-class"
    >
      Go to Google
    </RouterLink>
    <RouterLink
      v-if="oneDriveEnabled"
      :to="{ name: 'folder', params: { type: 'onedrive', pathMatch: 'root' } }"
      active-class="my-active-class"
      exact-active-class="my-exact-active-class"
    >
      Go to OneDrive
    </RouterLink>
  </nav>
  <div v-else class="header-content">
    <button @click="signInWithGoogle">Login with Google</button>
    <button @click="signInWithOneDrive">Login with OneDrive</button>
  </div>
  <RouterView :key="useRoute().fullPath"></RouterView>
</template>
<script lang="ts" setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getMetadataCurrentUser, logoutApi } from '@/api.service'
import router from '@/router'

const isAuthenticated = ref(false)
const oneDriveEnabled = ref(false)
const googleDriveEnabled = ref(false)
const currentUser = ref()

const getMeta = async () => {
  const data = await getMetadataCurrentUser()
  currentUser.value = data
  isAuthenticated.value = data.integrations.length > 0
  oneDriveEnabled.value = data.integrations.includes('ONEDRIVE')
  googleDriveEnabled.value = data.integrations.includes('GOOGLE')
}
const signInWithGoogle = () => {
  console.log('Sign In with Google')
  const url = 'http://localhost:3000/api/auth/google'
  window.open(url, '_blank')
}

const signInWithOneDrive = () => {
  // Implement your Facebook sign-in logic here
  console.log('Sign In with OneDrive')
  const url = 'http://localhost:3000/api/auth/onedrive'
  window.open(url, '_blank')
}

const logout = () => {
  logoutApi()
  router.go(0)
}

onMounted(() => {
  getMeta()
})
</script>
<style scoped>
.my-active-class {
  font-weight: bold;
}

.my-exact-active-class {
  text-decoration: underline;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.header-content button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
}

.header-content button:hover {
  background-color: #0056b3;
}

.header-content button:last-child {
  background-color: #dc3545;
}

.header-content button:last-child:hover {
  background-color: #c82333;
}
</style>