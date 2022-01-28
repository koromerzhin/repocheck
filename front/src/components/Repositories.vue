<template>
  <q-table
    :title="title"
    :data="repositories"
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
          key="title"
          :props="props"
        >
          <a
            :href="props.row.url"
            target="_blank"
          >
            {{ props.row.name }}
          </a>
          <br />
          <q-btn v-if="star == true" v-on:click="addstar(props.row.id);" color="white" text-color="black" label="add Star"></q-btn>
        </q-td>
        <q-td
          key="watchers"
          :props="props"
        >
          <a
            :href="props.row.url + '/watchers'"
            target="_blank"
            v-if="props.row.watchers.totalCount !== 0"
          >
            {{ props.row.watchers.totalCount }}
          </a>
          <div v-else>---</div>
        </q-td>
        <q-td
          key="stargazer"
          :props="props"
        >
          <a
            :href="props.row.url + '/stargazers'"
            target="_blank"
            v-if="props.row.stargazerCount !== 0"
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
          key="updatedAt"
          :props="props"
        >
          {{ props.row.updatedAt }}
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
          <div v-if="props.row.defaultBranchRef !== null && yours == true">
            <a
              :href="props.row.url + '/actions'"
              target="_blank"
            >
                <q-img
                  :src="props.row.url +'/workflows/Continuous%20Integration/badge.svg?branch=' +props.row.defaultBranchRef.name"
                  style="width:205px; height: 20px;"
                />
            </a>
          </div>
          <div
            v-if="props.row.licenseInfo !== null"
          >
            <b>Licence :</b> {{ props.row.licenseInfo.name }}
          </div>
          <div v-if="props.row.submodules.totalCount !== 0">
            <b>Submodule :</b> {{ props.row.submodules.totalCount }}
          </div>
          <div v-if="props.row.defaultBranchRef !== null">
            <b>Default branch :</b> {{ props.row.defaultBranchRef.name }}
          </div>
          <div v-if="props.row.issuesClose.totalCount !== 0">
            <b>Issue Close : </b>
            <a
              :href="props.row.url + '/issues?q=is%3Aissue+is%3Aclosed'"
              target="_blank"
            >
              {{ props.row.issuesClose.totalCount }}
            </a>
          </div>
          <div v-if="props.row.pullRequestClose.totalCount !== 0">
            <b>Pull requests Close : </b>
            <a
              :href="props.row.url + '/pulls?q=is%3Apr+is%3Aclosed'"
              target="_blank"
            >
              {{ props.row.pullRequestClose.totalCount }}
            </a>
          </div>
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
          key="issueOpen"
          :props="props"
        >
          <a
            :href="props.row.url + '/issues'"
            target="_blank"
            v-if="props.row.issuesOpen.totalCount !== 0"
          >
            {{ props.row.issuesOpen.totalCount }}
          </a>
          <div v-else>---</div>
        </q-td>
        <q-td
          key="pullsopen"
          :props="props"
        >
          <a
            :href="props.row.url + '/pulls'"
            target="_blank"
            v-if="props.row.pullRequestOpen.totalCount !== 0"
          >
            {{ props.row.pullRequestOpen.totalCount }}
          </a>
          <div v-else>---</div>
        </q-td>
        <q-td
          key="vulnerabilityAlerts"
          :props="props"
        >
          <a
            :href="props.row.url + '/security/dependabot'"
            target="_blank"
            v-if="props.row.vulnerabilityAlerts.totalCount !== 0"
          >
            {{ props.row.vulnerabilityAlerts.totalCount }}
          </a>
          <div v-else>---</div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Repositories',
  props: {
    yours: {
      type: Boolean,
      default: false
    },
    star: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    repositories: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    addstar: async function (idRepository) {
      await axios.get(
        '/back/action/star/add',
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
          label: 'Name',
          sortable: true,
          field: row => row.name,
          align: 'left',
          name: 'title'
        },
        {
          label: 'Watchers',
          sortable: true,
          field: row => row.watchers.totalCount,
          align: 'left',
          name: 'watchers'
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
          label: 'Updated At',
          sortable: true,
          field: row => row.updatedAt,
          align: 'left',
          name: 'updatedAt'
        },
        {
          label: 'Information',
          sortable: false,
          align: 'left',
          name: 'information'
        },
        {
          label: 'issues Open',
          sortable: true,
          field: row => row.issuesOpen.totalCount,
          align: 'left',
          name: 'issueOpen'
        },
        {
          label: 'Pull requests Open',
          sortable: true,
          field: row => row.pullRequestOpen.totalCount,
          align: 'left',
          name: 'pullsopen'
        },
        {
          label: 'Alerts',
          sortable: true,
          field: row => row.vulnerabilityAlerts.totalCount,
          align: 'left',
          name: 'vulnerabilityAlerts'
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
