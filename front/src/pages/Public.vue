<template>
  <q-page class="flex">
    <Repositories
      :repositories="repositories"
    />
  </q-page>
</template>

<script>
import Repositories from 'src/components/Repositories'

export default {
  name: 'PagePublic',
  components: {
    Repositories
  },
  data () {
    return {
      repositories: [],
      totalCount: 0,
      endCursor: ''
    }
  },
  mounted () {
    this.getPublic()
  },
  methods: {
    getPublic () {
      this.getRepositories(
        'http://back-repocheck.traefik.me/repositories/public',
        {
          total: 25
        }
      )
    },
    async getRepositories (url, params) {
      await this.$axios.get(
        url,
        {
          params: params
        }
      ).then(
        result => {
          this.endCursor = result.data.viewer.repositories.pageInfo.endCursor
          this.totalCount = result.data.viewer.repositories.totalCount
          result.data.viewer.repositories.edges.forEach(repository => {
            this.repositories.push(repository.node)
          })
        }
      )
      if (this.repositories.length !== this.totalCount) {
        params.after = this.endCursor
        this.getRepositories(url, params)
      } else {
        this.data = this.repositories
      }
    }
  }
}
</script>
