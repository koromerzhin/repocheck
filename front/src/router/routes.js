
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'public', name: 'public', component: () => import('pages/Public.vue') },
      { path: 'private', name: 'private', component: () => import('pages/Private.vue') },
      { path: 'followers', name: 'followers', component: () => import('pages/Followers.vue') },
      { path: 'following', name: 'following', component: () => import('pages/Following.vue') },
      { path: 'star', name: 'star', component: () => import('pages/Star.vue') },
      { path: 'user/repositories/:login', name: 'user-repositories', component: () => import('pages/User/Repositories.vue') },
      { path: 'user/stars/:login', name: 'user-stars', component: () => import('pages/User/Stars.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
