<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import useDataStore from "../stores/data";

const dataWorker:Worker = inject('worker', Worker.prototype);

const store = useDataStore();

const authenticated = ref(store.data.authenticated);
const username = ref(store.data.username);
const password = ref(store.data.password);

const workerUsername = ref('');
const workerPassword = ref('');

dataWorker.addEventListener('message', message => { 
  console.log("worker has received message", message.data);

  console.log("username from worker ->", message.data.username);
  console.log("password from worker ->", message.data.password);

  workerUsername.value = message.data.username;
  workerPassword.value = message.data.password;
});

onMounted(() =>{
    document.body.style.backgroundColor = "lightslategray";

    dataWorker.postMessage('dashboard');
})
</script>

<template>
  <div class="dashboard">
    <h1>Successfully authenticated! {{ authenticated }}</h1>
    <br />
    <p>welcome from local storage -> {{ username }}</p>
    <p>welcome from worker -> {{ workerUsername }}</p>
    <br />
    <p>your super secret password from local storage -> {{ password }}</p>
    <p>your super secret password from worker -> {{ workerPassword }}</p>
  </div>
</template>
