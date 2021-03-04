<template>
  <q-page
    class="flex layout-padding"
  >
    <Follows
      title="Followers"
      :follows="follows"
    />
  </q-page>
</template>

<script>

import Follows from 'src/components/Follows'
export default {
  name: 'Followers',
  components: {
    Follows
  },
  computed: {
    follows () {
      return this.$store.getters['github/getFollowers']
    }
  }
}
</script>
