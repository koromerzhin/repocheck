<template>
  <div>
    <Follows
      title="Following"
      :follows="follows"
    />
  </div>
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
