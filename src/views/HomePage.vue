<script setup>
import { ref, onMounted } from "vue";
import PocketBase from "pocketbase";
import { ImageIcon, UserIcon } from 'lucide-vue-next';

// Initialize PocketBase
const db = new PocketBase('http://127.0.0.1:8090');

// Reactive reference for pictures
const pictures = ref([]);

// Fetch pictures from PocketBase on component mount
onMounted(async () => {
    try {
        const result = await db.collection("pictures").getFullList({
            sort: '-created', // Sort by creation date if needed
        });
        console.log(result)
        pictures.value = result;
    } catch (error) {
        console.error('Error fetching pictures:', error);
    }
});
</script>

<template>
<main class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold text-sage-800 mb-8">Recent Uploads</h2>
    
    <div v-if="pictures.length === 0" class="text-center py-12">
        <ImageIcon class="h-16 w-16 text-sage-400 mx-auto mb-4" />
        <p class="text-sage-600 text-lg font-medium">No pictures uploaded yet</p>
        <p class="text-sage-500 mt-2">Be the first to upload a picture!</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="picture in pictures" :key="picture.id" class="bg-white rounded-lg shadow-md overflow-hidden">
            <img :src="`http://localhost:8090/api/files/${picture.collectionId}/${picture.id}/${picture.picture[0]}`" :alt="picture.description" class="w-full h-48 object-cover" />
            <div class="p-4">
                <span class="text-sage-800 font-medium mb-2">{{ "Location: " + picture.name_of_place }}</span>
                <p class="text-sm">{{ " Description: "+ picture.description }}</p>
                <div class="flex items-center text-sage-600">
                   
                   

                </div>
            </div>
        </div>
    </div>
</main>
</template>
