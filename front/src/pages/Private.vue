<template>
  <q-page
    class="flex layout-padding"
  >
    <Repositories
      title="Repositories private"
      :repositories="repositories"
    />
  </q-page>
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
