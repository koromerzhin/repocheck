export default {
  addRepositoryPublic (state, repository) {
    state.repositories.public.push(repository)
  },
  addRepositoryPrivate (state, repository) {
    state.repositories.private.push(repository)
  },
  setRepositoryPublic (state, repositories) {
    state.repositories.public = repositories
  },
  setRepositoryPrivate (state, repositories) {
    state.repositories.private = repositories
  },
  clearRepositoryPublic (state) {
    state.repositories.public = []
  },
  clearRepositoryPrivate (state) {
    state.repositories.private = []
  },
  addFollowers (state, follower) {
    state.followers.push(follower)
  },
  setFollowers (state, followers) {
    state.followers = followers
  },
  clearFollowers (state) {
    state.followers = []
  },
  addFollowing (state, following) {
    state.following.push(following)
  },
  setFollowing (state, following) {
    state.following = following
  },
  clearFollowing (state) {
    state.following = []
  },
  addStar (state, star) {
    state.star.push(star)
  },
  setStar (state, stars) {
    state.star = stars
  },
  clearStar (state) {
    state.star = []
  },
  setCountRepositoriesPublic (state, number) {
    state.countRepositoriesPublic = number
  },
  setCountRepositoriesPrivate (state, number) {
    state.countRepositoriesPrivate = number
  },
  setCountFollowers (state, number) {
    state.countFollowers = number
  },
  setCountFollowing (state, number) {
    state.countFollowing = number
  },
  setCountStar (state, number) {
    state.countStar = number
  }
}
