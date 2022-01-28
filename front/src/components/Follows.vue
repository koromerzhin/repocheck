<template>
  <q-table
    :title="title"
    :data="follows"
    :columns="columns"
    row-key="title"
    dense
    separator="cell"
  >
    <template
      v-slot:body="props"
    >
      <q-tr :props="props">
        <q-td
          key="info"
          :props="props"
        >
          <q-img
            :src="props.row.avatarUrl"
            style="height: 140px; max-width: 150px"
          />
          <br/>
          <a
            :href="props.row.url"
            target="_blank"
          >
            <br />
            {{ props.row.login }}<span v-if="props.row.name!==null"> ({{ props.row.name }})</span>
          </a>
          <ul>
            <li>
              <b>Created AT</b> : {{ props.row.createdAt }}
            </li>
            <li>
              <b>Updated AT</b> : {{ props.row.updatedAt }}
            </li>
          </ul>
          <br />
          {{ props.row.location }}
          <br />
          <a
            v-if="props.row.websiteUrl!==null"
            :href="props.row.websiteUrl"
            target="_blank"
          >
          {{ props.row.websiteUrl }}
          </a>
          <br />
          <q-btn v-if="unfollow == true" v-on:click="actionunfollow(props.row.id);" color="white" text-color="black" label="Unfollow"></q-btn>
          <q-btn v-if="follow == true" v-on:click="actionfollow(props.row.id);" color="white" text-color="black" label="follow"></q-btn>
        </q-td>
        <q-td
          key="repositories"
          :props="props"
        >
          <router-link
            :to="{name: 'user-repositories', params: {'login': props.row.login }}"
            v-if="props.row.repositories.totalCount !== 0"
          >
            {{ props.row.repositories.totalCount }}
          </router-link>
          <div v-else>---</div>
        </q-td>
        <q-td
          key="stars"
          :props="props"
        >
          <router-link
            :to="{name: 'user-stars', params: {'login': props.row.login }}"
            v-if="props.row.starredRepositories.totalCount !== 0"
          >
            {{ props.row.starredRepositories.totalCount }}
          </router-link>
          <div v-else>---</div>
        </q-td>
        <q-td
          key="bio"
          :props="props"
        >
          {{ props.row.bio }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Follows',
  props: {
    unfollow: {
      type: Boolean,
      default: false
    },
    follow: {
      type: Boolean,
      default: false
    },
    follows: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    actionunfollow: async function (idUser) {
      await axios.get(
        '/back/action/unfollow/',
        {
          params: {
            id: idUser
          }
        }
      )
      this.getFollowersFollowing()
    },
    actionfollow: async function (idUser) {
      await axios.get(
        '/back/action/follow/',
        {
          params: {
            id: idUser
          }
        }
      )
      this.getFollowersFollowing()
    },
    getFollowersFollowing: function () {
      Promise.all(
        [
          this.$store.commit('github/clearFollowers'),
          this.$store.commit('github/clearFollowing')
        ]
      )
      Promise.all(
        [
          this.$store.dispatch('github/getFollowers', {
            total: 50
          }),
          this.$store.dispatch('github/getFollowing', {
            total: 50
          })
        ]
      )
    }
  },
  data () {
    return {
      columns: [
        {
          label: 'avatar',
          sortable: false,
          align: 'left',
          name: 'info'
        },
        {
          label: 'repositories',
          sortable: true,
          field: row => row.repositories.totalCount,
          align: 'left',
          name: 'repositories'
        },
        {
          label: 'stars',
          sortable: true,
          field: row => row.starredRepositories.totalCount,
          align: 'left',
          name: 'stars'
        },
        {
          label: 'Bio',
          sortable: false,
          field: row => row.bio,
          align: 'left',
          name: 'bio'
        }
      ]
    }
  }
}
</script>
