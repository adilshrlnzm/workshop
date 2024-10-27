
<template>
    <div class="min-h-screen bg-sage-50 flex items-center justify-center p-6">
      <div class="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div class="p-8">
          <h2 class="text-2xl font-bold text-sage-800 mb-6">Upload Your Nature Spot !!</h2>
          
          <form @submit.prevent="handleSubmit">
            <div class="mb-6">
              <label for="picture" class="block text-sm font-medium text-sage-700 mb-2">
                Choose a picture
              </label>
              <div class="flex items-center justify-center w-full">
                <label
                  for="picture"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-sage-300 border-dashed rounded-lg cursor-pointer bg-sage-50 hover:bg-sage-100 transition-colors duration-300"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6" v-if="!imagePreview">
                    <UploadCloudIcon class="w-10 h-10 mb-3 text-sage-400" />
                    <p class="mb-2 text-sm text-sage-500">
                      <span class="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p class="text-xs text-sage-500">PNG, JPG or GIF (MAX. 5MB)</p>
                  </div>
                  <img
                    v-else
                    :src="imagePreview"
                    alt="Image preview"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <input
                    id="picture"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleFileChange"
                    required
                  />
                </label>
              </div>
              <p v-if="error" class="mt-2 text-sm text-red-600" role="alert">{{ error }}</p>
            </div>
            
            <div class="mb-6">
              <label for="placeName" class="block text-sm font-medium text-sage-700 mb-2">
                Place Name
              </label>
              <div class="relative">
                <MapPinIcon class="w-5 h-5 text-sage-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="placeName"
                  v-model="placeName"
                  type="text"
                  class="w-full pl-10 pr-3 py-2 border border-sage-300 rounded-md shadow-sm focus:outline-none focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Enter the name of the place"
                  required
                />
              </div>
            </div>
            
            <div class="mb-6">
              <label for="description" class="block text-sm font-medium text-sage-700 mb-2">
                Picture Description
              </label>
              <textarea
                id="description"
                v-model="description"
                rows="3"
                class="w-full px-3 py-2 border border-sage-300 rounded-md shadow-sm focus:outline-none focus:ring-sage-500 focus:border-sage-500 resize-none"
                placeholder="Enter a description for your picture"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              :disabled="!file || !placeName || !description"
              class="w-full bg-sage-600 text-white py-2 px-4 rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Upload Picture
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { UploadCloudIcon, MapPinIcon } from 'lucide-vue-next'
  import PocketBase from 'pocketbase'
  const db = new PocketBase('http://127.0.0.1:8090');

  const file = ref(null)
  const imagePreview = ref(null)
  const placeName = ref('')
  const description = ref('')
  const error = ref('')
  
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0]
    
    if (selectedFile) {
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(selectedFile.type)) {
        error.value = 'Please select a valid image file (PNG, JPG, or GIF)'
        file.value = null
        imagePreview.value = null
        return
      }
      
      if (selectedFile.size > 5 * 1024 * 1024) {
        error.value = 'File size should not exceed 5MB'
        file.value = null
        imagePreview.value = null
        return
      }
      
      file.value = selectedFile
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.value = e.target.result
      }
      reader.readAsDataURL(selectedFile)
      error.value = ''
    }
  }
  
  const handleSubmit = async () => {
    if (!file.value) {
      error.value = 'Please select an image to upload'
      return
    }
  
    if (!placeName.value.trim()) {
      error.value = 'Please enter the name of the place'
      return
    }
  
    if (!description.value.trim()) {
      error.value = 'Please enter a description for the picture'
      return
    }
    
    // Here you would typically send the file, place name, and description to your server
    // For demonstration purposes, we'll just log the values
    console.log('File:', file.value)
    console.log('Place Name:', placeName.value)
    console.log('Description:', description.value)
    
    let formData = new FormData();
    formData.append('picture',file.value)
    formData.append('name_of_place',placeName.value)
    formData.append('description',description.value)

    const createdRecord = await db.collection('pictures').create(formData);


    // Reset form after submission
    file.value = null
    imagePreview.value = null
    placeName.value = ''
    description.value = ''
    error.value = ''
    
    alert('Picture uploaded successfully!')
  }
  </script>
  
  <style>
  /* Sage Green Theme Colors */
  :root {
    --color-sage-50: #f6f7f6;
    --color-sage-100: #e3e8e3;
    --color-sage-300: #a7b9a7;
    --color-sage-400: #89a189;
    --color-sage-500: #6b896b;
    --color-sage-600: #556e55;
    --color-sage-700: #3f523f;
    --color-sage-800: #293729;
  }
  
  /* Apply Sage Green Theme to Tailwind Classes */
  .bg-sage-50 { background-color: var(--color-sage-50); }
  .bg-sage-100 { background-color: var(--color-sage-100); }
  .bg-sage-600 { background-color: var(--color-sage-600); }
  .bg-sage-700 { background-color: var(--color-sage-700); }
  .text-sage-400 { color: var(--color-sage-400); }
  .text-sage-500 { color: var(--color-sage-500); }
  .text-sage-700 { color: var(--color-sage-700); }
  .text-sage-800 { color: var(--color-sage-800); }
  .border-sage-300 { border-color: var(--color-sage-300); }
  .focus\:ring-sage-500:focus { --tw-ring-color: var(--color-sage-500); }
  .focus\:border-sage-500:focus { border-color: var(--color-sage-500); }
  .hover\:bg-sage-100:hover { background-color: var(--color-sage-100); }
  .hover\:bg-sage-700:hover { background-color: var(--color-sage-700); }
  </style>
