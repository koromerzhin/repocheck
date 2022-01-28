<template>
  <div>
      <Repositories
        :title="'Repositories '+$route.params.login"
        :star=true
        :yours=false
        :repositories="repositories"
      />
  </div>
</template>

<script>
const url = '/back/'
import Repositories from 'src/components/Repositories'

export default {
  name: 'User',
  components: {
    Repositories
  },
  data () {
    return {
      info: null,
      repositories: []
    }
  },
  mounted () {
    this.getRepository({
      total: 50,
      login: this.$route.params.login
    })
  },
  methods: {
    async getRepository (params) {
      const result = await this.$axios.get(
        url + 'user/repositories/',
        {
          params: params
        }
      )
      result.data.user.repositories.nodes.forEach(repository => {
        this.repositories.push(repository)
      })
      if (this.repositories.length !== result.data.user.repositories.totalCount) {
        params.after = result.data.user.repositories.pageInfo.endCursor
        this.getRepository(params)
      }
    }
  }
}
</script>
