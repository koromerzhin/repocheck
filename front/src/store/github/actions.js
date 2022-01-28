import axios from 'axios'

const url = '/back/'

export default {
  async getRepositoriesPublic (store, params) {
    const result = await axios.get(
      url + 'repositories/public',
      {
        params: params
      }
    )
    result.data.viewer.repositories.nodes.forEach(repository => {
      store.commit('addRepositoryPublic', repository)
    })

    store.dispatch('setCountRepositoriesPublic', result.data.viewer.repositories.totalCount)
    if (store.getters.getRepositoriesPublic.length !== result.data.viewer.repositories.totalCount) {
      params.after = result.data.viewer.repositories.pageInfo.endCursor
      store.dispatch('getRepositoriesPublic', params)
    }
  },
  addRepositoryPublic (store, repository) {
    store.commit('addRepositoryPublic', repository)
  },
  async getRepositoriesPrivate (store, params) {
    const result = await axios.get(
      url + 'repositories/private',
      {
        params: params
      }
    )
    result.data.viewer.repositories.nodes.forEach(repository => {
      store.commit('addRepositoryPrivate', repository)
    })

    store.dispatch('setCountRepositoriesPrivate', result.data.viewer.repositories.totalCount)
    if (store.getters.getRepositoriesPrivate.length !== result.data.viewer.repositories.totalCount) {
      params.after = result.data.viewer.repositories.pageInfo.endCursor
      store.dispatch('getRepositoriesPrivate', params)
    }
  },
  addRepositoryPrivate (store, repository) {
    store.commit('addRepositoryPrivate', repository)
  },
  setRepositoryPublic (store, repositories) {
    store.commit('setRepositoryPublic', repositories)
  },
  setRepositoryPrivate (store, repositories) {
    store.commit('setRepositoryPrivate', repositories)
  },
  clearRepositoryPublic (store) {
    store.commit('clearRepositoryPublic')
  },
  clearRepositoryPrivate (store) {
    store.commit('clearRepositoryPrivate')
  },
  async getFollowers (store, params) {
    const result = await axios.get(
      url + 'followers',
      {
        params: params
      }
    )
    result.data.viewer.followers.nodes.forEach(follower => {
      store.commit('addFollowers', follower)
    })

    store.dispatch('setCountFollowers', result.data.viewer.followers.totalCount)
    if (store.getters.getFollowers.length !== result.data.viewer.followers.totalCount) {
      params.after = result.data.viewer.followers.pageInfo.endCursor
      store.dispatch('getFollowers', params)
    }
  },
  addFollowers (store, follower) {
    store.commit('addFollowers', follower)
  },
  setFollowers (store, followers) {
    store.commit('setFollowers', followers)
  },
  clearFollowers (store) {
    store.commit('clearFollowers')
  },
  async getFollowing (store, params) {
    const result = await axios.get(
      url + 'following',
      {
        params: params
      }
    )
    result.data.viewer.following.nodes.forEach(follower => {
      store.commit('addFollowing', follower)
    })

    store.dispatch('setCountFollowing', result.data.viewer.following.totalCount)
    if (store.getters.getFollowing.length !== result.data.viewer.following.totalCount) {
      params.after = result.data.viewer.following.pageInfo.endCursor
      store.dispatch('getFollowing', params)
    }
  },
  addFollowing (store, following) {
    store.commit('addFollowing', following)
  },
  setFollowing (store, following) {
    store.commit('setFollowing', following)
  },
  clearFollowing (store) {
    store.commit('clearFollowing')
  },
  async getStar (store, params) {
    const result = await axios.get(
      url + 'starredRepositories',
      {
        params: params
      }
    )
    result.data.viewer.starredRepositories.nodes.forEach(starredRepository => {
      store.commit('addStar', starredRepository)
    })

    store.dispatch('setCountStar', result.data.viewer.starredRepositories.totalCount)
    if (store.getters.getStars.length !== result.data.viewer.starredRepositories.totalCount) {
      params.after = result.data.viewer.starredRepositories.pageInfo.endCursor
      store.dispatch('getStar', params)
    }
  },
  addStar (store, star) {
    store.commit('addStar', star)
  },
  setStar (store, stars) {
    store.commit('setStar', stars)
  },
  clearStar (store) {
    store.commit('clearStar')
  },
  setCountRepositoriesPublic (store, number) {
    store.commit('setCountRepositoriesPublic', number)
  },
  setCountRepositoriesPrivate (store, number) {
    store.commit('setCountRepositoriesPrivate', number)
  },
  setCountFollowers (store, number) {
    store.commit('setCountFollowers', number)
  },
  setCountFollowing (store, number) {
    store.commit('setCountFollowing', number)
  },
  setCountStar (store, number) {
    store.commit('setCountStar', number)
  }
}
