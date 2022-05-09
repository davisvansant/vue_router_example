<template>
  <div class="login">
    <h1>This is a login page</h1>
    <form id="login" name="login" @submit.prevent="authenticate">
      Username: <input type="text" name="username" v-model="username">
      <br>
      Password: <input type="password" name="password" v-model="password">
      <br>
      <button>login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'

export default defineComponent({
  name: 'LoginView',
  props: {
    authenticated: String
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    authenticate () {
      console.log('username', this.username)
      console.log('password', this.password)

      console.log('authenticated ->', store.state.data.authenticated)

      store.state.data.authenticated = true
      store.state.data.username = this.username
      store.state.data.password = this.password

      console.log('authenticated ->', store.state.data.authenticated)
      console.log('username ->', store.state.data.username)
      console.log('password ->', store.state.data.password)

      this.username = ''
      this.password = ''

      if (store.state.data.authenticated === true) {
        this.$router.push('/dashboard')
      }
    }
  }
})
</script>
