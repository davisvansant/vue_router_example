<script setup lang="ts">
import { onMounted, ref } from "vue";
import useDataStore from "../stores/data";

const store = useDataStore();

const authenticated = ref(store.data.authenticated);
const username = ref(store.data.username);
const password = ref(store.data.password);

onMounted(() =>{
    document.body.style.backgroundColor = "lightslategray";
})
</script>

<template>
  <div class="dashboard">
    <h1>Successfully authenticated! {{ authenticated }}</h1>
    <br />
    <p>welcome {{ username }}</p>
    <br />
    <p>your super secret password {{ password }}</p>
  </div>
</template>
