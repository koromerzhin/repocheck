<template>
  <q-page
    class="flex layout-padding"
  >
    <Follows
      title="Following"
      :follows="follows"
    />
  </q-page>
</template>

<script>

import Follows from 'src/components/Follows'
export default {
  name: 'Following',
  components: {
    Follows
  },
  computed: {
    follows () {
      return this.$store.getters['github/getFollowing']
    }
  }
}
</script>
