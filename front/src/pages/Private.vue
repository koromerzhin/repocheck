<template>
  <q-page
    class="flex layout-padding"
  >
    <Repositories
      loading="loading"
      :repositories="repositories"
    />
    <q-inner-loading :showing="visible">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import Repositories from 'src/components/Repositories'
export default {
  name: 'PagePrivate',
  components: {
    Repositories
  },
  data () {
    return {
      loading: false,
      visible: true,
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
        'http://back-repocheck.traefik.me/repositories/private',
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
        this.visible = false
        this.$q.notify({
          message: `${this.repositories.length} repositories private`,
          color: 'purple'
        })
        this.data = this.repositories
      }
    }
  }
}
</script>
