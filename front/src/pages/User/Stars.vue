<template>
  <div>
      <Stars
        :title="'Stars '+$route.params.login"
        :stars="stars"
      />
  </div>
</template>

<script>
const url = 'http://repocheck.traefik.me/back/'
import Stars from 'src/components/Stars'

export default {
  name: 'User',
  components: {
    Stars
  },
  data () {
    return {
      info: null,
      stars: []
    }
  },
  mounted () {
    this.getStars({
      total: 50,
      login: this.$route.params.login
    })
  },
  methods: {
    async getStars (params) {
      const result = await this.$axios.get(
        url + 'user/stars/',
        {
          params: params
        }
      )
      result.data.user.starredRepositories.nodes.forEach(repository => {
        this.stars.push(repository)
      })
      if (this.stars.length !== result.data.user.starredRepositories.totalCount) {
        params.after = result.data.user.starredRepositories.pageInfo.endCursor
        this.getStars(params)
      }
    }
  }
}
</script>
