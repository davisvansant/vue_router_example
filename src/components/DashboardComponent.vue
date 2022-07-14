<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import useDataStore from "../stores/data";

const dataWorker:Worker = inject('worker', Worker.prototype);

const store = useDataStore();

const authenticated = ref(store.data.authenticated);
const username = ref(store.data.username);
const password = ref(store.data.password);

const token = ref('');

const workerUsername = ref('');
const workerPassword = ref('');

dataWorker.addEventListener('message', message => { 
  console.log("dashboard has received message", message.data);

  console.log("username from worker ->", message.data.username);
  console.log("password from worker ->", message.data.password);

  switch (message.data.kind) {
    case 'LOGININFO': {
      workerUsername.value = message.data.contents.username;
      workerPassword.value = message.data.contents.password;

      break;
    }
    case 'TOKEN': {
      token.value = message.data.contents;

      break;
    }
  }
});

function getToken () {
  dataWorker.postMessage('token');
}

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
    <p>your super secret token from worker -> {{ token }}</p>
    <button @click="getToken()">get token!</button>
  </div>
</template>
