<template>
  <q-table
    :title="title"
    :data="stars"
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
          key="user"
          :props="props"
        >
          <q-img
            :src="props.row.owner.avatarUrl"
            style="height: 140px; max-width: 150px"
          />
          <br/>
          <a
            :href="props.row.owner.url"
            target="_blank"
          >
            {{ props.row.owner.login }}
          </a>
          <br />
          <q-btn v-on:click="removestar(props.row.id);" color="white" text-color="black" label="remove Star"></q-btn>
        </q-td>
        <q-td
          key="userrepository"
          :props="props"
        >
          <router-link
            :to="{name: 'user-repositories', params: {'login': props.row.owner.login }}"
            v-if="props.row.owner.repositories.totalCount !== 0"
          >
            {{ props.row.owner.repositories.totalCount }}
          </router-link>
          <div v-else>---</div>
        </q-td>
        <q-td
          key="title"
          :props="props"
        >
          <a
            :href="props.row.url"
            target="_blank"
          >
            {{ props.row.name }}
          </a>
        </q-td>
        <q-td
          key="stargazer"
          :props="props"
        >
          <a
            :href="props.row.url + '/stargazers'"
            target="_blank"
            v-if="props.row.ownstargazerCount !== 0"
          >
            {{ props.row.stargazerCount }}
          </a>
          <div v-else>---</div>
        </q-td>
        <q-td
          key="fork"
          :props="props"
        >
          <a
            :href="props.row.url + '/network/members'"
            target="_blank"
            v-if="props.row.forkCount !== 0"
          >
            {{ props.row.forkCount }}
          </a>
          <div v-else>---</div>
        </q-td>
        <q-td
          key="release"
          :props="props"
        >
          <a
            :href="props.row.url + '/releases'"
            target="_blank"
            v-if="props.row.releases.totalCount !== 0"
          >
            {{ props.row.releases.totalCount }}
          </a>
          <div v-else>---</div>
        </q-td>
        <q-td
          key="isArchived"
          :props="props"
        >
          <span v-if="props.row.isArchived">YES</span>
          <span v-else>NO</span>
        </q-td>
        <q-td
          key="information"
          :props="props"
        >
          <span>{{ props.row.sshUrl }}</span>
          <ul>
            <li>
              <b>Created AT</b> : {{ props.row.createdAt }}
            </li>
            <li>
              <b>Updated AT</b> : {{ props.row.updatedAt }}
            </li>
            <li>
              <b>Pushed AT</b> : {{ props.row.pushedAt }}
            </li>
          </ul>
          <div class="my-table-details">
            {{ props.row.description }}
          </div>
          <span
            v-if="props.row.licenseInfo !== null"
          >
            {{ props.row.licenseInfo.name }}
          </span>
          <div class="row">
            <div class="col">
              <a
                :href="props.row.url+'/security'"
                target="_blank"
              >
                Security
              </a>
            </div>
            <div class="col">
              <a
                :href="props.row.url+'/pulse'"
                target="_blank"
              >
                insights
              </a>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <span
                v-if="props.row.languages.totalCount != 0"
              >
                Language :
                <ul>
                  <li
                    v-for="row in props.row.languages.nodes"
                    :key="row.id"
                    :style="'color:'+row.color+';font-weight: bold;'"
                  >
                    {{ row.name }}
                  </li>
                </ul>
              </span>
            </div>
            <div class="col">
              <span
                v-if="props.row.repositoryTopics.totalCount != 0"
              >
                Topics :
                <ul>
                  <li
                    v-for="row in props.row.repositoryTopics.nodes"
                    :key="row.id"
                  >
                    <a
                      :href="row.url"
                      target="_blank"
                    >
                      {{ row.topic.name }}
                    </a>
                  </li>
                </ul>
              </span>
            </div>
          </div>
        </q-td>
        <q-td
          key="updatedat"
          :props="props"
        >
          {{ props.row.updatedAt }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Stars',
  props: {
    title: {
      type: String,
      default: ''
    },
    stars: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    removestar: async function (idRepository) {
      await axios.get(
        '/back/action/star/remove',
        {
          params: {
            id: idRepository
          }
        }
      )
      Promise.all(
        [
          this.$store.commit('github/clearStar'),
          this.$store.dispatch('github/getStar', {
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
          label: 'User',
          sortable: false,
          align: 'left',
          name: 'user'
        },
        {
          label: 'User Repository',
          sortable: true,
          field: row => row.owner.repositories.totalCount,
          align: 'left',
          name: 'userrepository'
        },
        {
          label: 'Name',
          sortable: true,
          field: row => row.name,
          align: 'left',
          name: 'title'
        },
        {
          label: 'Stargazer',
          sortable: true,
          field: row => row.stargazerCount,
          align: 'left',
          name: 'stargazer'
        },
        {
          label: 'Forks',
          sortable: true,
          field: row => row.forkCount,
          align: 'left',
          name: 'fork'
        },
        {
          label: 'Releases',
          sortable: true,
          field: row => row.releases.totalCount,
          align: 'left',
          name: 'release'
        },
        {
          label: 'Is Archive',
          sortable: true,
          field: row => row.isArchived,
          align: 'left',
          name: 'isArchived'
        },
        {
          label: 'Information',
          sortable: false,
          align: 'left',
          name: 'information'
        },
        {
          label: 'Updated At',
          sortable: true,
          field: row => row.updatedAt,
          align: 'left',
          name: 'updatedat'
        }
      ]
    }
  }
}
</script>

<style>
  .my-table-details {
  max-width: 400px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
</style>
