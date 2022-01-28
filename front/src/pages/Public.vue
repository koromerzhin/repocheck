<template>
  <div>
    <Repositories
      title="Repositories public"
      :star=false
      :yours=true
      :repositories="repositories"
    />
  </div>
</template>

<script>
import Repositories from 'src/components/Repositories'

export default {
  name: 'Public',
  components: {
    Repositories
  },
  computed: {
    repositories () {
      return this.$store.getters['github/getRepositoriesPublic']
    }
  }
}
</script>
