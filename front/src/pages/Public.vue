<template>
  <q-page
    class="flex layout-padding"
  >
    <Repositories
      title="Repositories public"
      :repositories="repositories"
    />
  </q-page>
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
