<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Repo Check
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          <router-link to="/">Essential Links</router-link>
        </q-item-label>
        <ul>
          <li><router-link to="public">Repositories Public ({{ countRepositoriesPublic }})</router-link></li>
          <li><router-link to="private">Repositories Private ({{ countRepositoriesPrivate }})</router-link></li>
          <li><router-link to="followers">Followers ({{ countFollowers }})</router-link></li>
          <li><router-link to="following">Following ({{ countFollowing }})</router-link></li>
          <li><router-link to="star">Star ({{ countStar }})</router-link></li>
        </ul>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      length: 100
    }
  },
  mounted () {
    this.$store.dispatch('github/getRepositoriesPublic', {
      total: this.length
    })
    this.$store.dispatch('github/getRepositoriesPrivate', {
      total: this.length
    })
    this.$store.dispatch('github/getFollowers', {
      total: this.length
    })
    this.$store.dispatch('github/getFollowing', {
      total: this.length
    })
    this.$store.dispatch('github/getStar', {
      total: this.length
    })
  },
  computed: {
    countRepositoriesPublic () {
      return this.$store.getters['github/getCountRepositoriesPublic']
    },
    countRepositoriesPrivate () {
      return this.$store.getters['github/getCountRepositoriesPrivate']
    },
    countFollowers () {
      return this.$store.getters['github/getCountFollowers']
    },
    countFollowing () {
      return this.$store.getters['github/getCountFollowing']
    },
    countStar () {
      return this.$store.getters['github/getCountStar']
    }
  }
}
</script>
