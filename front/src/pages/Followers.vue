<template>
  <div>
    <Follows
      title="Followers"
      :unfollow=false
      :follow=true
      :follows="follows"
    />
  </div>
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
