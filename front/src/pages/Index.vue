<template>
  <q-page class="row items-center justify-evenly">
    test
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
const axios = require('axios')

export default defineComponent({
  name: 'PageIndex',
  setup () {
    axios.get('http://back-repocheck.traefik.me/repositories/public').then(
      result => {
        console.log(result)
      }
    )
  }
})
</script>
