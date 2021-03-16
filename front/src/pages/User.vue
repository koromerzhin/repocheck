<template>
  <div>
      {{ info }}
  </div>
</template>

<script>
const url = 'http://back-repocheck.traefik.me/'
export default {
  name: 'User',
  data () {
    return {
      info: []
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    async getInfo () {
      const result = await this.$axios.get(
        url + 'user/info',
        {
          params: this.$route.params
        }
      )
      console.log(result)
      return []
    }
  }
}
</script>
