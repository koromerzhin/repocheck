<template>
  <q-page
    class="flex layout-padding"
  >
    <Stars
      title="Stars"
      :stars="stars"
    />
  </q-page>
</template>

<script>
import Stars from 'src/components/Stars'

export default {
  name: 'Star',
  components: {
    Stars
  },
  computed: {
    stars () {
      return this.$store.getters['github/getStars']
    }
  }
}
</script>
