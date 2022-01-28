<template>
  <div>
    <Repositories
      title="Repositories private"
      :star=false
      :yours=true
      :repositories="repositories"
    />
  </div>
</template>

<script>
import Repositories from 'src/components/Repositories'
export default {
  name: 'Private',
  components: {
    Repositories
  },
  computed: {
    repositories () {
      return this.$store.getters['github/getRepositoriesPrivate']
    }
  }
}
</script>
