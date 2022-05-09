<template>
  <div class="dashboard">
    <h1>Successfully authenticated! {{ authenticated }}</h1>
    <br>
    <p>welcome {{ username }}</p>
    <br>
    <p>your super secret password {{ password }} </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'

export default defineComponent({
  name: 'DashboardView',
  data () {
    return {
      authenticated: store.state.data.authenticated,
      username: store.state.data.username,
      password: store.state.data.password
    }
  }
})
</script>
