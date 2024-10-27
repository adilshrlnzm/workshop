<script setup>
import{ref, onMounted} from "vue";
import PocketBase from "pocketbase";


const db = new PocketBase('http://127.0.0.1:8090');

const titleVal = ref(" ");
const data = ref([]);

async function submit() {


const record = {
  title: titleVal.value,
  description: "description",
};

await db.collection("posts").create(record);

data.value.push(record);
}
 
onMounted(async () => {
const result = await db.collection("posts").getFullList();

data.value = result;








})

import { ImageIcon, UserIcon } from 'lucide-vue-next'

// Mock data for pictures
const pictures = ref([
  {
    id: 1,
    url: '/placeholder.svg?height=300&width=400',
    description: 'A beautiful sunset over the mountains',
    username: 'nature_lover'
  },
  {
    id: 2,
    url: '/placeholder.svg?height=300&width=400',
    description: 'My cute puppy playing in the park',
    username: 'dog_person'
  },
  {
    id: 3,
    url: '/placeholder.svg?height=300&width=400',
    description: 'Delicious homemade pasta dish',
    username: 'foodie123'
  },
  // Add more mock data as needed
])

// In a real application, you would fetch this data from an API
// const fetchPictures = async () => {
//   try {
//     const response = await fetch('/api/pictures')
//     pictures.value = await response.json()
//   } catch (error) {
//     console.error('Error fetching pictures:', error)
//   }
// }

// onMounted(fetchPictures)


</script>

<template>

<div class="min-h-screen bg-sage-50">
    <header class="bg-sage-600 text-white py-4">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">Rabbits for sale !!</h1>
          <nav>
            <ul class="flex space-x-4">
              <li><router-link to='/' class="hover:text-sage-200">Home</router-link></li>
              <li><router-link to='/upload' class="hover:text-sage-200">Upload</router-link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>

    <footer class="bg-sage-700 text-white py-4 mt-8">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; All rights reserved by ME !! muhehe</p>
      </div>
    </footer>
  </div>

</template>
<style>
/* Sage Green Theme Colors */
:root {
  --color-sage-50: #f6f7f6;
  --color-sage-200: #c5d1c5;
  --color-sage-400: #89a189;
  --color-sage-500: #6b896b;
  --color-sage-600: #556e55;
  --color-sage-700: #3f523f;
  --color-sage-800: #293729;
}

/* Apply Sage Green Theme to Tailwind Classes */
.bg-sage-50 { background-color: var(--color-sage-50); }
.bg-sage-600 { background-color: var(--color-sage-600); }
.bg-sage-700 { background-color: var(--color-sage-700); }
.text-sage-200 { color: var(--color-sage-200); }
.text-sage-400 { color: var(--color-sage-400); }
.text-sage-500 { color: var(--color-sage-500); }
.text-sage-600 { color: var(--color-sage-600); }
.text-sage-800 { color: var(--color-sage-800); }
.hover\:text-sage-200:hover { color: var(--color-sage-200); }
</style>