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


</script>

<template>
  
<input v-model="titleVal" />
<button @click="submit">Add</button>

<ul>
  <li v-for="item in data">
    {{item.title}}
  </li>
</ul>
</template>
const record = await pb.collection('posts').create(data);