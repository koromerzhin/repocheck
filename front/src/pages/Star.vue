<template>
  <div>
    <Stars
      title="Stars"
      :stars="stars"
    />
  </div>
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
