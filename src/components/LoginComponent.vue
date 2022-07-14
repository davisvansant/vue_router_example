<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import useDataStore from "../stores/data";

const dataWorker:Worker = inject('worker', Worker.prototype);

const router = useRouter()
const store = useDataStore();

const username = ref('');
const password = ref('');

dataWorker.addEventListener('message', message => { 
  console.log("worker has recevied message", message.data);

  switch (message.data) {
    case 'authenticated': {
      store.data.authenticated = true;
      store.data.username = username.value;
      store.data.password = password.value;

      console.log("authenticated ->", store.data.authenticated);
      console.log("username ->", store.data.username);
      console.log("password ->", store.data.password);

      if (store.data.authenticated === true) {
        router.push("/dashboard");
      }
    }
  }
});

function authenticate() {
  console.log("username", username.value);
  console.log("password", password.value);

  console.log("authenticated ->", store.data.authenticated);

  dataWorker.postMessage('login');
};

console.log("authenticated ->", store.data.authenticated);
console.log("username ->", store.data.username);
console.log("password ->", store.data.password);

username.value = "";
password.value = "";

onMounted(() =>{
    document.body.style.backgroundColor = "";
})
</script>

<template>
  <div class="login">
    <img src="../assets/voiceprint-line.svg" alt="login" class="voiceprint">
    <h1 class="login_page">This is a login page</h1>
    <form id="login" name="login" @submit.prevent="authenticate">
      <img src="../assets/shield-user-fill.svg" alt="">
      <input type="text" name="username" placeholder="username" required class="input" v-model="username" />
      <br />
      <img src="../assets/shield-keyhole-fill.svg" alt="">
      <input type="password" name="password" placeholder="password" required class="input" v-model="password" />
      <br />
      <button class="login_button">
        <img src="../assets/login-circle-line.svg" alt="">
      </button>
    </form>
  </div>
</template>

<style scoped>
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    height: 400px;
    width: 400px;
    margin: 15vh;
    border: 2px solid lightslategray;
    border-radius: 25px;
  }
  .voiceprint {
    border: 5px solid lightslategray;
    border-radius: 100px;
    background-color: aliceblue;
  }
  .login_page {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 18px;
  }
  .input {
    border: 3px solid gold;
    border-radius: 5px;
    margin: 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    text-align: right;
    background-color: aliceblue;
  }
  .login_button {
    margin: 5%;
    height: 30px;
    width: 210px;
    border: 2px solid black;
    border-radius: 5px;
    background-color: gold;
    transition-duration: .5s;
  }
  .login_button:hover {
    border: 2px solid gold;
    background-color: aliceblue;
  }
</style>
