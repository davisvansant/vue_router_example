<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
import useDataStore from "../stores/data";

const router = useRouter()
const store = useDataStore();

const username = ref('');
const password = ref('');

function authenticate() {
  console.log("username", username.value);
  console.log("password", password.value);

  console.log("authenticated ->", store.data.authenticated);

  store.data.authenticated = true;
  store.data.username = username.value;
  store.data.password = password.value;

  console.log("authenticated ->", store.data.authenticated);
  console.log("username ->", store.data.username);
  console.log("password ->", store.data.password);

  username.value = "";
  password.value = "";

  if (store.data.authenticated === true) {
    router.push("/dashboard");
  }
}
</script>

<template>
  <div class="login">
    <h1>This is a login page</h1>
    <form id="login" name="login" @submit.prevent="authenticate">
      Username: <input type="text" name="username" required v-model="username" />
      <br />
      Password: <input type="password" name="password" required v-model="password" />
      <br />
      <button>login</button>
    </form>
  </div>
</template>
