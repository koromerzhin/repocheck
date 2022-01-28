export default {
  getRepository: (state) => state.repositories,
  getRepositoriesPublic: (state) => state.repositories.public,
  getRepositoriesPrivate: (state) => state.repositories.private,
  getFollowers: (state) => state.followers,
  getFollowing: (state) => state.following,
  getStars: (state) => state.star
}
